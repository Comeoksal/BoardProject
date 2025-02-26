import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contextAPI/AuthContext.jsx";
import styled from "styled-components";
import Input from "./Inputs/Input.jsx";
import TextInput from "./Inputs/TextInput.jsx";
import Button from "./Inputs/Button.jsx";
import ToggleButtonLike from "./Inputs/ToggleButtonLike.jsx";
import axios from "axios";
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
export default function StandardPostRewrite() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [anonymous, setAnonymous] = useState(false);
    const [userId, setUserId] = useState('');
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_BACK_SERVER + `/api/posts/${postId}`);

                const data = response.data;
                setTitle(data?.title || "제목");
                setContent(data?.content || "내용");
                setAnonymous(data?.author === "익명" ? true : false);
                setUserId(data?.userId);
            } catch (err) {
                console.error("포스트 불러오기 중 오류 ", err);
            }
        }
        fetchPost();
    }, [postId, user?._id, user?.isAdmin, navigate, userId]);
    const handleUpdatePost = async () => {
        if (userId !== user?._id && !user?.isAdmin) {
            alert('수정 권한이 없습니다!')
            navigate("/boardroom")
        }
        try {
            await axios.put(process.env.REACT_APP_BACK_SERVER + `/api/posts/${postId}`, {
                title: title,
                content: content,
                anonymous: anonymous,
            });
            await navigate("/boardroom")
        } catch (err) {
            console.error("포스트 업로드 오류 : " + err);
        }
    }
    const handleCancel = async () => {
        await navigate(`/postviewroom/${postId}`)
    }
    const handleAnonymous = async () => {
        await setAnonymous(!anonymous);
    }
    return (
        <Wrapper>
            <BackButtonContainer>
                <Button title={"취소"} borderColor={"rgb(0, 123,255)"} textColor={"rgb(0, 123,255)"} hoverbgColor={"rgb(0, 123,255)"} onClick={handleCancel}></Button>
            </BackButtonContainer>
            <InputContainer>
                <Input type={"text"} value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder={"제목을 입력해주세요."} />
                <TextInput value={content} onChange={(e) => { setContent(e.target.value) }} placeholder={"내용을 입력해주세요."} height={"600"} />
            </InputContainer>
            <FinishedButtonContainer>
                <ToggleButtonLike title="익명✅" isUserLike={anonymous} onClick={handleAnonymous} borderColor={"rgb(220, 53, 69)"} textColor={"rgb(220, 53, 69)"} hoverbgColor={"rgb(220, 53, 69)"} hovertextColor={"rgb(220, 53, 69)"} />
                <Button title={"완료"} onClick={handleUpdatePost} disabled={title.length === 0 || content.length === 0} />
            </FinishedButtonContainer>
        </Wrapper>
    )
}