import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb" 
import {compare} from 'bcrypt'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
const NEXT_AUTH =  NextAuth({

    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_ID || '',
            clientSecret:process.env.GITHUB_SECRET || '' 
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID || '',
            clientSecret:process.env.GOOGLE_CLIENT_SECRET || '' 
        }),
        Credentials({
            id: 'credentials',
            name:'Credentials',
            credentials:{
                email:{
                    label:'Email',
                    type: 'text'
                }, 
                password:{
                    label: 'Password',
                    type:'password'
                }
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials.password) {
                        throw new Error('Email and Password required');
                    }
            
                    
                    const user = await prismadb.users.findUnique({
                        where: {
                            email: credentials.email,
                        },
                    });
            
                    if (!user || !user?.hashedPassword) {
                        throw new Error("Email does not exist!");
                    }
            
                  
                    const isCorrectPassword = await compare(credentials.password, user.hashedPassword);
            
                    if (!isCorrectPassword) {
                        throw new Error("Incorrect Password!");
                    }
            
                    
                    return user;
                } catch (error) {
                   
                    console.error('Error during authorization:', error);
                    throw new Error("Authorization failed. Please try again.");
                }
            }
            
        })
    ] ,
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.email = user.email
            }

            return token;
        }, 

        async session({session,token}){
            session.user.email = token.email as string
            return session
        }
    },
    pages:{
        signIn: '/auth',
        
    },
    debug: process.env.NODE_ENV === 'development',
    adapter:PrismaAdapter(prismadb), 
    session:{
        strategy:'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    
    jwt:{
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET,
}) 

export default NEXT_AUTH;