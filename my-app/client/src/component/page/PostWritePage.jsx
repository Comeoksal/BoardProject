import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';

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

function PostWritePage(props) {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/save1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }), // 서버로 데이터 전송
            });

            if (response.ok) {
                alert("문장이 성공적으로 저장되었습니다!");
            } else {
                alert("저장에 실패했습니다.");
            }
        } catch (error) {
            console.error("에러 발생:", error);
            alert("서버와의 연결에 실패했습니다.");
        }
    };

    return (
        <form onSubmit = {handleSubmit}>
        <Wrapper>
            <Container>
                <TextInput
                    height={20}
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />

                <TextInput
                    height={480}
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />

                <Button
                    title='글 작성하기'
                    onClick={handleSubmit}
                />
            </Container>
        </Wrapper>
        </form>
    );
}

export default PostWritePage;