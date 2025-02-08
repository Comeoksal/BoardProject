import React from "react";
import styled from "styled-components";
import StandardLogin from "../ui/StandardLogin";
import milkyway from "../images/milkyway.webp";
const Container = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    height:94vh;
    background-image : url(${milkyway});  
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color : #000;
`;

export default function LoginPage() {
    return (
        <Container>
            <StandardLogin />
        </Container>
    )
}