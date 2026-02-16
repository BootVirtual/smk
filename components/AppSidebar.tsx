"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, Home, LogOutIcon, Megaphone, User2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

function ProfileButton() {
    const { user, loading, logout } = useAuth();
        const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar();

    if (loading) {
        return (
            <SidebarMenuItem>
                <SidebarMenuSkeleton />
            </SidebarMenuItem>
        );
    } else {
        if (user) {
            return (
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                <User2 />
                                { user.fullName }
                                <EllipsisVertical className="ml-auto"/>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-popper-anchor-width] min-w-56 rounded-lg"
                            side={isMobile ? "bottom" : "right"}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="font-normal p-0">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <User2 />
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{user.fullName}</span>
                                        <span className="truncate text-muted-foreground text-xs">{user.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuItem variant="destructive" onClick={ logout }>
                                <LogOutIcon /> Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            )
        } else {
            return (
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <a href="/login">
                            <User2 />
                            Log in
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            )
        }
    }
}

export function AppSidebar() {
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar();

    return (
        <Sidebar>
            <SidebarHeader>
                <span>Demo School - SMK</span>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/">
                                    <Home />
                                    <span>Home</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/announcements">
                                    <Megaphone />
                                    <span>Announcements</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    { ProfileButton() }
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}