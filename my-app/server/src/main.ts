import Fastify from "fastify";
import cors from '@fastify/cors'
import { SERVER_PORT } from "./config.ts";
import { articles } from "./controller/articles.ts";
const fastify = Fastify({
    logger: true,
});

// CORS 설정 등록
fastify.register(cors, {
    origin: 'http://localhost:3000', // 프론트엔드 서버 주소
    methods: ['GET', 'POST'] // 허용할 HTTP 메서드
});
fastify.get('/', async (req, reply) => {
    console.log('클라이언트가 루트 경로로 접근');
    reply.send({ message: '백엔드 콘솔 출력 완료' });
});
fastify.get('/ping', async (req, reply) => {
    return 'pong\n';
});
fastify.register(articles);
const start = async () => {
    try {
        await fastify.listen({ port: SERVER_PORT, host: '127.0.0.1' });
        console.log(`Fastify Server Running at ${SERVER_PORT} port`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();