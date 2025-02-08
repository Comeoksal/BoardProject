import { Document, Model } from 'mongoose';
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
}
interface IPostModel extends Model<IPost> {
}
interface ICommentModel extends Model<IComment> {
}
export declare const Post: IPostModel;
export declare const Comment: ICommentModel;
export {};
