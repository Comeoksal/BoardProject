import React from "react";
import styled from "styled-components";
import board_back from "../images/board_back.jpg"
import Standard_Board from "../ui/Standard_Board";
const Container = styled.div`
        display : flex;
        justify-content : center;
        align-items : center;
    min-height: 94vh; /* 최소 높이를 뷰포트에 맞추고, 컨텐츠에 따라 확장 */
    background-image: url(${board_back});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed; /* 배경 고정 */
    overflow:auto;
`;

export default function BoardPage(props) {
    return (
        <Container>
            <Standard_Board />
        </Container>
    )
}