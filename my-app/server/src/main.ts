import dotenv from 'dotenv';
dotenv.config();
import Fastify from "fastify";
import cors from '@fastify/cors'
import mongoose from "mongoose";
mongoose.connect(process.env.MongoURI!)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))
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
    trustProxy: true
});
// CORS 설정 등록
fastify.register(cors, {
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:3000",
            "https://kspage.netlify.app",
            "https://reactstudy.onrender.com",
        ];

        // 
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