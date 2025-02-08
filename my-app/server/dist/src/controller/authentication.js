import { User } from "@models/User";
import { auth } from "@middleware/auth";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlci9hdXRoZW50aWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQWV4QyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssVUFBVSxjQUFjLENBQUMsT0FBd0IsRUFBRSxPQUE2QjtJQUVoRyxjQUFjO0lBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsR0FBMkMsRUFBRSxLQUFtQixFQUFFLEVBQUU7UUFDM0csSUFBSSxDQUFDO1lBQ0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjtRQUN6RixDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNYLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILGFBQWE7SUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEtBQUssRUFBRSxHQUF3QyxFQUFFLEtBQW1CLEVBQUUsRUFBRTtRQUNyRyxJQUFJLENBQUM7WUFDRCxNQUFNLElBQUks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