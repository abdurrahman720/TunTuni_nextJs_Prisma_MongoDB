import prisma from '@/libs/prismaDb'
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { userId: string } }){
    try {
        console.log(params)
        const userId = params.userId;
     
        if (!userId || typeof userId !== "string") {
            return new NextResponse(
              JSON.stringify({ status: "fail", message: "Invalid ID" }),
              { status: 401 }
            );
        }
        
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        const followersCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId
                }
            },

        })

        return NextResponse.json({...existingUser, followersCount})
    }
    catch (error: any) {
        console.log(error);
        return new NextResponse(
          JSON.stringify({ status: "fail", message: error.message }),
          { status: 401 }
        );
      }
}