import React, { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    width : 100%;
    padding : 10px;
    padding-right: 40px;
    font-size : 16px;
    border : 1px solid #ccc;
    border-radius : 8px;
    outline : none;
    transition : border-color 0.2s;
    &:focus{
    border-color : #007bff;
    }
`;
export default function Input_Email(props) {
    const { Email, onChange } = props;
    return (
        <StyledInput type={"text"} placeholder={"이메일 : example@gmail.com"} value={Email} onChange={onChange}></StyledInput>
    )
}