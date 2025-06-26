import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog } from "./ui/dialog";
import React, { useState } from "react";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";

const Post = () => {
    const [text, setText] = useState("");

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("");
        }
    }
    return (
        <div className='my-8 w-full max-w-sm mx-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src="" alt="post_image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <h1>username</h1>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className="cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center text-sm text-center">
                        <Button variant='ghost' className="cursor-pointer w-fit text-[#ED4956] font-bold">Unfollow</Button>
                        <Button variant='ghost' className="cursor-pointer w-fit">Add to favorites</Button>
                        <Button variant='ghost' className="cursor-pointer w-fit">Delete</Button>
                    </DialogContent>

                </Dialog>
            </div>
            <img className={'rounded-sm my-2 w-full aspect-square object-cover'}
                src="https://plus.unsplash.com/premium_photo-1750681051145-45991d0693ee?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="picture" />

            <div className={'flex items-center justify-between my-2'}>
                <div className={'flex items-center gap-3'}>
                    <FaRegHeart size={'22px'} className='cursor-pointer text-red-600' />
                    <MessageCircle className='cursor-pointer hover:text-gray-600' />
                    <Send className='cursor-pointer hover:text-gray-600' />
                </div>
                <Bookmark className='cursor-pointer hover:text-gray-600' />
            </div>
            <span className='font-medium block mb-2'>100 likes</span>
            <p>
                <span className='font-medium mr-2'>username</span>
                caption
            </p>
            <span>View all 100 comments</span>
            <CommentDialog />
            <div className='flex items-center justify-between'>
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={text}
                    onChange={changeEventHandler}
                    className="outline-none text-sm w-full"
                />
                {
                    text && <span /*onClick={commentHandler}*/ className='text-[#3BADF8] cursor-pointer'>Post</span>
                }

            </div>


        </div>
    )
}

export default Post;