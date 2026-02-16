"use client";

import { tablesDB } from "@/lib/appwrite";
import { Query } from "appwrite";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const ANNOUNCEMENTS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_ANNOUNCEMENTS_TABLE_ID!;

export function useAnnouncements() {
    const { user, loading: authLoading } = useAuth();
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(authLoading) return;
        if(!user) return;

        async function fetchAnnouncements() {
            setLoading(true);

            try {
                const res = await tablesDB.listRows(DATABASE_ID, ANNOUNCEMENTS_TABLE_ID, [Query.contains("targetRoles", user.role), Query.orderDesc("$createdAt")]);

                const visibleAnnouncements = res.rows.filter((announcement: any) => {
                    return announcement.targetClasses.some((classId: string) =>
                        user?.classIds.includes(classId)
                    )
                });

                setAnnouncements(visibleAnnouncements);
            } catch {
                console.log("Error when fetching Announcements");
            } finally {
                setLoading(false);
            }
        }

        fetchAnnouncements()
    }, [user, authLoading]);

    return { announcements, loading };
}