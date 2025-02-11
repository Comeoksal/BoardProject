import React from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import PostListItem from "./PostListItem";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    width : 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`
export default function PostList() {
    const navigate = useNavigate();

    const fetchPosts = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACK_SERVER + "/api/posts/load", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("포스트들 불러오기 실패");
            }
            const data = await response.json();
            return data;
        } catch (err) {
            console.error("포스트들 불러오기 중 문제 발생 ", err);
        }
    }

    const { data: posts, isPending, isError } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts, staleTime: 5000, cacheTime: 10000 });

    if (isPending) return <div>Loading...</div>;
    if (isError) return <div>Error Loading...</div>;
    return (
        <Wrapper>
            {posts.map((post) => {
                return (
                    <PostListItem
                        key={post._id}
                        title={post.title}
                        author={post.anonymous ? "익명" : post.author}
                        like_count={post.likes.length}
                        comment_count={post.comments.length}
                        onClick={() => navigate(`/postviewroom/${post._id}`)}
                    />
                )
            })}
        </Wrapper>
    )
}