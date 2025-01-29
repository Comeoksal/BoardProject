import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { User } from "../models/User";
import { auth } from "../middleware/auth";

// ✅ 요청 바디 타입 정의
interface RegisterBody {
    name: string;
    email: string;
    password: string;
}

interface LoginBody {
    id: string,
    email: string;
    password: string;
}

export default async function authification(fastify: FastifyInstance, options: FastifyPluginOptions) {

    // 🔹 회원가입 라우트
    fastify.post('/api/users/register', async (req: FastifyRequest<{ Body: RegisterBody }>, reply: FastifyReply) => {
        try {
            const user = new User(req.body);
            const savedUser = await user.save();
            reply.status(200).send({ success: true, doc: savedUser }); // ✅ .json() 대신 .send() 사용
        } catch (err) {
            reply.status(400).send({ success: false, error: err });
        }
    });

    // 🔹 로그인 라우트
    fastify.post('/api/users/login', async (req: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return reply.status(401).send({ loginSuccess: false, message: "제공된 이메일에 해당하는 유저가 없습니다." });
            }
            const isMatch = await user.comparePassword(req.body.password);
            if (!isMatch) {
                return reply.status(401).send({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
            }

            const token = await user.generateToken();
            reply.setCookie("x_auth", token, { httpOnly: true })
                .status(200)
                .send({ loginSuccess: true, userId: user._id });

        } catch (err) {
            console.error("Error during login:", err);
            reply.status(500).send({ loginSuccess: false, message: "서버 에러 발생" });
        }
    });

    // 🔹 인증 확인 (미들웨어 `auth` 필요)
    fastify.get('/api/users/auth', { preHandler: auth }, async (req: FastifyRequest, reply: FastifyReply) => {
        reply.status(200).send({
            _id: (req as any).user._id,  // req.user가 TypeScript에 정의되지 않아서 any로 우회
            isAdmin: (req as any).user.role === 0 ? false : true,
            isAuth: true,
            id: (req as any).user.id,
            email: (req as any).user.email,
            name: (req as any).user.name,
            role: (req as any).user.role,
        });
    });

    // 🔹 로그아웃
    fastify.get('/api/users/logout', { preHandler: auth }, async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const user = await User.findOneAndUpdate({ _id: (req as any).user._id }, { token: "" });

            if (!user) {
                return reply.status(400).send({ success: false, message: "로그아웃 실패" });
            }
            return reply.status(200).send({ success: true });

        } catch (err) {
            reply.status(500).send({ success: false, error: "서버 에러 발생" });
        }
    });
}
