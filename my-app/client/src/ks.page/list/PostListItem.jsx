import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 3px solid white;
    border-radius: 8px;
    cursor: pointer;
    color : rgb(255, 255, 255);
    :hover {
        background: white;
        color : black
    };
    gap : 8px;
`
const StyledTitle = styled.p`
    font-size : 20px;
    font-weight : 500;
`
const StyledAuthor = styled.p`
    font-size : 15px;
    font-weight : 500;
`
export default function PostListItem({ title, author, onClick }) {
    return (
        <Wrapper onClick={onClick}>
            <StyledTitle>{title}</StyledTitle>
            <StyledAuthor>{author}</StyledAuthor>
        </Wrapper>
    )
}