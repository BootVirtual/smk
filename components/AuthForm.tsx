"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFormProps {
    handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void | Promise<void>;
}

export function AuthForm({ handleSubmit }: AuthFormProps) {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>Enter your email and password below to login to your account</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className='grid gap-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                name="email"
                                id='email'
                                type='email'
                                placeholder='johndoe@example.com'
                                required
                            />
                        </div>
                        <div className='grid gap-2'>
                            <div className='flex items-center'>
                                <Label htmlFor='password'>Password</Label>
                                <a
                                    href='#'
                                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Input name="password" id='password' type='password' required/>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className='flex-col gap-2'>
                    <Button type='submit' className='w-full'>
                        Login
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}