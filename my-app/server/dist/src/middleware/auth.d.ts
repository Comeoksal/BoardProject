import { FastifyRequest, FastifyReply } from 'fastify';
interface AuthRequest extends FastifyRequest {
    cookies: {
        x_auth?: string;
    };
}
export declare const auth: (req: AuthRequest, reply: FastifyReply) => Promise<undefined>;
export {};
