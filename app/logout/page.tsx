'use client';

import { useAuth } from "@/hooks/useAuth";

export default function LogoutPage () {
    const { logout } = useAuth();

    logout();
}