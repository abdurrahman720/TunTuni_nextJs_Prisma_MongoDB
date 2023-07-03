import { NextResponse } from "next/server";
import prisma from '@/libs/prismaDb'
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function POST(
    req: Request,
    { params }: { params: { postId: string } }
) {
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
        name: true,
        id: true,
      },
    });
        const postId = params.postId;
        const { body } = await req.json();

        if (!postId || typeof postId !== "string") {
            return new NextResponse(
              JSON.stringify({
                status: "fail",
                message: "Invalid Post ID",
              }),
              { status: 400 }
            );
        }
        
        const comment = await prisma.comment.create({
            data: {
                body: body,
                userId: currentUser!.id,
                postId: postId
            }
        })

        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: postId
                },
                select: {
                    userId: true
                }
            });

            console.log({"post user": post?.userId})

            if (post?.userId) {
                await prisma.notification.create({
                    data: {
                        body: `${currentUser!.name} has commented on your post`,
                        userId: post?.userId
                    }
                })

                await prisma.user.update({
                    where: {
                        id: post?.userId
                    },
                    data: {
                        hasNotification: true
                    }
                })
            }

        }
        catch (err) {
            console.log(err)
        }

        return NextResponse.json(comment)

    }
    catch (error: any) {
        return new NextResponse(
          JSON.stringify({
            status: "fail",
            message: error.message,
          }),
          { status: 400 }
        );
      }
  }