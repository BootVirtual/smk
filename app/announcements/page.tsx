"use client";

import { AnnouncementCard } from "@/components/AnnouncementCard";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
} from "@/components/ui/empty"
import { Megaphone } from "lucide-react";

export default function AnnouncementsPage() {
    const { announcements, loading } = useAnnouncements();

    if(!announcements){
        return (
            <Empty>
                <EmptyTitle>
                    <EmptyMedia variant="icon">
                        <Megaphone />
                    </EmptyMedia>
                    <EmptyTitle>
                        No Announcements Yet
                    </EmptyTitle>
                    <EmptyDescription>
                        You haven't received any important communications yet. Good news?
                    </EmptyDescription>
                </EmptyTitle>
            </Empty>
        )
    }
    if(loading) {
        // TODO
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div className="space-y-4">
            {announcements.map((a) => (
                <AnnouncementCard key={a.$id} announcement={a} />
            ))}
        </div>
    )
}