import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPost extends Document {
    author: string;
    title: string;
    content: string;
    anonymous: boolean;
}

interface IPostModel extends Model<IPost> { };

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
    }
});

export const Post = mongoose.model<IPost, IPostModel>('Post', postSchema);
