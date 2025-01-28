import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    width : 80%;
    padding : 10px;
    font-size : 16px;
    border : 1px solid #ccc;
    border-radius : 8px;
    outline : none;
    transition : border-color 0.2s;
    &:focus{
    border-color : #007bff;
    }
`;
export default function Input_Id(props) {
    return (
        <StyledInput type={"text"} placeholder={"아이디"}></StyledInput>
    )
}