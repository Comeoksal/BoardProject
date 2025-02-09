import React from "react";
import styled from "styled-components";
import table from "../images/table.jpg"
import StandardPostWrite from "../ui/StandardPostWrite";
const Container = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    min-height: 94vh;
    background-image : url(${table});  
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed; /* 배경 고정 */
    overflow:auto;
`;

export default function PostWritePage() {
    return (
        <Container>
            <StandardPostWrite />
        </Container>
    )
}