import React from "react";
import StandardPostView from "../ui/StandardPostView";
import post from "../images/post.jpg"
import styled from "styled-components";
const Container = styled.div`
        display : flex;
        justify-content : center;
        align-items : center;
        min-height: 94vh; /* 최소 높이를 뷰포트에 맞추고, 컨텐츠에 따라 확장 */
       background-image: url(${post});
       background-size: cover;
       background-repeat: no-repeat;
       background-position: center;
       background-attachment: fixed; /* 배경 고정 */
       overflow : auto;
`
export default function PostViewPage() {
    return (
        <Container>
            <StandardPostView />
        </Container>
    )
}