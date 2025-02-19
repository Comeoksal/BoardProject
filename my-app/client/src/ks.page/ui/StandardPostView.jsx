import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contextAPI/AuthContext.jsx";
import styled from "styled-components";
import Button from "./Inputs/Button.jsx";
import CommentList from "../list/CommentList.jsx";
import { InputCommentBox } from "./InputCommentBox.jsx";
import { SelectList } from "./Inputs/SelectList.jsx"
import axios from "axios";
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
    width: ${({ userId, post_userId }) =>
        (userId === post_userId ? "100%" : "15%")};  // 즉시 반환 방식 적용
    display: flex;
    flex-direction: row;
    justify-content: space-between;  // 양쪽 끝으로 배치
    align-items: center;  // 세로 중앙 정렬
    gap : 550px;
`;
const PostContainer = styled.div`
    width: 100%;
    padding : 16px;
    border : 2px solid black;
    border-radius : 8px;
    background-color : rgba(255,255,255,0.9);
    height : relative;
`
const StyledTitle = styled.p`
    font-size : 25px;
    font-weight : 1000;
    color : black;
`
const StyledContent = styled.p`
    font-size : 15px;
    color : black;
`
export default function Standard_PostView() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { postId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [like_count, setLike_count] = useState(0);
    const [comment_count, setComment_count] = useState(0);
    const [isUserLike, setIsUserLike] = useState();
    const [anonymous_number, setAnonymous_number] = useState();
    const [post_userId, setPost_userId] = useState('');
    const userId = user?._id;
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACK_SERVER + `/api/posts/${postId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("포스트 불러오기 실패");
                }

                const data = await response.json();

                setTitle(data?.title || "제목 없음");
                setContent(data?.content || "내용 없음");
                setLike_count(data?.likes?.length || 0);
                setComment_count(data?.comments?.length || 0);
                setIsUserLike(data?.likes?.includes(userId) || false);
                setPost_userId(data?.userId || "");
                if (!data?.commenters?.includes(userId)) {
                    setAnonymous_number((data?.commenters?.length || 0) + 1);
                } else {
                    setAnonymous_number(data.commenters.indexOf(userId) + 1);
                }
            } catch (err) {
                console.error("포스트 불러오기 중 문제 발생 ", err);
            }
        };

        fetchPost();
    }, [postId, userId]);
    const handleBack = async () => {
        await navigate("/boardroom")
    }
    const handleLikeCount = async () => {
        if (isUserLike) {
            await setLike_count(like_count - 1);
        } else {
            await setLike_count(like_count + 1);
        }
        await setIsUserLike(!isUserLike);
    }
    const handleCommentCount = async () => {
        await setComment_count(comment_count + 1);
    }
    const onDelete = async () => {
        try {
            const response = await axios.delete(process.env.REACT_APP_BACK_SERVER + `/api/posts/${postId}`, {}, {
                withCredentials: true
            });
            if (!response.ok) {
                console.log("클라이언트 포스트 삭제 실패");
            }
            await navigate("/boardroom");
        } catch (err) {
            console.error("포스트 삭제 중 문제 발생", err);
        }
    }
    return (
        <Wrapper>
            <BackButtonContainer>
                <Button title={"뒤로가기"} onClick={handleBack} borderColor={"rgb(0, 123,255)"} textColor={"rgb(0, 123,255)"} hoverbgColor={"rgb(0, 123,255)"}></Button>
                {((post_userId === userId) || (user?.isAdmin)) && <SelectList onDelete={onDelete} />}
            </BackButtonContainer>
            <PostContainer>
                <StyledTitle >{title}</StyledTitle>
                <StyledContent>{content}</StyledContent>
            </PostContainer>
            <InputCommentBox like_count={like_count} comment_count={comment_count} handleLikeCount={handleLikeCount} handleCommentCount={handleCommentCount} isUserLike={isUserLike} anonymous_number={anonymous_number} />
            <CommentList postId={postId} comment_count={comment_count} />
        </Wrapper>
    )
}