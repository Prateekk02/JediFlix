import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";

const handler = async () => {
  try {
    const currentUser = await serverAuth(); 
    return NextResponse.json(currentUser); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 400 }); 
  }
};

export { handler as POST };
