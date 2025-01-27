import Fastify from "fastify";
import { SERVER_PORT } from "./config.ts";
import { articles } from "./controller/articles.ts";
const fastify = Fastify({
    logger: true,
});
fastify.get('/', async (req, reply) => {
    return { hello: "world!!" };
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