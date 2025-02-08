import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    height : 40%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 3px solid white;
    border-radius: 8px;
    color : rgb(255, 255, 255);
    :hover {
        background: white;
        color : black
    };
    gap : 8px;
`
const StyledComment = styled.p`
    font-size : 20px;
    font-weight : 500;
`
const StyledAuthor = styled.p`
    font-size : 15px;
    font-weight : 500;
`
export default function CommentListItem({ comment, author }) {
    return (
        <Wrapper >
            <StyledAuthor>{author}</StyledAuthor>
            <StyledComment>{comment}</StyledComment>
        </Wrapper>
    )
}