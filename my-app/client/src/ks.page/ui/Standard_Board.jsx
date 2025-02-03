import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextAPI/AuthContext";
import styled from "styled-components";
import PostList from "../list/PostList";
import Button from "./Inputs/Button";
const Wrapper = styled.div`
    width : 600px;
    height : 800px;
    display : flex;
    flex-direction : column;
    align-items: flex-start;
    gap : 8px;
`
const ButtonContainer = styled.div`
    width : 20%;
    display : flex;
    flex-direction : column;
    align-items : flex-start;
    justify-content : center;
`
const PostListContainer = styled.div`
    width:100%;
    display : flex;
    flex-direction : column;
    align-items : flex-start;
    justify-content : center;
`
export default function Standard_Board(props) {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const handleWrite = async () => {
        try {
            if (!isLoggedIn) {
                await alert('로그인이 필요합니다.');
                await navigate("/loginroom");
            } else {
                await navigate("/postwriteroom")
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <Wrapper>
            <ButtonContainer>
                <Button title={"글쓰기"} onClick={handleWrite} />
            </ButtonContainer>
            <PostListContainer>
                <PostList />
            </PostListContainer>
        </Wrapper>
    )
};