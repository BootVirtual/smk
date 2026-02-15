import { useState, useEffect } from 'react';
import { account } from '@/lib/appwrite';
import type { Models } from 'appwrite';
import { useRouter } from 'next/navigation';

type User = {
    id: string,
    email: string,
    name: string
}

export function useAuth() {
    const [current, setCurrent] = useState<Models.Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const login = async (email: string, password: string): Promise<void> => {
        const session = await account.createEmailPasswordSession({
            email,
            password
        });
        setCurrent(session);
        router.push('/');
    };

    const logout = async (): Promise<void> => {
        await account.deleteSession({ sessionId: 'current' });
        setCurrent(null);
        router.push('/');
    };

    useEffect(() => {
        async function fetchUser() {
            try {
                const currentUser = await account.get();
                setUser({
                    id: currentUser.$id,
                    email: currentUser.email,
                    name: currentUser.name,
                });
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    return {
        current,
        loading,
        login,
        logout,
        user,
    };
}