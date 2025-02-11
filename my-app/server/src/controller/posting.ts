import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { Post } from "../models/Post.ts";
interface UploadBody {
    author: string;
    title: string;
    content: string;
    anonymous: boolean;
    likes: string[];
    comments: Array<{ author: string, comment: string }>;
    timestamp: number;
    commenters: string[];
}
interface CommentBody {
    userId: string;
    author: string;
    comment: string;
    anonymous: boolean;
    anonymous_number: number;
}
interface LikeBody {
    userId: string;
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
            reply.status(200).send(posts.reverse());
        } catch (err) {
            reply.status(400).send({ success: false, err: "포스트들의 불러오기 오류 " });
        }
    })
    //postId로 글 하나 불러오기
    fastify.get('/api/posts/:postId', async (req: FastifyRequest<{ Params: PostParams }>, reply: FastifyReply) => {
        try {
            const post = await Post.findById(req.params.postId);
            reply.status(200).send(post);
        } catch (err) {
            reply.status(400).send({ success: false, err: "포스트 불러오기 오류" })
        }
    })
    //postId로 좋아요 업로드 (좋아요 누른 사용자명으로 관리)
    fastify.put('/api/posts/:postId/like', async (req: FastifyRequest<{ Params: PostParams, Body: LikeBody }>, reply: FastifyReply) => {
        try {
            const { userId } = req.body;
            const post = await Post.findById(req.params.postId);
            if (!post) {
                return reply.status(400).send({ success: false, err: "포스트 찾기 오류" });
            }
            const likeIndex = post.likes.indexOf(userId);
            if (likeIndex === -1) {
                post.likes.push(userId);
            } else {
                post.likes.splice(likeIndex, 1);
            }
            const updatedPost = await post.save();
            reply.status(200).send({ success: true, post: updatedPost.likes.length });
        } catch (err) {
            reply.status(400).send({ success: false, err: "좋아요 저장 오류" });
        }
    })
    //postId로 댓글 하나 업로드하기
    fastify.post('/api/posts/:postId/comment', async (req: FastifyRequest<{ Params: PostParams, Body: CommentBody }>, reply: FastifyReply) => {
        try {
            const { userId } = req.body;
            const { author } = req.body;
            const { comment } = req.body;
            const { anonymous } = req.body;
            const { anonymous_number } = req.body;
            const post = await Post.findById(req.params.postId);
            if (!post) {
                return reply.status(400).send({ success: false, err: "포스트 찾기 오류" });
            }
            post.comments.push({ userId, author, comment, anonymous, anonymous_number })
            if (req.body.anonymous) {
                if (!post.commenters.includes(userId)) {
                    post.commenters.push(userId);
                }
            }
            const updatedPost = await post.save();
            reply.status(200).send({ success: true, post: updatedPost });
        } catch (err) {
            reply.status(400).send({ success: false, err: "댓글 저장 오류" });
        }
    })
    //postId로 댓글 모두 불러오기
    fastify.get('/api/posts/:postId/comments/load', async (req: FastifyRequest<{ Params: PostParams }>, reply: FastifyReply) => {
        try {
            const post = await Post.findById(req.params.postId);
            if (!post) {
                return reply.status(400).send({ success: false, err: "댓글 불러오기 중 포스트 찾기 오류" })
            }
            const comments = await post.comments;
            reply.status(200).send(comments);
        } catch (err) {
            reply.status(400).send({ success: false, err: "댓글들 불러오기 오류" })
        }
    })
}