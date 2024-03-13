"use client"
import { loginFormSchema } from "@/schemas/schema";
import { LoginData } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<LoginData>({ resolver: zodResolver(loginFormSchema) });
    
    
      const onSubmit = async (data: LoginData) => {
        signIn('credentials', 
        {
          email: data.email,
          password: data.password,
          callbackUrl: `${window.location.origin}`,
          redirect: true
        });
      };
    
      return (
        <>
          <Toaster />
          <form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <div>
              <h1 className="mb-5 mt-5">Login</h1>
              <Input {...register("email")} className="mb-5" type="email" label="Email" />
              {errors.email && <p>{errors.email?.message}</p>}
              <Input {...register("password")} className="mb-5" type="password" label="Password" />
              {errors.password && <p>{errors.password?.message}</p>}
              <Button className="text-center mb-5" color="primary" type="submit">Login</Button>
            </div>
          </form>
        </>
      );
}
