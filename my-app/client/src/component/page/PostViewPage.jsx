import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommentList from '../list/CommentList';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import data from '../../data.json';

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

function PostViewPage() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [comments, setComments] = useState([]); // 댓글 상태 관리
    const [comment, setComment] = useState('');

    const post = data.find((item) => item.id == postId);

    // 댓글 목록 불러오기
    const fetchComments = async () => {
        try {
            const response = await fetch('http://localhost:5000/save2');
            if (!response.ok) {
                throw new Error('댓글을 가져오는 데 실패했습니다.');
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('에러 발생:', error);
        }
    };

    // 댓글 추가하기
    const addComment = async () => {
        if (!comment.trim()) {
            alert('댓글을 입력하세요.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/save2', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comment }),
            });

            if (response.ok) {
                setComment(''); // 입력란 초기화
                fetchComments(); // 댓글 목록 갱신
            } else {
                console.error('댓글 저장 실패');
            }
        } catch (error) {
            console.error('에러 발생:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <Wrapper>
            <Container>
                <Button
                    title="뒤로 가기"
                    onClick={() => navigate('/')}
                />
                <PostContainer>
                    <TitleText>{post.title}</TitleText>
                    <ContentText>{post.content}</ContentText>
                </PostContainer>

                <CommentLabel>댓글</CommentLabel>
                <CommentList comments={comments} /> {/* 댓글 목록 렌더링 */}

                <TextInput
                    height={40}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button
                    title="댓글 작성하기"
                    onClick={addComment} // 댓글 작성 버튼
                />
            </Container>
        </Wrapper>
    );
}

export default PostViewPage;
