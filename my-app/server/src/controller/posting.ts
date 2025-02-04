import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { Post } from "../models/Post";

interface UploadBody {
    author: string;
    title: string;
    content: string;
    anonymous: boolean;
}
interface PostParams {
    postId: string;
}
export default async function posting(fastify: FastifyInstance, options: FastifyPluginOptions) {

    //글 포스팅
    fastify.post('/api/posts/upload', async (req: FastifyRequest<{ Body: UploadBody }>, reply: FastifyReply) => {
        try {
            const post = new Post(req.body);
            const savedPost = await post.save();
            reply.status(200).send({ success: true, doc: savedPost });
        } catch (err) {
            reply.status(400).send({ success: false, err: "업로드 오류" })
        }
    })
    //글 전체 불러오기
    fastify.get('/api/posts/load', async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const posts = await Post.find({});
            reply.status(200).send(posts);
        } catch (err) {
            reply.status(400).send({ success: false, err: "포스트들의 불러오기 오류 " });
        }
    })
    fastify.get('/api/posts/:postId', async (req: FastifyRequest<{ Params: PostParams }>, reply: FastifyReply) => {
        try {
            const post = await Post.findById(req.params.postId);
            reply.status(200).send(post);
        } catch (err) {
            reply.status(400).send({ success: false, err: "포스트 불러오기 오류" })
        }
    })
}