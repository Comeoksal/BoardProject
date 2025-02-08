import React from "react";
import styled from "styled-components";
import StandardRegister from "../ui/StandardRegister";
import register_milky from "../images/register_milky.webp"
const Container = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    height:94vh;
    background-image : url(${register_milky});  
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color : #000;
`;

export default function RegisterPage() {
    return (
        <Container>
            <StandardRegister />
        </Container>
    )
}