import mongoose, { Schema, Document, Model } from 'mongoose';

interface IComment {
    userId: string;
    author: string;
    comment: string;
    anonymous: boolean;
    anonymous_number: number;
}
interface IPost extends Document {
    userId: string;
    author: string;
    title: string;
    content: string;
    anonymous: boolean;
    likes: string[];
    comments: IComment[];
    timestamp: number;
    commenters: string[];
}
interface IPostModel extends Model<IPost> { };
interface ICommentModel extends Model<IComment> { };
const commentSchema = new mongoose.Schema<IComment>({
    userId: {
        type: String,
        required: true,
    },
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
    },
    anonymous_number: {
        type: Number,
    }
})
const postSchema = new mongoose.Schema<IPost>({
    userId: {
        type: String,
        required: true,
    },
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
        type: Number,
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
