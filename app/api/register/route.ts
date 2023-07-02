import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

import prisma from '@/libs/prismaDb';

export  async function POST(req: Request) {
 

    try {
      const body = await req.json()
        const { email, username, name, password } = body;

    const salt = await bcrypt.genSalt(12);

    // Hash the password with the salt value
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        username,
            name,
        originalPass:password,
        hashedPassword,
      }
    });

    return NextResponse.json(user);
  } catch (error: any) {
        console.log(error);
        return new NextResponse(
          JSON.stringify({
            status: "error",
            message: error.message,
          }),
          { status: 500 }
        );
      }
}
