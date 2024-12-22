import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

export async function POST(req: NextRequest) {
    
    try{
        const {email, name, password} = await req.json()

        const existingUser = await prismadb.users.findUnique({
            where:{
                email
            }
        });

        if(existingUser){
            
            return NextResponse.json({error: "User Already Exists"}, {status: 409}) 
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.users.create({
            data:{
                email, 
                name, 
                hashedPassword,
                image:'',
                emailVerified: new Date()
            }
        });

        return NextResponse.json({user}, {status: 201});
    }catch(error){
        console.log(error);
    }
}
