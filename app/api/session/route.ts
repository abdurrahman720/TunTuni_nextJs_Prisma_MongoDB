import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

import prisma from "@/libs/prismaDb";
import { authOptions } from "@/libs/auth";


export async function GET(request: Request, res: Response) {
    console.log(request)
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 }
    );
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
    select: {
      id: true,
      hasNotification: true,
    },
  });

  return NextResponse.json(currentUser);
}