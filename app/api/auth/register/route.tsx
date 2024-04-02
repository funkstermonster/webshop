  import { hash } from 'bcrypt';
  import { NextRequest, NextResponse } from 'next/server';
  import { PrismaClient } from '@prisma/client';
  import { registerFormSchema } from '@/schemas/schema'; // Import your Zod schema

  const prisma = new PrismaClient();

  export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = registerFormSchema.safeParse(body);

    if (!validation.success) {
      // Handle validation errors (e.g., return an error response)
      return new NextResponse(validation.error.message, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword, // Store the hashed password
      },
    });

    return NextResponse.json(user, { status: 200 });
  }