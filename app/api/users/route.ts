import { NextResponse } from "next/server";

import prisma from '@/libs/prismaDb'

export async function GET(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt : 'desc'
            }
        })
        return NextResponse.json(users)
    }
    catch (err: any) {
        console.log(err)
        return new NextResponse(
            JSON.stringify({ status: "failed", message: err.message }),
            {status: 401}
        )
    }
}