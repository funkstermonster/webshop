import { Button, Input } from "@nextui-org/react";
import { FormEvent } from "react";
import { Toaster, toast } from 'sonner';
import { registerFormSchema } from '@/schemas/schema'; // Import your Zod schema

export default function Form() {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        try {
            // Validate form data
            registerFormSchema.parse({ email, password, confirmPassword });

            // If validation passes, proceed with form submission
            const response = await fetch(`/api/auth/register`, {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                toast.success("Registration successful!");
                console.log({ response });
            } else {
                toast.error("Registration failed!");
                console.error({ response });
            }
        } catch (error) {
            // If validation fails, display error message
            toast.error("error occured");
        }
    };

    return (
        <>
            <Toaster />
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
                <div>
                    <h1 className="mb-5 mt-5">Register form</h1>
                    <Input name="email" className="mb-5" type="email" label="Email" />
                    <Input name="password" className="mb-5" type="password" label="Password" />
                    <Input name="confirmPassword" className="mb-5" type="password" label="Confirm password" />
                    <Button className="text-center mb-5" color="primary" type="submit">Register</Button>
                </div>
            </form>
        </>
    );
}
