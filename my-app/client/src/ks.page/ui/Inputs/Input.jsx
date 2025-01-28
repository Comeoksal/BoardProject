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
export default function Input(props) {
    const { p_holder_value, type } = props;
    return (
        <StyledInput type={type} placeholder={p_holder_value || "입력"}></StyledInput>
    )
}