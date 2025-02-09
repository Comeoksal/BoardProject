import React from "react";
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
const StyledAuthor = styled.p`
    font-size : 13px;
    font-weight : 500;
    margin : 0;
`
export default function PostListItem({ title, author, onClick, like_count, comment_count }) {
    return (
        <Wrapper onClick={onClick}>
            <StyledTitle>{title}</StyledTitle>
            <StyledAuthor>{`❤️${like_count} 💬${comment_count} | ${author}`}</StyledAuthor>
        </Wrapper>
    )
}