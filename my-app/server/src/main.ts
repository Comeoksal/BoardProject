import Fastify from "fastify";
import cors from '@fastify/cors'
import { CONFIG } from "./config.ts";

import mongoose from "mongoose";
mongoose.connect(CONFIG.MongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))
import { User } from "./models/User";
import fastifyCookie from "@fastify/cookie";
//Autoload 5 line
import autoload from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//
const fastify = Fastify({
    logger: true,
});
// CORS 설정 등록
fastify.register(cors, {
    origin: 'http://localhost:3000', // 프론트엔드 서버 주소
    methods: ['GET', 'POST'] // 허용할 HTTP 메서드
});
fastify.register(fastifyCookie);
//Autoload
fastify.register(autoload, {
    dir: join(__dirname, "controller")
});
fastify.get('/', async (req, reply) => {
    console.log('클라이언트가 루트 경로로 접근');
    reply.send({ message: '백엔드 콘솔 출력 완료' });
});
const start = async () => {
    try {
        await fastify.listen({ port: CONFIG.PORT, host: '127.0.0.1' });
        console.log(`Fastify Server Running at ${CONFIG.PORT} port`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();