import { NextResponse } from "next/server";
import prisma from '@/libs/prismaDb'

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    try {
        const userId = params.userId;
        if (!userId || typeof userId !== "string") {
            return new NextResponse(
              JSON.stringify({ status: "fail", message: "Invalid ID" }),
              { status: 400 }
            );
        }
        const notifications = await prisma.notification.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              hasNotification: false,
            },
        });
        
        return  NextResponse.json(notifications);
    }
    catch (err: any) {
        return new NextResponse(
            JSON.stringify({ status: "fail", message: err.message }),
            { status: 400 }
          );
    }
}