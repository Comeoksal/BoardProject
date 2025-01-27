import Fastify from "fastify";
//import { SERVER_PORT } from "./config.ts";
const fastify = Fastify({
    logger: true,
});
const SERVER_PORT = 5000;
const articleSchema = {
    schema: {
        Headers: {
            type: 'object',
            properties: {
                authorization: { type: 'string' }
            },
            required: ['authorization'],
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    hello: { type: 'string' },
                    name: { type: 'string' },
                    age: { type: 'number' },
                }
            }
        }
    }
}
fastify.get('/', async (req, res) => {
    return { hello: "world!!" };
});
fastify.get('/articles', articleSchema, async (req, res) => {
    return { hello: 'world', name: 'kim', age: '9' };
});
fastify.get('/ping', async (req, res) => {
    return 'pong\n';
});

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