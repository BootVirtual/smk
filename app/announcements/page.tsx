"use client";

import { AnnouncementCard } from "@/components/AnnouncementCard";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import {
    Empty,
    EmptyDescription,
    EmptyMedia,
    EmptyTitle
} from "@/components/ui/empty";
import { Megaphone } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnnouncementsPage() {
    const { announcements, loading } = useAnnouncements();

    if(loading) {
        return (
            <Card className="w-[620px]">
                <CardHeader>
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/3" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="aspect-video w-full" />
                </CardContent>
            </Card>
        )
    } else if(announcements.length == 0) {
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

    return (
        <div className="flex flex-1 flex-col gap-4 px-6 py-4 md:gap-6 md:py-6 w-full max-w">
            {announcements.map((a) => (
                <AnnouncementCard key={a.$id} announcement={a} />
            ))}
        </div>
    )
}