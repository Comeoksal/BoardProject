import dotenv from 'dotenv';
import Fastify from "fastify";
import mongoose from "mongoose";
import cors from '@fastify/cors'
import fastifyCookie from "@fastify/cookie";
//Autoload 5 line
import autoload from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
//DB 연결
export const dbconnect = async () => {
    try {
        mongoose.connect(process.env.MongoURI!)
        console.log("MongoDB connected..");
    } catch (err) {
        console.error("DB connecting error", err);
    }
}
//Fastify 설정
const fastify = Fastify({
    logger: true,
    trustProxy: true
});
// CORS 설정
fastify.register(cors, {
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:3000",
            "https://kspage.netlify.app",
            "https://reactstudy.onrender.com",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"), false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ["Content-Type", "Authorization"]
});
// 쿠키 설정
fastify.register(fastifyCookie, {
    parseOptions: {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        path: '/',
    }
});
//Autoload
fastify.register(autoload, {
    dir: join(__dirname, "controller"),
    options: {
        timeout: 30000
    }
});
//서버 실행
const start = async () => {
    const PORT = parseInt(process.env.PORT!);
    try {
        await dbconnect();
        await fastify.listen({ port: PORT, host: '0.0.0.0' });
        console.log(`Fastify Server Running at ${PORT} port`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();