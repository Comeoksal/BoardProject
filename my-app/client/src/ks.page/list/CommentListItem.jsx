import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: rgba(255,255,255,0.9);
    border: 1px solid rgb(202, 202, 202);
    border-radius: 8px;
    color : rgb(255, 255, 255);
    gap : 8px;
`
const StyledAuthor = styled.p`
    font-size : 15px;
    font-weight : 800;
    color : black;
    margin : 0;
`
const StyledComment = styled.p`
    font-size : 15px;
    font-weight : 500;
    color : black;
    margin : 0;
`
export default function CommentListItem({ comment, author }) {
    return (
        <Wrapper >
            <StyledAuthor>{author}</StyledAuthor>
            <StyledComment>{comment}</StyledComment>
        </Wrapper>
    )
}