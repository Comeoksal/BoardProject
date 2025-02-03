import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "./Inputs/Button";
import { CONFIG } from "../config.ts";
import TextInput from "../../component/ui/TextInput";
const Wrapper = styled.div`
    width : 600px;
    height : 800px;
    display : flex;
    flex-direction : column;
    align-items : flex-start;
    gap : 8px;
    position : relative;
`
const BackButtonContainer = styled.div`
    width : 15%;
`
const PostContainer = styled.div`
    width: 100%;
    padding : 16px;
    border : 3px solid white;
    border-radius : 8px;
    height : relative;
`
const StyledTitle = styled.p`
    font-size : 20px;
    color : white;
`
const StyledContent = styled.p`
    font-size : 15px;
    color : white;
`
export default function Standard_PostView(props) {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(CONFIG.BACK_SERVER + `/api/posts/${postId}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("포스트 불러오기 실패");
                }
                const data = await response.json();
                setTitle(data.title);
                setContent(data.content);
            } catch (err) {
                console.error("포스트 불러오기 중 문제 발생 ", err);
            }
        }
        fetchPost();
    },);
    const handleBack = async () => {
        await navigate("/boardroom")
    }

    return (
        <Wrapper>
            <BackButtonContainer>
                <Button title={"뒤로가기"} onClick={handleBack}></Button>
            </BackButtonContainer>
            <PostContainer>
                <StyledTitle >{title}</StyledTitle>
                <StyledContent>{content}</StyledContent>
            </PostContainer>
            <hr />
        </Wrapper>
    )
}