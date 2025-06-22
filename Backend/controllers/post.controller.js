import sharp from 'sharp';
import { Post } from '../models/post.model.js';
import cloudinary from '../utils/cloudinary';
import { User } from '../models/user.model.js';
export const addNewPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;
        const authorId = req.id;

        if (!image) {
            return res.status(400).json({
                message: "Image required"
            });

        }
        //for uploading image using multer
        const optimizedImageBuffer = await sharp(image.buffer).resize({ width: 800, height: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 }).toBuffer();

        //buffer to uri
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId
        });

        const user = await User.findById(authorId);
        if (user) {
            user.posts.push(post._id);
            await user.save();
        }

        await post.populate({ path: 'author', select: '-password' });
        return res.status(201).json({
            message: "New post added",
            post,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'username, profilePicture' })
            .populate({
                path: 'comments', sort: { createdAt: -1 }, populate: {
                    path: 'author',
                    select: 'username, profilePicture'
                }
            });
        return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

export const getUserPost = async (req, res) => {
    try {
        const authorId = req.id;
        const posts = await Post.find({ author: authorId }).sort({ createdAt: -1 })
            .populate({
                path: 'author',
                select: 'username, profilePicture'
            }).populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: {
                    path: 'author',
                    select: 'username, profilePicture'
                }
            });
        return res.status(200).json({
            posts,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
};

//Like post
export const likePost = async (req, res) => {
    try {
        const likeKrneWalaUserKiId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: 'Post Not Found!',
                success: false
            })

        }
        //like logic starts
        await post.updateOne({ $addToSet: { likes: likeKrneWalaUserKiId } });

        await post.save();

        //implementing socket io for real-time notifications




        return res.status(200).json({
            message:"post liked",
            success:true
        });


    } catch (error) {
        console.log(error);

    }
}

//dislike posts
export const dislikePost = async (req, res) => {
    try {
        const likeKrneWalaUserKiId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: 'Post Not Found!',
                success: false
            })

        }
        //dislike logic starts
        await post.updateOne({ $pull: { likes: likeKrneWalaUserKiId } });

        await post.save();

        //implementing socket io for real-time notifications




        return res.status(200).json({
            message:"post unliked",
            success:true
        });

        
    } catch (error) {
        console.log(error);

    }
}





