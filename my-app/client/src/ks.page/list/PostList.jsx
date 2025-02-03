import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostListItem from "./PostListItem";
import { CONFIG } from "../config.ts"
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    width : 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`
export default function PostList(props) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(CONFIG.BACK_SERVER + "/api/posts/load", {
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
                setPosts(data.reverse());
            } catch (err) {
                console.error("포스트들 불러오기 중 문제 발생 ", err);
            }
        }
        fetchPosts();
    }, []);

    return (
        <Wrapper>
            {posts.map((post) => {
                return (
                    <PostListItem
                        key={post._id}
                        title={post.title}
                        author={post.anonymous ? "익명" : post.author}
                        onClick={() => navigate(`/postviewroom/${post._id}`)}
                    />
                )
            })}
        </Wrapper>
    )
}