'use client'
import Input from "../Input";
import React, { useCallback, useState } from "react"
import axios from 'axios'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";  
import { FaGithub } from "react-icons/fa"


export const AuthComponent = () =>{
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [name, setName] = useState("");

    const [variant, setVariant] = useState('login'); 

    const toggleVariant = useCallback(() =>{
        setVariant((currentVariant) => currentVariant === 'login' ? 'register':'login')
    },[])

    const register = useCallback(async () =>{
        try{
            await axios.post('/api/register/', {
                email,
                name, 
                password
            })
        }
        catch(error){
            console.log(error)
        }
    }, [email,name, password])
   
    const login = useCallback(async () =>{
        try{
            await signIn('credentials',{
                email,
                password,
                redirect:false,
                callbackUrl: '/'
            })
            router.push('/')
        }
        catch(error){
            console.log(error)
        }
    }, [email, password, router])

    return(<>
        <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center lg:w-2/5 lg:max-w-md rounded-md w-full">
                <h2 className="text-white font-semibold text-4xl mb-8">{variant ==='login'? "Sign In" : "Register"} </h2>
                <div className="flex flex-col gap-4">
                    {variant === 'register' && (
                        <Input 
                        label="Email"
                        id="email"
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) =>setEmail(e.target.value)}
                        value={email}
                        type="email"
                    />
                    )}
                    <Input 
                        label="Username"
                        id="username"
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) =>setName(e.target.value)}
                        value={name}
                        
                    />
                    <Input 
                        label="Password"
                        id="password"
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) =>setPassword(e.target.value)}
                        value={password}
                        type="password"
                    />
                </div>

                <button
                               
                onClick={variant === 'login' ? login : register}                 
                className="
                    bg-red-600
                    w-full
                    py-3 
                    text-white
                    rounded-md
                    mt-10
                    hover:bg-red-700
                    transition 
                ">{variant === 'login' ? "Login" : "Sign Up"}</button>
                 
                <div className="flex flex-row justify-center items-center gap-4 mt-8 ">
                    <button
                        onClick={() => signIn('google', {callbackUrl: '/'})}
                        className="h-10 w-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                        <FcGoogle size={30} />
                    </button>
                    <button 
                        onClick={() => signIn('github', {callbackUrl: '/'})}
                        className="h-10 w-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                        <FaGithub size={30} />
                    </button>
                </div>    
                 
                <p className="text-neutral-500 mt-12 w-full">
                    {variant === 'login'? "First time using JediFlix? " : "Already have an account? " }
                    <span 
                        onClick={toggleVariant}
                        className="text-white font-bold cursor-pointer m-1 hover:underline">
                            {variant === 'login'? "Create an account." : "Login"}
                    </span>
                </p> 
                               
            </div>
        </div>
        
    </>) 
} 