import dotenv from 'dotenv';
dotenv.config();
import Fastify from "fastify";
import cors from '@fastify/cors';
import mongoose from "mongoose";
mongoose.connect(process.env.MongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
import fastifyCookie from "@fastify/cookie";
//Autoload 5 line
import autoload from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//
const fastify = Fastify({
    logger: true,
    trustProxy: true // 🔥 프록시 요청 허용 (ngrok 사용 시 필수)
});
// CORS 설정 등록
fastify.register(cors, {
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:3000",
            "https://kspage.netlify.app",
        ];
        // 🔥 origin이 없거나 허용된 도메인에 포함되면 허용
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"), false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowedHeaders: ["Content-Type", "Authorization"]
});
fastify.register(fastifyCookie, {
    parseOptions: {
        sameSite: "none", // 🔥 반드시 소문자로 작성
        secure: true, // 🚀 운영 환경에서는 true, 개발 환경에서는 false
        httpOnly: true, // 브라우저에서 접근 불가 (보안)
        path: '/',
    }
});
//Autoload
fastify.register(autoload, {
    dir: join(__dirname, "controller"),
    options: {
        timeout: 30000 // 30초로 증가
    }
});
const start = async () => {
    const PORT = parseInt(process.env.PORT);
    try {
        await fastify.listen({ port: PORT, host: '0.0.0.0' });
        console.log(`Fastify Server Running at ${PORT} port`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUM1QixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEIsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sSUFBSSxNQUFNLGVBQWUsQ0FBQTtBQUNoQyxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFDaEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVMsQ0FBQztLQUNsQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0tBQy9DLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUVuQyxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxpQkFBaUI7QUFDakIsT0FBTyxRQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUNwQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBVyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsRCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEMsRUFBRTtBQUNGLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNwQixNQUFNLEVBQUUsSUFBSTtJQUNaLFVBQVUsRUFBRSxJQUFJLENBQUMsK0JBQStCO0NBQ25ELENBQUMsQ0FBQztBQUNILGFBQWE7QUFDYixPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtJQUNuQixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUU7UUFDekIsTUFBTSxjQUFjLEdBQUc7WUFDbkIsdUJBQXVCO1lBQ3ZCLDRCQUE0QjtTQUMvQixDQUFDO1FBRUYsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLElBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQzdDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekIsQ0FBQzthQUFNLENBQUM7WUFDSixRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RCxDQUFDO0lBQ0wsQ0FBQztJQUNELFdBQVcsRUFBRSxJQUFJO0lBQ2pCLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQztJQUMxQyxjQUFjLEVBQUUsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDO0NBQ3BELENBQUMsQ0FBQztBQUNILE9BQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFO0lBQzVCLFlBQVksRUFBRTtRQUNWLFFBQVEsRUFBRSxNQUFNLEVBQUUsaUJBQWlCO1FBQ25DLE1BQU0sRUFBRSxJQUFJLEVBQUUsbUNBQW1DO1FBQ2pELFFBQVEsRUFBRSxJQUFJLEVBQUUsb0JBQW9CO1FBQ3BDLElBQUksRUFBRSxHQUFHO0tBQ1o7Q0FDSixDQUFDLENBQUM7QUFDSCxVQUFVO0FBQ1YsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFDdkIsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO0lBQ2xDLE9BQU8sRUFBRTtRQUNMLE9BQU8sRUFBRSxLQUFLLENBQUUsVUFBVTtLQUM3QjtDQUNKLENBQUMsQ0FBQztBQUNILE1BQU0sS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ3JCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUssQ0FBQyxDQUFDO0lBQ3pDLElBQUksQ0FBQztRQUNELE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsSUFBSSxPQUFPLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLEtBQUssRUFBRSxDQUFDIn0=