import { userProfileSchema } from "@/schemas/schema";
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = userProfileSchema.safeParse(body);
    if (!validation.success) {
      // Handle validation errors (e.g., return an error response)
      return new NextResponse(validation.error.message, { status: 400 });
    }
    const profile = await prisma.profile.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        city: body.city,
        street: body.street,
        streetNumber: body.streetNumber,
        mobileNumber: body.mobileNumber,
        user: body.user,
      },
    });

    return new NextResponse(JSON.stringify(profile), { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const profileId = params.id;

    await prisma.profile.delete({
      where: { id: profileId },
    });

    return NextResponse.json({});
  } catch (error) {
    console.error("Error deleting profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const profileId = params.id;
    const profileData = await request.json();

    const updatedProfile = await prisma.profile.update({
      where: { id: profileId },
      data: profileData,
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
