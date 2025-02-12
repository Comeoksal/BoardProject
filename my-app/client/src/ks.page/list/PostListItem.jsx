import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color : rgba(255, 255, 255, 0.9);
    border: 1px solid rgb(158, 158, 158);
    border-radius: 8px;
    cursor: pointer;
    color : rgb(0, 0, 0);
    gap : 8px;
`
const StyledTitle = styled.p`
    font-size : 20px;
    font-weight : 1000;
    margin : 0;
`
const StyledContent = styled.p`
    font-size : 15px;
    font-weight : 500;
    margin : 0;
`
const StyledAuthor = styled.p`
    font-size : 13px;
    font-weight : 500;
    margin : 0;
`

export default function PostListItem({ title, content, author, onClick, like_count, comment_count, timestamp }) {
    const [currenttime, setCurrenttime] = useState(Date.now());

    useEffect(() => {
        setCurrenttime(Date.now());
    }, []);

    const stringLikeCount = like_count ? `❤️${like_count}` : "";
    const stringCommentCount = comment_count ? ` 💬${comment_count}` : "";
    const bar = (like_count || comment_count) ? " | " : "";

    const formatTime = (timestampMs) => {
        const diffMs = currenttime - timestampMs;
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const oneHour = 60;
        const oneDay = 60 * 24;

        if (diffMinutes < oneHour) {
            return diffMinutes === 0 ? "방금 전" : `${diffMinutes}분 전`;
        } else if (diffMinutes < oneDay) {
            const date = new Date(timestampMs);
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            return `${hours}:${minutes}`;
        } else {
            const date = new Date(timestampMs);
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${month}/${day}`;
        }
    };

    return (
        <Wrapper onClick={onClick}>
            <StyledTitle>{title}</StyledTitle>
            <StyledContent>{content}</StyledContent>
            <StyledAuthor>{stringLikeCount + stringCommentCount + bar + formatTime(timestamp) + ` | ${author}`}</StyledAuthor>
        </Wrapper>
    );
}
