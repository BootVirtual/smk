"use client";

import { tablesDB } from "@/lib/appwrite";
import { Query, Models } from "appwrite";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const ANNOUNCEMENTS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_ANNOUNCEMENTS_TABLE_ID!;

export interface User extends Models.Row {
    role: "student" | "parent" | "teacher"
    fullName: string
}

export interface Announcement extends Models.Row {
    title: string
    content: string
    targetRoles: ("student" | "parent" | "teacher" | "headteacher")[]
    targetClasses: string[]
    author: User
};

export function useAnnouncements() {
    const { user, loading: authLoading } = useAuth();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(authLoading) return;
        if(!user) return;

        async function fetchAnnouncements() {
            setLoading(true);

            try {
                const res = await tablesDB.listRows<Announcement>({
                    databaseId: DATABASE_ID,
                    tableId: ANNOUNCEMENTS_TABLE_ID,
                    queries: [Query.contains("targetRoles", user.role), Query.orderDesc("$createdAt")]
                });

                const visibleAnnouncements = res.rows.filter(a => {
                    return a.targetClasses.some((classId) =>
                        user?.classIds.includes(classId)
                    )
                });

                setAnnouncements(visibleAnnouncements);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

        fetchAnnouncements()
    }, [user, authLoading]);

    return { announcements, loading };
}