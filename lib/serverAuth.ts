import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import NEXT_AUTH from "./auth";
import { Session } from "next-auth"; 


interface CustomSession extends Session {
  user: {
    email: string;    
  };
}

export const serverAuth = async () => {
 
  const session = await getServerSession(NEXT_AUTH);

  
  const customSession = session as CustomSession;

 
  if (!customSession || !customSession.user?.email) {
    return NextResponse.json({ error: "Not signed in!" }, { status: 401 });
  }

  return NextResponse.json({ message: "Authenticated" });
};

export default serverAuth;
