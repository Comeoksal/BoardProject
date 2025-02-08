import React, { useState } from "react";
import styled from "styled-components";

const StyledToggleButton = styled.button`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid ${({ borderColor }) => borderColor || "rgb(15, 138, 81)"};
    border-radius: 8px;
    transition: background-color 0.2s, color 0.2s;

    color: ${({ isActive, textColor }) =>
        isActive
            ? "rgb(255, 255, 255)"  /* 활성화 시 텍스트는 흰색 */
            : (textColor || "rgb(15, 138, 81)")}; /* 비활성화 시 기본 텍스트 색상 */

    background-color: ${({ isActive, hoverbgColor, bgColor }) =>
        isActive
            ? (hoverbgColor || "rgb(15, 138, 81)")  /* 활성화 시 배경색 */
            : (bgColor || "rgb(255, 255, 255)")};  /* 비활성화 시 배경색 */

    &:hover {
        color: ${({ isActive, hovertextColor }) =>
        isActive
            ? (hovertextColor || "rgb(15, 138, 81)")  /* 활성화 시 텍스트 색상 */
            : "rgb(255, 255, 255)"};  /* 비활성화 시 텍스트는 흰색 */

        background-color: ${({ isActive, bgColor, hoverbgColor }) =>
        isActive
            ? (bgColor || "rgb(255, 255, 255)")  /* 활성화 시 배경색을 기본으로 */
            : (hoverbgColor || "rgb(15, 138, 81)")};  /* 비활성화 시 배경색 변경 */
    }
`;
//border, text, hoverbg, hovertext 지정 필요
export default function ToggleButton({ title, onClick, borderColor, textColor, bgColor, hovertextColor, hoverbgColor }) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
        if (onClick) onClick();
    };

    return (
        <StyledToggleButton
            isActive={isActive}
            onClick={handleClick}
            borderColor={borderColor}
            textColor={textColor}
            bgColor={bgColor}
            hovertextColor={hovertextColor}
            hoverbgColor={hoverbgColor}
        >
            {title}
        </StyledToggleButton>
    );
}
