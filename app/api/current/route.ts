import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/lib/serverAuth";

const handler = (req: NextApiRequest, res:NextApiResponse) =>{
    try{
        const currentUser = serverAuth(req)

        return res.status(200).json(currentUser)
    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
}

export {handler as POST}