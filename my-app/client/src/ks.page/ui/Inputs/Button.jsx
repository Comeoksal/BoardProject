import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    width : 100%;
    padding: 10px;
    font-size: 16px;
    font-weight : bold;
    color : ${(props) => props.textColor || "rgb(15, 138, 81)"};
    background-color:${(props) => props.bgColor || "rgb(255, 255, 255)"};
    cursor: pointer;
    transition : background-color 0.2s;
    border : 1px solid ${(props) => props.borderColor || "rgb(15, 138, 81)"};
    border-radius: 8px;
    &:hover{
        color : ${(props) => props.hovertextColor || "rgb(255, 255, 255)"};
        background-color :${(props) => props.hoverbgColor || "rgb(15, 138, 81)"};
    }
`;

function Button(props) {
    const { title, onClick, borderColor, textColor, bgColor, hovertextColor, hoverbgColor } = props;

    return <StyledButton onClick={onClick} borderColor={borderColor} textColor={textColor} bgColor={bgColor} hovertextColor={hovertextColor} hoverbgColor={hoverbgColor}>{title || "button"}</StyledButton>;
}

export default Button;