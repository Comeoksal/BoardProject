import React, { useState, useRef } from "react";
import { useAuth } from "../contextAPI/AuthContext.jsx";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ToggleButtonLike from "./Inputs/ToggleButtonLike";
import Button from "./Inputs/Button";
import TextInput from "./Inputs/TextInput";
import ToggleButton from "./Inputs/ToggleButton";

const Wrapper = styled.div`
    width : 100%;
    display : flex;
    flex-direction : column;
    align-items : flex-start;
    gap : 8px;
    position : relative;
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
export const InputCommentBox = ({ like_count, comment_count, handleLikeCount, handleCommentCount, isUserLike, anonymous_number }) => {
    const { user } = useAuth();
    const { postId } = useParams();
    const [comment, setComment] = useState('');
    const [anonymous, setAnonymous] = useState(false);
    const inputElem = useRef(null);
    const author = user?.name;
    const userId = user._id;
    const handleLike = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACK_SERVER + `/api/posts/${postId}/like`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({ userId })
            })
            if (response.ok) {
                handleLikeCount();
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
            const response = await fetch(process.env.REACT_APP_BACK_SERVER + `/api/posts/${postId}/comment`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({ userId, author, comment, anonymous, anonymous_number })
            })
            const data = await response.json();
            if (response.ok) {
                console.log('댓글 업로드 :', data.doc);
                setComment('');
                handleCommentCount();
            } else {
                alert('댓글 업로드 실패' + data.error);
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <Wrapper>
            <ButtonsContainer>
                <ToggleButtonLike title={`❤️좋아요 ${like_count}`} onClick={handleLike} borderColor={"rgb(220, 53, 69)"} textColor={"rgb(220, 53, 69)"} hoverbgColor={"rgb(220, 53, 69)"} hovertextColor={"rgb(220, 53, 69)"} isUserLike={isUserLike} />
                <Button title={`💬댓글 ${comment_count}`} onClick={handleComment} />
            </ButtonsContainer>
            <CommentInputContainer>
                <TextInput value={comment} onChange={(e) => { setComment(e.target.value) }} ref={inputElem} placeholder={"댓글을 입력하세요."} />
                <FinishedButtonContainer>
                    <ToggleButton title="익명✅" onClick={handleAnonymous} borderColor={"rgb(220, 53, 69)"} textColor={"rgb(220, 53, 69)"} hoverbgColor={"rgb(220, 53, 69)"} hovertextColor={"rgb(220, 53, 69)"} />
                    <Button title={"등록"} onClick={handleWriteComment} disabled={comment.length === 0} />
                </FinishedButtonContainer>
            </CommentInputContainer>
        </Wrapper>
    )
}