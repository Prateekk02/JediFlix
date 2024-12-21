'use client'
import Input from "../Input"
import React, { useCallback, useState } from "react"



export const AuthComponent = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [name, setName] = useState("");

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() =>{
        setVariant((currentVariant) => currentVariant === 'login' ? 'register':'login')
    },[])
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

                <button className="
                    bg-red-600
                    w-full
                    py-3 
                    text-white
                    rounded-md
                    mt-10
                    hover:bg-red-700
                    transition 
                ">{variant === 'login' ? "Login" : "Sign Up"}</button>
                 
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