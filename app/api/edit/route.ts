import prisma from '@/libs/prismaDb';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function PATCH(req: Request, res: Response) {
    try {
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
        });

        const body = await req.json();
        const { name, username, bio, profileImage, coverImage } = body;

        const updateUser = await prisma.user.update({
            where: {
                id: currentUser?.id,
            },
            data: {
                name, username, bio, profileImage, coverImage
            }
        })
        return NextResponse.json(updateUser);


    }
    catch (err: any) {
        console.log(err)
        return new NextResponse(
            JSON.stringify({
                message: err.message
            }
            ),
            {status: 500}
        )
    }
}