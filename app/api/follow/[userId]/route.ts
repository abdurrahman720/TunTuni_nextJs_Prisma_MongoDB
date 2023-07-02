import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDb"

export async function POST(req: Request, { params }: { params: { userId: string } }) {

    const userId = params.userId;
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
            name: true,
          followingIds: true,
        },
      });
    
    const user = await prisma.user.findUnique({
        where: {
              id: userId
        },
        select: {
            id: true,
            followingIds: true
        }
    })
    
    let updatedFollowingIds = [...(user?.followingIds || []), userId]

    try {

        await prisma.notification.create({
            data: {
              body: `${currentUser!.name} followed you`,
              userId,
            },
        });
        
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hasNotification: true
            }
        })

    }
    catch (err) {
        console.log(err)
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: currentUser!.id
        },
        data: {
            followingIds: updatedFollowingIds
        }
    })

    return NextResponse.json(updatedUser)
}

export async function DELETE(request: Request, { params }: { params: { userId: string } }) {
    const userId = params.userId;
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
      followingIds: true,
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      followingIds: true,
    },
  });
    
    let updatedFollowingIds = [...(user?.followingIds || [])].filter((followingId) => followingId !== userId);

    const updatedUser = await prisma.user.update({
        where: {
            id: currentUser!.id
        },
        data: {
            followingIds: updatedFollowingIds
        }
    })

    return NextResponse.json(updatedUser);

}