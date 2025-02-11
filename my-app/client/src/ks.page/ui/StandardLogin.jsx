import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextAPI/AuthContext.jsx";
import styled from "styled-components";
import InputEmail from "./Inputs/InputEmail.jsx";
import InputPassword from "./Inputs/InputPassword.jsx";
import Button from "./Inputs/Button.jsx";

const StyledP = styled.p`
    position : absolute;
    font-size : 25px;
    font-weight : bold;
    font-family : 'Poppins', 'Montserrat', 'Noto Sans KR', sans-serif !important;
    margin-bottom : 400px;
    color : #fff;
    text-shadow : 0 3px 5px rgb(41, 93, 161);
`;
const Wrapper = styled.div`
    width: 500px; /* 너비 */
  height: 700px; /* 높이 */
  background-color: rbba(0, 0, 0, 0.5);/* 배경색 */
  border: 0px solid rgba(0, 0, 0, 0.9); /* 반투명한 흰색 테두리 */
  border-radius: 16px; /* 둥근 모서리 */
  box-shadow: 0 0px 0px rgb(255, 255, 255); /* 그림자 */
  display: flex; /* 내용 정렬을 위한 flexbox */
  flex-direction : column; /*세로방향 정렬*/
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  font-size: 18px; /* 글씨 크기 */
  font-weight: bold; /* 글씨 굵기 */
  gap : 10px;
  position : relative;
  color: #333; /* 글씨 색 */
`;
const InputContainer = styled.div`
    width : 80%;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    gap : 8px;
`
const MainButtonContainer = styled.div`
    width : 80%;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
`
const SubButtonContainer = styled.div`
    display: flex;
    justify-content: space-between; // 각 아이템을 양쪽 끝으로 정렬
    width: 80%;
    gap : 5px; //아이템간의 간격 설정
`;
export default function Standard_Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { fetchUserInfo } = useAuth();
    const handleLogin = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACK_SERVER + "/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // 🔥 쿠키 포함
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('로그인 응답 : ', data);
                await fetchUserInfo();
                navigate("/");
            } else {
                alert("로그인 실패 : " + data.message);
            }
        } catch (error) {
            console.error("로그인 중 오류 발생", error);
        }
    }
    const handleRegisterroom = async () => {
        try {
            navigate("/registerroom");
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Wrapper>
            <StyledP>로그인</StyledP>
            <InputContainer>
                <InputEmail Email={email} onChange={(e) => setEmail(e.target.value)} />
                <InputPassword Password={password} onChange={(e) => setPassword(e.target.value)} />
            </InputContainer>
            <MainButtonContainer>
                <Button title="로그인" onClick={handleLogin} bgColor="" hoverColor="" />
            </MainButtonContainer>
            <SubButtonContainer>
                <Button title="회원가입" borderColor={"rgb(78,78,78)"} textColor={"rgb(255, 255, 255)"} bgColor={"rgb(121, 121, 121)"} hovertextColor={"rgb(255, 255, 255)"} hoverbgColor={"rgb(78, 78, 78)"} onClick={handleRegisterroom} />
                <Button title="비밀번호 찾기" borderColor={"rgb(59,59,59)"} textColor={"rgb(255, 255, 255)"} bgColor={"rgb(0, 0, 0)"} hovertextColor={"rgb(255, 255, 255)"} hoverbgColor={"rgb(59, 59, 59)"} />
            </SubButtonContainer>
        </Wrapper>
    )
}