import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import React, { useRef, useState } from "react";
import { DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Button } from "./ui/button";
import { readFileAsDataURL } from "../lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";


const CreatePost = ({ open, setOpen }) => {
    const imageRef = useRef();
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);

    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const dataUrl = await readFileAsDataURL(file);
            setImagePreview(dataUrl);
        }
    }

    const createPostHandler = async (e) => {
        const formData =new FormData();
        formData.append("caption", caption);
        if(imagePreview) formData.append("image", file);
        
        
        try {
            setLoading(true);
            const res=await axios.post("http://localhost:8000/api/v1/post/addpost", formData, {
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials: true
            } );
            if(res.data.success){
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }

    }
    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)}>
                <DialogHeader className="font-semibold text-center ">Create New Post</DialogHeader>
                <div className="flex gap-3 items-center">
                    <Avatar>
                        <AvatarImage src="" alt="Image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className='font-semibold text-xs'>Username</h1>
                        <span className='text-gray-600 text-xs'>Bio here...</span>
                    </div>
                </div>
                <Textarea value={caption} onChange={(e)=> setCaption(e.target.value)} className="focus-visible:ring-transparent border-none" placeholder="Write a caption..." />
                {
                    imagePreview && (
                        <div className='w-full h-64 flex items-center justify-center'>
                            <img src={imagePreview} alt="image_preview" className='object-cover h-full w-full rounded-md' />
                        </div>
                    )
                }
                <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
                <Button onClick={() => imageRef.current.click()} className="w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] ">Select from Device</Button>
                {
                    imagePreview && (
                        loading ? (
                            <Button>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            </Button>
                        ) : (
                            <Button onClick={createPostHandler} type="submit" className="w-full">Post</Button>
                        )
                    )
                }

            </DialogContent>
        </Dialog>
    )
}

export default CreatePost;