import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { productFormSchema } from "@/schemas/schema";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = productFormSchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse(validation.error.message, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
        description: body.description,
        imageUrl: body.imageUrl
      },
    });

    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
