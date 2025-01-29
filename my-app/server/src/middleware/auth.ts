import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../models/User';

// 쿠키 타입이 포함된 FastifyRequest 확장
interface AuthRequest extends FastifyRequest {
    cookies: {
        x_auth?: string;
    };
}
// 인증 미들웨어
const auth = async (req: AuthRequest, reply: FastifyReply) => {
    try {
        // 클라이언트 쿠키에서 토큰을 가져온다.
        const token = req.cookies?.x_auth;

        if (!token) {
            return reply.status(401).send({ isAuth: false, error: 'No token provided' });
        }

        // 토큰을 복호화한 후 유저를 찾는다.
        const user = await User.findOne({ token });

        if (!user) {
            return reply.status(401).send({ isAuth: false, error: 'User not found' });
        }

        // 인증된 유저 정보를 `req` 객체에 저장
        (req as any).user = user;
        (req as any).token = user.token;
    } catch (err) {
        return reply.status(500).send({ isAuth: false, error: 'Internal server error' });
    }
};

export { auth };
