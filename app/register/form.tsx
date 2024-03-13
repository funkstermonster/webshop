"use client";
import { Button, Input } from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import { registerFormSchema } from "@/schemas/schema"; // Import your Zod schema
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData } from "@/types/user";


export default function RegisterForm() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterData>({ resolver: zodResolver(registerFormSchema) });
  
    const onSubmit = async (formData: RegisterData) => {
      const { email, password, confirmPassword } = formData;
      try {
        registerFormSchema.parse({ email, password, confirmPassword });
        const response = await fetch(`/api/auth/register`, {
          method: "POST",
          body: JSON.stringify({ email, password, confirmPassword }),
        });
  
        if (response.ok) {
          toast.success("Registration successful!");
          console.log({ response });
        } else {
          toast.error("Registration failed!");
          console.error({ response });
        }
      } catch (error) {
        toast.error("Error occurred");
      }
    };
  
    return (
      <>
        <Toaster />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 mx-auto max-w-md mt-10"
        >
          <div>
            <h1 className="mb-5 mt-5">Register form</h1>
            <Input {...register("email")} className="mb-5" type="email" label="Email" />
            {errors.email && (
              <p className="text-red-600 mb-2 text-sm">{errors.email?.message}</p>
            )}
            <Input
              {...register("password")}
              className="mb-5"
              type="password"
              label="Password"
            />
            {errors.password && (
              <p className="text-red-600 mb-2 text-sm">{errors.password?.message}</p>
            )}
            <Input
              {...register("confirmPassword")}
              className="mb-5"
              type="password"
              label="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 mb-2 text-sm">{errors.confirmPassword?.message}</p>
            )}
            <Button className="text-center mb-5" color="primary" type="submit">
              Register
            </Button>
          </div>
        </form>
      </>
    );
  }
  