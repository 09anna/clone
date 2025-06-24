//import { Label, Input } from "@radix-ui/react-label";
import React from "react";
import { Input } from "./ui/input.jsx";
import { Button } from "./ui/button.jsx";



const Signup = () => {
    return (
        <div className='flex items-center w-screen h-screen justify-center'>
            <form action="" className='shadow-lg bg-white flex flex-col gap-5 p-8'>
                <div className="my-4">
                    <h1 className="text-center font-bold text-xl">Logo</h1>
                    <p>SignUp to see photos and videos.</p>
                </div>
                <div>
                    <span className="font-medium my-2">Username</span>
                    <Input
                        type="text"
                        className="focus-visible:ring-transparent my-2" /><br></br>
                </div>
                
                <div>
                    <span className="font-medium my-2">Email</span>
                    <Input
                        type="text"
                        className="focus-visible:ring-transparent my-2" /><br></br>
                </div>
                <div>
                    <span className="font-medium">Password</span>
                    <Input
                        type="text"
                        className=" focus-visible:ring-transparent my-2 "
                    /><br></br>
                </div>

                <Button>Signup</Button>
            </form>
        </div>
    )
}

export default Signup;