import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '@models/User';

// 쿠키 타입이 포함된 FastifyRequest 확장
interface AuthRequest extends FastifyRequest {
    cookies: {
        x_auth?: string;
    };
}
// 인증 미들웨어
export const auth = async (req: AuthRequest, reply: FastifyReply) => {
    try {

        const token = req.cookies?.x_auth;
        console.log("Received token:", token);  // 디버깅: 토큰 확인
        if (!token) {
            console.error("No token provided");
            return reply.status(401).send({ isAuth: false, error: 'No token provided' });
        }

        const user = await User.findOne({ token });

        if (!user) {
            console.error("User not found");
            return reply.status(401).send({ isAuth: false, error: 'User not found' });
        }

        (req as any).user = user;
    } catch (err) {
        console.error("Internal server error:", err);
        return reply.status(500).send({ isAuth: false, error: 'Internal server error' });
    }
};