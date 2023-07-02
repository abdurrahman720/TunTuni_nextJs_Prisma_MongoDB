import prisma from '@/libs/prismaDb'
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function POST(req: Request, res: Response) {
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
            select: {
              id: true, //just getting the id
            },
          });
        console.log(currentUser)

        const {body} = await req.json();
        console.log(body)
        
       
    const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser!.id 
        },
    });
        return NextResponse.json(post);

    }
    catch (error: any) {
        console.log(error);
        return new NextResponse(
          JSON.stringify({ status: "fail", message: error.message }),
          { status: 400 }
        );
      }
}