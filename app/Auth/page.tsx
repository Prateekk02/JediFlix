import Image from "next/image";
import { Input } from "../components";
const Auth = () =>{
    return<>
        <div className="relative min-h-screen bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover">
            <div className="bg-black min-h-screen lg:opacity-50 ">
                <nav className="px-12 py-5 rounded-md">
                <Image 
                    src={"/images/logo.jpeg"}
                    alt="JediFlix Logo"
                    objectFit="cover"
                    height={144}
                    width={144}
                /> 
                </nav>

                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white font-semibold text-4xl mb-8">Sign in</h2>
                        <div className="flex flex-col gap-4">
                            <Input />
                        </div>
                    </div>
                </div>
            </div>           
        </div>
    </> 
}

export default Auth;