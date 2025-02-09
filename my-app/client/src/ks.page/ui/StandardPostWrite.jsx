import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextAPI/AuthContext.jsx";
import styled from "styled-components";
import Input from "./Inputs/Input.jsx";
import TextInput from "./Inputs/TextInput.jsx";
import Button from "./Inputs/Button.jsx";
import ToggleButton from "./Inputs/ToggleButton.jsx";
import { CONFIG } from "../config.ts"
const Wrapper = styled.div`
    width : 60%;
    height : 100%;
    display : flex;
    flex-direction : column;
    align-items : flex-start;
    justify-content : center;
    gap : 8px;
`
const BackButtonContainer = styled.div`
    width : 10%;
    display : flex;
    flex-direction : row;
    align-items : flex-start;
    justify-content : center;
`
const InputContainer = styled.div`
    width : 100%;
    display : flex;
    flex-direction : column;
    align-items : flex-start;
    justify-content : center;
    gap : 8px;
`
const FinishedButtonContainer = styled.div`
    width: 20%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    margin-left: auto;
    gap : 8px;
`
export default function Standard_PostWrite() {
    const navigate = useNavigate();
    const { fetchUserInfo, user } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [anonymous, setAnonymous] = useState(false);
    const author = user.name;
    const handleUploadPost = async () => {
        try {
            const response = await fetch(CONFIG.BACK_SERVER + "/api/posts/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ author, title, content, anonymous, timestamp: Date.now() })
            })
            const data = await response.json();
            if (response.ok) {
                console.log('포스트 업로드 : ', data.doc);
                await fetchUserInfo();
                navigate("/boardroom")
            } else {
                alert("포스트 업로드 실패 : " + data.error);
            }
        } catch (err) {
            console.error("포스트 업로드 오류 : " + err);
        }
    }
    const handleBack = async () => {
        await navigate("/boardroom")
    }
    const handleAnonymous = async () => {
        await setAnonymous(!anonymous);
    }
    return (
        <Wrapper>
            <BackButtonContainer>
                <Button title={"뒤로가기"} borderColor={"rgb(0, 123,255)"} textColor={"rgb(0, 123,255)"} hoverbgColor={"rgb(0, 123,255)"} onClick={handleBack}></Button>
            </BackButtonContainer>
            <InputContainer>
                <Input type={"text"} value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder={"제목을 입력해주세요."} />
                <TextInput value={content} onChange={(e) => { setContent(e.target.value) }} placeholder={"내용을 입력해주세요."} height={"600"} />
            </InputContainer>
            <FinishedButtonContainer>
                <ToggleButton title="익명✅" onClick={handleAnonymous} borderColor={"rgb(220, 53, 69)"} textColor={"rgb(220, 53, 69)"} hoverbgColor={"rgb(220, 53, 69)"} hovertextColor={"rgb(220, 53, 69)"} />
                <Button title={"완료"} onClick={handleUploadPost} disabled={title.length === 0 || content.length === 0} />
            </FinishedButtonContainer>
        </Wrapper>
    )
}