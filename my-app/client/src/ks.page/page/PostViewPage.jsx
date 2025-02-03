import React from "react";
import Standard_PostView from "../ui/Standard_PostView";
import board_back from "../images/board_back.jpg"
import styled from "styled-components";
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
`
export default function PostViewPage(props) {
    return (
        <Container>
            <Standard_PostView />
        </Container>
    )
}