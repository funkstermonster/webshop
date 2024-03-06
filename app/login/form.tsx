"use client"
import { registerFormSchema } from "@/schemas/schema";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import { Toaster, toast } from "sonner";

export default function Form() {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        signIn('credentials', 
        {
            email: formData.get('email'),
            password: formData.get('password'),
            callbackUrl: `${window.location.origin}`,
            redirect: true
        });
    };

    return (
        <>
            <Toaster />
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
                <div>
                    <h1 className="mb-5 mt-5">Login</h1>
                    <Input name="email" className="mb-5" type="email" label="Email" />
                    <Input name="password" className="mb-5" type="password" label="Password" />
                    <Button className="text-center mb-5" color="primary" type="submit">Login</Button>
                </div>
            </form>
        </>
    );
}
