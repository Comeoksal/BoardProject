import mongoose, { Schema, Document, Model } from 'mongoose';

interface IComment {
    author: string;
    comment: string;
    anonymous: boolean;
}
interface IPost extends Document {
    author: string;
    title: string;
    content: string;
    anonymous: boolean;
    likes: string[];
    comments: IComment[];
    timestamp: string;
    commenters: string[];
}
interface IPostModel extends Model<IPost> { };
interface ICommentModel extends Model<IComment> { };
const commentSchema = new mongoose.Schema<IComment>({
    author: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    anonymous: {
        type: Boolean,
        required: true,
    }
})
const postSchema = new mongoose.Schema<IPost>({
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    anonymous: {
        type: Boolean,
        required: true,
    },
    likes: {
        type: [String],
        default: [],
        required: true,
    },
    comments: {
        type: [commentSchema],
        default: [],
    },
    timestamp: {
        type: String,
        required: true,
    },
    commenters: {
        type: [String],
        default: [],
        required: true,
    },
});

export const Post = mongoose.model<IPost, IPostModel>('Post', postSchema);
export const Comment = mongoose.model<IComment, ICommentModel>('Comment', commentSchema);
