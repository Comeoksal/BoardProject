import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    position: relative;  // 드롭다운이 오버레이되도록 기준 설정
`;

const DropdownButton = styled.button`
    padding: 8px 12px;
    border: none;
    background-color: rgb(163, 163, 163);
    color: white;
    cursor: pointer;
    border-radius: 4px;
`;

const StyledList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 8px 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    min-width: 120px;
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    
    position: absolute;  // 부모 컴포넌트 위로 배치
    top: 40px;  // 버튼 아래쪽으로 위치 조정
    right: 0;  // 오른쪽 정렬
    z-index: 1000;  // 다른 컴포넌트 위에 배치
`;

const ListItem = styled.li`
    padding: 8px 12px;
    cursor: pointer;
    &:hover {
        background-color: #f1f1f1;
    }
`;

export function SelectList({ onEdit, onDelete }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <Wrapper>
            <DropdownButton onClick={toggleDropdown}>⋮</DropdownButton>
            <StyledList $isOpen={isOpen}>
                <ListItem onClick={onEdit}>✏ 글 수정</ListItem>
                <ListItem onClick={onDelete}>🗑 글 삭제</ListItem>
            </StyledList>
        </Wrapper>
    );
}
