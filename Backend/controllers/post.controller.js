import sharp from 'sharp';
import { Post } from '../models/post.model.js';
import cloudinary from '../utils/cloudinary.js';
import { User } from '../models/user.model.js';
import { Comment } from '../models/comment.model.js';
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
            .populate({ path: 'author', select: 'username profilePicture' })
            .populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: {
                    path: 'author',
                    select: 'username profilePicture'
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
            message: "post liked",
            success: true
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
            message: "post unliked",
            success: true
        });


    } catch (error) {
        console.log(error);

    }
}

//add comments
export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentKrneWalaUserKiId = req.id;

        const { text } = req.body;
        const post = await Post.findById(postId);
        if (!text) {
            return res.status(400).json({
                message: 'Text is required',
                success: false
            })
        }
        const comment = await Comment.create({
            text,
            author: commentKrneWalaUserKiId,
            post: postId
        })
        await comment.populate({
            path: 'author',
            select: 'username profilePicture'
        });
        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            message: "Comment Posted.",
            comment,
            success: true
        });
    } catch (error) {
        console.log(error);
    }

};

export const getCommentOfPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({ post: postId }).populate('author', 'username profilePicture');

        if (!comments) {
            return res.status(404).json({
                message: "No Comments.",
                success: false
            })
        }
        return res.status(200).json({
            success: true,
            comments
        })
    } catch (error) {
        console.log(error);
    }

}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found.",
                success: false
            });
        }

        if (post.author.toString() !== authorId) {
            return res.status(403), json({
                message: "Unauthorized"
            });
        }

        //delete post
        await Post.findByIdAndDelete(postId);

        //remove the postId from the user
        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() !== postId);
        await user.save();

        //delete associated comments
        await Comment.deleteMany({ post: postId });
        return res.status(200).json({
            success: true,
            message: "Post Deleted."
        });

    } catch (error) {
        console.log(error);
    }

}


//Bookmark
export const bookmarkPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found.",
                success: false
            })
        }

        const user = await User.findById(authorId);
        if (user.bookmarks.includes(post._id)) {
            await user.updateOne({ $pull: { bookmarks: post._id } });
            await user.save();
            return res.status(200).json({
                type: 'unsaved',
                message: "Post is unsaved.",
                success: true
            });

        } else {
            await user.updateOne({ $addToSet: { bookmarks: post._id } });
            await user.save();
            return res.status(200).json({
                type: 'saved',
                message: "Post is saved.",
                success: true
            });
        }
    } catch (error) {
        console.log(error);

    }
}






