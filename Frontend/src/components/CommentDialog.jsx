import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";

import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Button } from "./ui/button";


const CommentDialog = ({ open, setOpen }) => {
    


    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-5xl p-0 flex flex-col">
                <div className='flex flex-1'>
                    <div className='w-1/2'>
                        <img className={'rounded-sm my-2 w-full aspect-square object-cover'}
                            src="https://plus.unsplash.com/premium_photo-1750681051145-45991d0693ee?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="picture" />
                    </div>
                    <div className="m-1/2 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <div className='flex gap-3 items-center'>
                                <Link>
                                    <Avatar>
                                        <AvatarImage src="" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link className='font-semibold text-xs'>Link</Link>
                                    {/*<span className='text-gray-600 text-sm'>Bio here...</span>*/}
                                </div>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className='cursor-pointer' />
                                </DialogTrigger>
                                <DialogContent className="flex flex-col items-center text-sm text-center">
                                    <div className='cursor-pointer w-full text-[#ED4956] font-bold'>
                                        Unfollow
                                    </div>
                                    <div className='cursor-pointer w-full'>
                                        Add to favorites
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <hr />
                        <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                            comment1
                            comment2
                            comment3
                            comment4
                        </div>
                        <div className='p-4'>
                            <div className='flex items-center gap-2'>
                                <input type="text" placeholder="Add a comment..." className='w-full outline-none border text-sm border-gray-300 p-2 rounded'/>
                                <Button variant="outline">Send</Button>

                            </div>
                            
                               
                        </div>

                    </div>
                </div>



            </DialogContent>
        </Dialog >
    )
}

export default CommentDialog;