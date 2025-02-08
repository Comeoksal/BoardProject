import dotenv from 'dotenv';
dotenv.config();
import Fastify from "fastify";
import cors from '@fastify/cors'
import mongoose from "mongoose";
mongoose.connect(process.env.MongoURI!)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))
import { User } from "./models/User";
import fastifyCookie from "@fastify/cookie";
//Autoload 5 line
import autoload from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//
const fastify = Fastify({
    logger: true,
    trustProxy: true // 🔥 프록시 요청 허용 (ngrok 사용 시 필수)
});
// CORS 설정 등록
fastify.register(cors, {
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:3000",
            "https://kspage.netlify.app",
        ];

        // 🔥 origin이 없거나 허용된 도메인에 포함되면 허용
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"), false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowedHeaders: ["Content-Type", "Authorization"]
});
fastify.register(fastifyCookie, {
    parseOptions: {
        sameSite: "none", // 🔥 반드시 소문자로 작성
        secure: true, // 🚀 운영 환경에서는 true, 개발 환경에서는 false
        httpOnly: true, // 브라우저에서 접근 불가 (보안)
        path: '/',
    }
});
//Autoload
fastify.register(autoload, {
    dir: join(__dirname, "controller")
});
const start = async () => {
    const PORT = parseInt(process.env.PORT!);
    try {
        await fastify.listen({ port: PORT, host: '0.0.0.0' });
        console.log(`Fastify Server Running at ${PORT} port`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();