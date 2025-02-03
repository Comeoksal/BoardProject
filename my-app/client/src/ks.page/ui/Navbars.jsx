import React from "react";
import { useAuth } from "../contextAPI/AuthContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styled from "styled-components";
import axios from "axios";
import { CONFIG } from "../config.ts"

const StyledSpan = styled.span`
        margin-top : 8px;
        font-weight : bold;
`
export default function Navbars() {
    const { isLoggedIn, user, fetchUserInfo } = useAuth();

    const handleLogout = async () => {
        try {
            const response = await axios.post(CONFIG.BACK_SERVER + '/api/users/logout', {}, {
                withCredentials: true  // 반드시 설정하여 쿠키 전송
            });

            if (response.data.success) {
                console.log("로그아웃 성공");
                await fetchUserInfo();  // 상태 갱신
            } else {
                alert("로그아웃 실패");
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="/">KS Page</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        <Nav.Link href="/boardroom">게시판</Nav.Link>
                        <Nav.Link href="/chatroom">채팅방</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="https://github.com/Ksieon">GitHub</NavDropdown.Item>
                            <NavDropdown.Item href="https://www.notion.so/afe1d291cefa46b0bae463488592f55b">Notion</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        {isLoggedIn ? (
                            <>
                                <StyledSpan className="me-3">안녕하세요, {user.name}님!</StyledSpan>
                                <Button variant="outline-danger" onClick={handleLogout}>로그아웃</Button>
                            </>
                        ) : (
                            <Button variant="outline-success" href="/loginroom">로그인</Button>
                        )}
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
