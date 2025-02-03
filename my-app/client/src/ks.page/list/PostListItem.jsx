import React from "react";
import { useNavigate } from "react-router-dom";
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
export default function PostListItem(props) {
    const navigate = useNavigate();
    const { title, author, onClick } = props
    return (
        <Wrapper onClick={onClick}>
            <StyledTitle>{title}</StyledTitle>
            <StyledAuthor>작성자 : {author}</StyledAuthor>
        </Wrapper>
    )
}