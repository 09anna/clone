import {Conversation} from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
//for messaging
export const sendMessage=async(req, res)=>{
    try {
        const senderId=req.id;
        const receiverId=req.params.id;
        const {message}=req.body;

        let converstion=await Conversation.findOne({
            participants:{$all:[senderId, receiverId]}
        });

        //establish the conversation
        if(!converstion){
            converstion=await Conversation.create({
                participants:[senderId, receiverId]
            })
        }
        const newMessage=await Message


    } catch (error) {
        console.log(error);
        
    }
}