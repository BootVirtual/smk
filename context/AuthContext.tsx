"use client";

import {
    createContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';
import { account, tablesDB } from '@/lib/appwrite';
import { Query, type Models } from 'appwrite';
import { useRouter } from 'next/navigation';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const STUDENTS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_STUDENTS_TABLE_ID!;
const USERS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_TABLE_ID!;
const PARENTS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_PARENTS_TABLE_ID!;
const CLASSESASSIGNMENTS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_CLASSASSIGNMENTS_TABLE_ID!;

export type User = {
    id: string
    email: string
    fullName: string
    role: "student" | "parent" | "teacher"
    classIds: string[]
};

type AuthContextType = {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    current: Models.Session | null
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [current, setCurrent] = useState<Models.Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    async function fetchUser() {
        try {
            const currentUser = await account.get();
            
            const userRow = await tablesDB.getRow({
                databaseId: DATABASE_ID,
                tableId: USERS_TABLE_ID,
                rowId: currentUser.$id
            });

            const role = userRow.role;
            let classIds: string[] = [];

            if(role === "student") {
                const studentRow = await tablesDB.getRow({
                    databaseId: DATABASE_ID,
                    tableId: STUDENTS_TABLE_ID,
                    rowId: currentUser.$id
                });

                classIds = [studentRow.class];
            } else if (role === "parent") {
                const parentRow = await tablesDB.getRow({
                    databaseId: DATABASE_ID,
                    tableId: PARENTS_TABLE_ID,
                    rowId: currentUser.$id,
                    queries: [Query.select(["*", "students.*"])]
                });

                try{
                    classIds = parentRow.students.map((students: any) => students.class);
                } catch (e) {
                    console.log("Error when parsing parent's students");
                    console.log(e);
                }
            } else if (role === "teacher") {
                const assignments = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: CLASSESASSIGNMENTS_TABLE_ID,
                    queries: [Query.equal("teacher", currentUser.$id), Query.select(["*", "class.*"])]
                });

                try {
                    const classes = assignments.rows.flatMap((assignment: any) => assignment.class);
                    
                    classIds = classes.map((c: any) => c.$id);
                } catch (e) {
                    console.log("Error when parsing teacher's classes");
                    console.log(e);
                }
            }

            setUser({
                id: currentUser.$id,
                email: currentUser.email,
                fullName: currentUser.name,
                role,
                classIds
            });
        } catch (e) {
            setUser(null);
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    const login = async (email: string, password: string): Promise<void> => {
        const session = await account.createEmailPasswordSession({
            email,
            password
        });
        setCurrent(session);
        fetchUser();
        router.push('/');
        router.refresh();
    };

    const logout = async (): Promise<void> => {
        await account.deleteSession({ sessionId: 'current' });
        setCurrent(null);
        fetchUser();
        router.push('/');
        router.refresh();
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value = {{
                current,
                loading,
                login,
                logout,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}