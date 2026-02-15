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
import { Home, User2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

function ProfileButton() {
    const { user, loading, logout } = useAuth();

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
                    <SidebarMenuButton onClick={logout}>
                        <User2 /> { user.name }
                    </SidebarMenuButton>
                </SidebarMenuItem>
            )
        } else {
            return (
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <a href="/login">
                            <User2 />
                            <span>Log in</span>
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