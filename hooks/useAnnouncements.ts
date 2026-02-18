"use client";

import { tablesDB } from "@/lib/appwrite";
import { Query, Models } from "appwrite";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const ANNOUNCEMENTS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_ANNOUNCEMENTS_TABLE_ID!;
const USERS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_TABLE_ID!;

export interface User extends Models.Row {
    role: "student" | "parent" | "teacher"
    fullName: string
}

export interface AnnouncementRaw extends Models.Row {
    title: string
    content: string
    targetRoles: ("student" | "parent" | "teacher" | "headteacher")[]
    targetClasses: string[]
    author: string
};

export interface Announcement extends Models.Row {
    title: string
    content: string
    targetRoles: ("student" | "parent" | "teacher" | "headteacher")[]
    targetClasses: string[]
    author: {
        $id: string
        fullName: string
    }
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
                const res = await tablesDB.listRows<AnnouncementRaw>({
                    databaseId: DATABASE_ID,
                    tableId: ANNOUNCEMENTS_TABLE_ID,
                    queries: [Query.contains("targetRoles", user.role), Query.orderDesc("$createdAt")]
                });

                const authorIds = [...new Set(res.rows.map(a => a.author))];
                
                const authorRows = await tablesDB.listRows<User>({
                    databaseId: DATABASE_ID,
                    tableId: USERS_TABLE_ID,
                    queries: [Query.equal("$id", authorIds)]
                });

                const authorMap = Object.fromEntries(authorRows.rows.map(u => [u.$id, u.fullName]));


                const expandedRes = res.rows.map(a => ({
                    ...a,
                    author: {
                        $id: a.author,
                        fullName: authorMap[a.author]
                    }
                }));

                const visibleAnnouncements = expandedRes.filter(a => {
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