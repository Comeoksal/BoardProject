import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CommentListItem from "./CommentListItem";

const Wrapper = styled.div`
    width : 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`
export default function CommentList({ postId, comment_count }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACK_SERVER + `/api/posts/${postId}/comments/load`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("댓글들 불러오기 실패");
                }
                const data = await response.json();
                setComments(data);
            } catch (err) {
                console.error("댓글들 불러오기 중 문제 발생 ", err);
            }
        }
        fetchComments();
    }, [postId, comment_count]);

    return (
        <Wrapper>
            {comments.map((comment) => {
                return (
                    <CommentListItem
                        key={comment._id}
                        comment={comment.comment}
                        author={!comment.anonymous ? comment.author : comment.anonymous_number === -1 ? '익명(글쓴이)' : `익명${comment.anonymous_number}`}
                    />
                )
            })}
        </Wrapper>
    )
}