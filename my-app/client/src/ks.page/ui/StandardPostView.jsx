import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contextAPI/AuthContext.jsx";
import styled from "styled-components";
import Button from "./Inputs/Button.jsx";
import ToggleButtonLike from './Inputs/ToggleButtonLike.jsx'
import ToggleButton from "./Inputs/ToggleButton.jsx";
import TextInput from "./Inputs/TextInput.jsx";
import { CONFIG } from "../config.ts";
import CommentList from "../list/CommentList.jsx";
const Wrapper = styled.div`
    width : 35%;
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
const ButtonsContainer = styled.div`
    display : flex;
    justify-content : space-between;
    width : 50%;
    gap 5px;
`
const CommentInputContainer = styled.div`
    width : 100%;
`
const FinishedButtonContainer = styled.div`
    width: 25%;
    display: flex;
    flex-direction: flex-start;
    align-items: flex-end;
    justify-content: center;
    gap : 4px;
    margin-left: auto;
`
export default function Standard_PostView() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { postId } = useParams();
    const inputElem = useRef(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [like_count, setLike_count] = useState(0);
    const [isUserLike, setIsUserLike] = useState(false);
    const [comment, setComment] = useState('');
    const [comment_count, setComment_count] = useState(0);
    const [anonymous, setAnonymous] = useState(false);
    const author = user?.name;
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
                setLike_count(data.likes.length);
                setComment_count(data.comments.length);
                if (data.likes.find((like) => like === author)) {
                    await setIsUserLike(true);
                }
            } catch (err) {
                console.error("포스트 불러오기 중 문제 발생 ", err);
            }
        }
        fetchPost();
    }, [like_count, comment_count, author, postId]);
    const handleBack = async () => {
        await navigate("/boardroom")
    }
    const handleLike = async () => {
        try {
            const response = await fetch(CONFIG.BACK_SERVER + `/api/posts/${postId}/like`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({ author })
            })
            if (response.ok) {
                console.log('좋아요 성공');
                setLike_count(like_count + 1);
            } else {
                alert('좋아요 실패1');
            }
        } catch (err) {
            console.error('좋아요 실패2' + err);
        }
    }
    const handleComment = async () => {
        if (inputElem.current) {
            await inputElem.current.focus();
        }
    }
    const handleAnonymous = async () => {
        await setAnonymous(!anonymous);
    }
    const handleWriteComment = async () => {
        try {
            const response = await fetch(CONFIG.BACK_SERVER + `/api/posts/${postId}/comment`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({ author, comment, anonymous })
            })
            const data = await response.json();
            if (response.ok) {
                console.log('댓글 업로드 :', data.doc);
                setComment('');
                setComment_count(comment_count + 1);
            } else {
                alert('댓글 업로드 실패' + data.error);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Wrapper>
            <BackButtonContainer>
                <Button title={"뒤로가기"} onClick={handleBack} borderColor={"rgb(0, 123,255)"} textColor={"rgb(0, 123,255)"} hoverbgColor={"rgb(0, 123,255)"}></Button>
            </BackButtonContainer>
            <PostContainer>
                <StyledTitle >{title}</StyledTitle>
                <StyledContent>{content}</StyledContent>
            </PostContainer>
            <ButtonsContainer>
                <ToggleButtonLike title={`❤️좋아요 ${like_count}`} onClick={handleLike} isUserLike={isUserLike} borderColor={"rgb(220, 53, 69)"} textColor={"rgb(220, 53, 69)"} hoverbgColor={"rgb(220, 53, 69)"} hovertextColor={"rgb(220, 53, 69)"} />
                <Button title={`💭댓글 ${comment_count}`} onClick={handleComment} />
            </ButtonsContainer>
            <CommentInputContainer>
                <TextInput value={comment} onChange={(e) => { setComment(e.target.value) }} ref={inputElem} placeholder={"댓글을 입력하세요."} />
                <FinishedButtonContainer>
                    <ToggleButton title="익명✅" onClick={handleAnonymous} borderColor={"rgb(220, 53, 69)"} textColor={"rgb(220, 53, 69)"} hoverbgColor={"rgb(220, 53, 69)"} hovertextColor={"rgb(220, 53, 69)"} />
                    <Button title={"등록"} onClick={handleWriteComment} disabled={comment.length === 0} />
                </FinishedButtonContainer>
            </CommentInputContainer>
            <CommentList postId={postId} />
        </Wrapper>
    )
}