"use client";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type Announcement = {
    $id: string
    title: string
    content: string
    authorId: string
    $createdAt: string
    targetClasses: string[]
    targetRoles: string[]    
};

interface Props {
    announcement: Announcement
};

export function AnnouncementCard({ announcement }: Props){
    return (
        <Card>
            <CardHeader>
                <CardTitle>{announcement.title}</CardTitle>
            </CardHeader>
            <CardDescription>
                Posted on {announcement.$createdAt} by {announcement.authorId}
            </CardDescription>
            <CardContent>
                {announcement.content}
            </CardContent>
        </Card>
    )
}