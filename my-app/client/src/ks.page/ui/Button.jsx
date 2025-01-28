import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    width : 80%;
    padding: 10px;
    font-size: 16px;
    font-weight : bold;
    color : #fff;
    background-color:rgb(15, 138, 81);
    border : none;
    border-radius: 8px;
    cursor: pointer;
    transition : background-color 0.2s;
    &:hover{
        background-color :rgb(19, 70, 207);
    }
`;

function Button(props) {
    const { title, onClick } = props;

    return <StyledButton onClick={onClick}>{title || "button"}</StyledButton>;
}

export default Button;