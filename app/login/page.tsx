'use client';

import { useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
    const { login } = useAuth();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        await login(
            formData.get('email') as string,
            formData.get('password') as string
        );

        form.reset();
    };

    return (
        <AuthForm handleSubmit={handleLogin}/>
    );
}