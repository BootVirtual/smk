"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Announcement } from "@/hooks/useAnnouncements";

interface Props {
    announcement: Announcement
};

export function AnnouncementCard({ announcement }: Props){
    console.log(announcement.author);
    return (
        <Card className="mx-auto w-full max-w">
            <CardHeader>
                <CardTitle>{announcement.title}</CardTitle>
                <CardDescription>
                    Posted on {new Date(announcement.$createdAt).toLocaleString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    })} by {announcement.author.fullName}.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {announcement.content}
            </CardContent>
        </Card>
    )
}