import prisma from '@/libs/prismaDb'
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST( req: Request,
    { params }: { params: { postId: string } }) {
        const postId = params.postId;
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
              name: true
          },
        });
     
        const post = await prisma.post.findUnique({
            where: {
              id: postId,
            },
        });
    
    if (!post) {
        return new NextResponse(
            JSON.stringify({ status: "fail", message: "No Post" }),
            { status: 401 }
          );
    }

    let updatedLikeIds = [...(post.likeIds || []), currentUser!.id];

    try {
        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likeIds: updatedLikeIds
            }
        })

        if (post?.userId) {
            await prisma.notification.create({
                data: {
                    body: `${currentUser?.name} liked your post`,
                    userId: post?.userId
                }
            });

            await prisma.user.update({
                where: {
                    id:post!.userId
                },
                data: {
                    hasNotification: true
                }
            })
        }

        return NextResponse.json(updatedPost)
    }
    catch (err) {
        console.log(err)
    }
      
}
    
export async function DELETE(req: Request,
    { params }: { params: { postId: string } }) {
        const postId = params.postId;
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
          },
        });
      
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });
      
        if (!post) {
          return new NextResponse(
            JSON.stringify({ status: "fail", message: "No Post" }),
            { status: 401 }
          );
        }
    let updatedLikeIds = [...(post.likeIds || [])].filter((likeId) => likeId !== currentUser!.id)
    try {
        const updatedPost = await prisma.post.update({
            where: {
                id: post.id,
            },
            data: {
                likeIds: updatedLikeIds
            }
        });
        return NextResponse.json(updatedPost);
    }
    catch (err) {
        console.log(err)
    }
}