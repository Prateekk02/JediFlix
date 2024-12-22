import {NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import  prismadb  from './prismadb'

const serverAuth = async (req:NextApiRequest) =>{
    const session = await getSession({req})

    if(!session?.user?.email){
        throw new Error("Not signed in!")
    }

    const currentUser = prismadb.users.findUnique({
        where:{
            email: session.user.email
        }
    });

    if(!currentUser)
        throw new Error("Not Signed in!!")

    return {currentUser}
}

export default serverAuth;