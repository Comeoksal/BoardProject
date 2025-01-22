import Fastify from "fastify";
import { SERVER_PORT } from "./config.js";
const fastify = Fastify({
    logger: true,
});

fastify.get('/', async (req, res) => {
    return { hello: "world" };
});
fastify.get('/test1', async (req, res) => {
    return { test1: "Hi" };
})
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
