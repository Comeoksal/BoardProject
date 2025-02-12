import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    width : 100%;
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
export default function Input({ placeholder, type, value, onChange }) {
    return (
        <StyledInput type={type} value={value} placeholder={placeholder || "입력"} onChange={onChange} maxLength={"28"} ></StyledInput>
    )
}