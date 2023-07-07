import prisma from '@/libs/prismaDb'
import { sendEmail } from '@/libs/sendEmail';
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const reqBody = await req.json();
        const { email } = reqBody;
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            select:{
                id: true
            }
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found'},{status: 400})
        }

        if (user) {
            const res = sendEmail({ email, userId: user?.id });
            return NextResponse.json(res)
      
        }
    
      
    }
    catch (err: any) {
        return NextResponse.json({error: err.message},{status: 201})
    }

}