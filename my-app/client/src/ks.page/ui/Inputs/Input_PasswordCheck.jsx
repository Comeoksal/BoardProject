import React, { useState } from "react";
import styled from "styled-components";
import { Eye, EyeOff } from "react-feather";
const InputContainer = styled.div`
    position: relative;
    width: 100%;
`;
const IconButton = styled.button`
  position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;

    svg {
        width: 20px;
        height: 20px;
        fill: #555;
    }
`;
const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    padding-right: 40px;  /* 모든 입력 필드에서 동일한 패딩 */
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
        border-color: #007bff;
    }
`;
export default function Input_PasswordCheck(props) {
    const { PasswordCheck, onChange } = props;
    const [showPassword, setShowPassword] = useState(false);
    const showHandler = () => {
        setShowPassword((prev) => !prev);
    }
    return (
        <InputContainer>
            <StyledInput type={showPassword ? "text" : "password"} placeholder={"비밀번호 확인"} value={PasswordCheck} onChange={onChange} />
            <IconButton onClick={showHandler}>
                {/* 상태에 따라 아이콘 변경 */}
                {showPassword ? (
                    <svg viewBox="0 0 24 24">
                        <path d="M12 4.5C7.305 4.5 3.292 7.352 1.5 12c1.792 4.648 5.805 7.5 10.5 7.5s8.708-2.852 10.5-7.5c-1.792-4.648-5.805-7.5-10.5-7.5zm0 12c-2.485 0-4.5-2.015-4.5-4.5S9.515 7.5 12 7.5 16.5 9.515 16.5 12s-2.015 4.5-4.5 4.5zm0-7.5c-1.658 0-3 1.342-3 3s1.342 3 3 3 3-1.342 3-3-1.342-3-3-3z" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24">
                        <path d="M12 4.5C7.305 4.5 3.292 7.352 1.5 12c1.792 4.648 5.805 7.5 10.5 7.5s8.708-2.852 10.5-7.5c-1.792-4.648-5.805-7.5-10.5-7.5zm0 12c-2.485 0-4.5-2.015-4.5-4.5S9.515 7.5 12 7.5 16.5 9.515 16.5 12s-2.015 4.5-4.5 4.5zM2.706 3.294a1 1 0 0 0-1.412 1.412l18 18a1 1 0 0 0 1.412-1.412l-18-18z" />
                    </svg>
                )}
            </IconButton>
        </InputContainer>
    )
}