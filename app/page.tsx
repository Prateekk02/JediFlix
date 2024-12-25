'use client'
import { signOut } from "next-auth/react";

const Home = () =>{
  return <>
      <main className="min-h-screen bg-gray-700 ">
      <h1 className="text-3xl text-white font-bold">JediFlix</h1>
      
      <button 
        onClick={() => signOut()}
        className="h-10 w-20 bg-red-600 rounded-md mt-5 transition text-neutral-100 ml-8 font-bold hover:opacity-80 cursor-pointer">Sign out</button>
      </main>
  </>
}

export default Home;