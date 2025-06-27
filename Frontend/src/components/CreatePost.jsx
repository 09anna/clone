import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import React from "react";

const CreatePost=()=>{
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
                <form onSubmit={createPostHandler}>

                </form>

            </DialogContent>
        </Dialog>
    )
}

export default CreatePost;