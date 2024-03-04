import { NextRequest, NextResponse } from "next/server";
import { registerFormSchema } from "@/schemas/schema";
import prisma from "@/prisma/client";
import {hash} from "bcrypt"

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = registerFormSchema.safeParse(body);
  // const hashedPassword = await hash(password, 10)
  if (!validation.success) {
    // Handle validation errors (e.g., return an error response)
    return new NextResponse(validation.error.message, { status: 400 });
  }
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });
  return NextResponse.json(user, { status: 200 });
}
