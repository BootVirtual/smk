"use client";

import { AnnouncementCard } from "@/components/AnnouncementCard";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
} from "@/components/ui/empty";
import { Megaphone, Plus } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AnnouncementForm } from "@/components/AnnouncementForm";
import { SchoolClass, useClasses } from "@/hooks/useClasses";

export function NewAnnouncementButton(user: User | null, classes: SchoolClass[], loading: boolean) {
    if(user?.role === "teacher"){
        if(!loading) {
            return (
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button><Plus /> New Announcement</Button>
                        </DialogTrigger>
                    </form>
                    <AnnouncementForm classes={classes} />
                </Dialog>
            );
        } else {
            return (
                <Skeleton className="h-4 w-1/4" />
            );
        }
    }
}

export default function AnnouncementsPage() {
    const { announcements, loading } = useAnnouncements();
    const { user } = useAuth();
    const { classes, loading: classLoading } = useClasses();

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
            <div>
                {NewAnnouncementButton(user, classes, classLoading)}
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <Megaphone />
                        </EmptyMedia>
                        <EmptyTitle>
                            No Announcements Yet
                        </EmptyTitle>
                        <EmptyDescription>
                            You haven't received any important communications yet. Good news?
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col gap-4 px-6 py-4 md:gap-6 md:py-6 w-full max-w">
            {NewAnnouncementButton(user, classes, classLoading)}
            {announcements.map((a) => (
                <AnnouncementCard key={a.$id} announcement={a} />
            ))}
        </div>
    )
}