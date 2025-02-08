import { Document, Model } from 'mongoose';
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    token?: string;
    tokenExp?: number;
    role?: number;
    comparePassword(plainPassword: string): Promise<boolean>;
    generateToken(): Promise<string>;
    findbyToken(token: string): Promise<IUser | null>;
}
interface IUserModel extends Model<IUser> {
}
export declare const User: IUserModel;
export {};
