import { getServerSession } from "next-auth";
import {  NextResponse } from "next/server";
import prisma from '@/libs/prismaDb'
import { authOptions } from "../auth/[...nextauth]/route";


export  async function GET(req: Request, res: Response) {
   
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "Not Logged In"
      }),
      { status: 401 }
    );
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  if (!currentUser) {
    throw new Error("Not Logged In")
  }

  return NextResponse.json(currentUser)

}