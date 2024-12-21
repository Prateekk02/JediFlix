import { AuthComponent } from "../components"; 
import Image from "next/image";

const Auth = () =>{
    return<>
        <div className="relative min-h-screen bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover">
            <div className="bg-black min-h-screen lg:bg-opacity-50 ">
                <nav className="px-12 py-5 rounded-md">
                <Image 
                    src={"/images/logo.jpeg"}
                    alt="JediFlix Logo"
                    objectFit="cover"
                    height={144}
                    width={144}
                /> 
                </nav> 
                <AuthComponent />        
            </div>
        </div>
    </> 
}

export default Auth;