"use client";

import { Models, Query } from "appwrite";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { tablesDB } from "@/lib/appwrite";

export interface User extends Models.Row {
    role: "student" | "parent" | "teacher"
    fullName: string
}

export interface SchoolClassRaw extends Models.Row {
    headTeacher: string
};

export interface SchoolClass extends Models.Row {
    headTeacher: string
    headTeacherFullName: string
};

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const CLASSES_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_CLASSES_TABLE_ID!;
const USERS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_TABLE_ID!;

export function useClasses() {
    const { user, loading: authLoading } = useAuth();
    const [classes, setClasses] = useState<SchoolClass[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(authLoading) return;
        if(!user) return;

        async function getClasses(){
            setLoading(true);

            try {
                const res = await tablesDB.listRows<SchoolClassRaw>({
                    databaseId: DATABASE_ID,
                    tableId: CLASSES_TABLE_ID
                });

                const userIds = [...new Set(res.rows.map(c => c.headTeacher))];

                const userRows = await tablesDB.listRows<User>({
                    databaseId: DATABASE_ID,
                    tableId: USERS_TABLE_ID,
                    queries: [Query.equal("$id", userIds)]
                });

                const userMap = Object.fromEntries(userRows.rows.map(u => [u.$id, u.fullName]));

                const expandedRes = res.rows.map(c => ({
                    ...c,
                    headTeacherFullName: userMap[c.headTeacher]
                }));

                setClasses(expandedRes);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

        getClasses();
    }, [user, authLoading]);

    return { classes, loading };
}