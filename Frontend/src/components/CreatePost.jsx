import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import React from "react";
import { DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Textarea } from "@/components/ui/textarea.jsx";


const CreatePost=({open, setOpen})=>{
    
    const createPostHandler=async(e)=>{
        e.preventDefault();
        try {
            
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={()=>setOpen(false)}>
                <DialogHeader className="font-semibold text-center ">Create New Post</DialogHeader>
                <div className="flex gap-3 items-center">
                    <Avatar>
                        <AvatarImage src="" alt="Image"/>
                            <AvatarFallback>CN</AvatarFallback>                        
                    </Avatar>
                    <div>
                        <h1 className='font-semibold text-xs'>Username</h1>
                        <span className='text-gray-600 text-xs'>Bio here...</span>
                    </div>
                </div>
                <Textarea className="focus-visible:ring-transparent border-none" placeholder="Write a caption..."/>

                
                

            </DialogContent>
        </Dialog>
    )
}

export default CreatePost;