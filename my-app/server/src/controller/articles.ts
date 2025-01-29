import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";

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

export default async function articles(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/articles', articleSchema, async (req: FastifyRequest, reply: FastifyReply) => {
        return { hello: 'world', name: 'kim', age: '9' };
    });
}