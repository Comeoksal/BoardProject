import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

// 인터페이스 정의
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

// 모델 인터페이스 정의
interface IUserModel extends Model<IUser> { }

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        maxlength: 50,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        maxlength: 100,
        required: true,
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
    role: {
        type: Number,
        default: 0,
    },
});

// 비밀번호 암호화 (pre-hook)
userSchema.pre<IUser>('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

// 메서드: 비밀번호 비교
userSchema.methods.comparePassword = function (plainPassword: string): Promise<boolean> {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, user.password, (err, isMatch) => {
            if (err) return reject(err);
            resolve(isMatch);
        });
    });
};

// 메서드: 토큰 생성
userSchema.methods.generateToken = async function (): Promise<string> {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;

    try {
        await user.save();
        return token;
    } catch (err) {
        throw err;
    }
};

// 메서드: 토큰으로 사용자 찾기
userSchema.methods.findbyToken = async function (token: string): Promise<IUser | null> {
    try {
        const decoded = jwt.verify(token, 'secretToken') as string;
        const user = await (this.constructor as IUserModel).findOne({
            _id: decoded,
            token: token,
        });
        return user;
    } catch (err) {
        throw err;
    }
};

// 모델 생성
export const User = mongoose.model<IUser, IUserModel>('User', userSchema);
