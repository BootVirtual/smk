"use client";

import {
    createContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';
import { account } from '@/lib/appwrite';
import type { Models } from 'appwrite';
import { useRouter } from 'next/navigation';

type User = {
    id: string,
    email: string,
    name: string
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    current: Models.Session | null;
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
            setUser({
                id: currentUser.$id,
                email: currentUser.email,
                name: currentUser.name,
            });
        } catch {
            setUser(null);
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