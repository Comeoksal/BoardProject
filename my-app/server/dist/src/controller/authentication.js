import { User } from "../models/User";
import { auth } from "../middleware/auth";
export default async function authentication(fastify, options) {
    // 🔹 회원가입 라우트
    fastify.post('/api/users/register', async (req, reply) => {
        try {
            const user = new User(req.body);
            const savedUser = await user.save();
            reply.status(200).send({ success: true, doc: savedUser }); // ✅ .json() 대신 .send() 사용
        }
        catch (err) {
            reply.status(400).send({ success: false, error: "이미 사용 중인 이메일입니다." });
        }
    });
    // 🔹 로그인 라우트
    fastify.post('/api/users/login', async (req, reply) => {
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
            reply.setCookie("x_auth", token, {
                httpOnly: true, // 보안: 브라우저에서 쿠키 접근 불가
                secure: true, // HTTPS 환경에서만 쿠키 전송
                sameSite: 'none' // 교차 출처 허용
            })
                .status(200)
                .send({ loginSuccess: true, userId: user._id });
        }
        catch (err) {
            console.error("Error during login:", err);
            reply.status(500).send({ loginSuccess: false, message: "서버 에러 발생" });
        }
    });
    // 🔹 인증 확인 (미들웨어 `auth` 필요)
    fastify.get('/api/users/auth', { preHandler: auth }, async (req, reply) => {
        reply.status(200)
            .send({
            _id: req.user._id, // req.user가 TypeScript에 정의되지 않아서 any로 우회
            isAdmin: req.user.role === 0 ? false : true,
            isAuth: true,
            name: req.user.name,
            email: req.user.email,
            token: req.user.token,
        });
    });
    // 🔹 로그아웃
    fastify.post('/api/users/logout', { preHandler: auth }, async (req, reply) => {
        try {
            const user = await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });
            if (!user) {
                console.error('로그아웃 실패: 유저를 찾지 못함');
                return reply.status(400).send({ success: false, message: "로그아웃 실패 in back" });
            }
            return reply
                .clearCookie('x_auth', {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/' // 쿠키 설정 경로 일치
            })
                .status(200).send({ success: true });
        }
        catch (err) {
            console.error("로그아웃 도중 서버 에러:", err);
            return reply.status(500).send({ success: false, error: "서버 에러 발생" });
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlci9hdXRoZW50aWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBZTFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxVQUFVLGNBQWMsQ0FBQyxPQUF3QixFQUFFLE9BQTZCO0lBRWhHLGNBQWM7SUFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLEtBQUssRUFBRSxHQUEyQyxFQUFFLEtBQW1CLEVBQUUsRUFBRTtRQUMzRyxJQUFJLENBQUM7WUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsMEJBQTBCO1FBQ3pGLENBQUM7UUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ1gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7UUFDMUUsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsYUFBYTtJQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLEdBQXdDLEVBQUUsS0FBbUIsRUFBRSxFQUFFO1FBQ3JHLElBQUksQ0FBQztZQUNELE1BQU0sSUFB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