import { NextResponse } from "next/server";
import prisma from '@/libs/prismaDb';
import bcrypt from 'bcrypt';

export async function POST(req: Response) {
    try {
        const reqBody = await req.json();
        console.log(reqBody);
        const { token, newPassword } = reqBody;

        if (!newPassword) {
            return NextResponse.json({ error: "New password is required" }, { status: 400 });
          }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);

        const user = await prisma.user.findFirst({
            where: {
                passwordResetToken: token,
                passwordResetTokenExpiry: {
                    gt: new Date()
                }
            }
        })

        if (!user) {
            return NextResponse.json({error: "Invalid Token"},{status: 400})
        }

        try {
            const updatedUser = await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    originalPass: newPassword,
                    hashedPassword: hashedPassword,
                    passwordResetToken: null,
                    passwordResetTokenExpiry: null
                }
            })
            return NextResponse.json({
                message: "Email Verified Successfully",
                success: true
            })
        }
        catch (err: any) {
            return NextResponse.json(
                {error:err.message },
                { status: 401 })
        }
        
    }
    catch (error:any) {
        return NextResponse.json(
            {error:error.message },
            { status: 500 })
    }
}