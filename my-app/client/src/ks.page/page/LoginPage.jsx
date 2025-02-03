import React, { useState } from "react";
import styled from "styled-components";
import Standard_Login from "../ui/Standard_Login";
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

export default function LoginPage(props) {
    const { setIsLoggedIn } = props;
    return (
        <Container>
            <Standard_Login setIsLoggedIn={setIsLoggedIn} />
        </Container>
    )
}