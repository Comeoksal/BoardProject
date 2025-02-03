import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextAPI/AuthContext";
import styled from "styled-components";
import Input_Email from "./Inputs/Input_Email";
import Input_Password from "./Inputs/Input_Password";
import Input_PasswordCheck from "./Inputs/Input_PasswordCheck.jsx";
import Button from "./Inputs/Button";
import Input from "./Inputs/Input.jsx";
import { CONFIG } from "../config.ts"
const Wrapper = styled.div`
    width: 500px; /* 너비 */
  height: 700px; /* 높이 */
  display: flex; /* 내용 정렬을 위한 flexbox */
  flex-direction : column; /*세로방향 정렬*/
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  font-weight: bold; /* 글씨 굵기 */
  gap : 1px;
  color: #333; /* 글씨 색 */
`;
const StyledP = styled.p`
    font-size : 25px;
    font-weight : bold;
    font-family : 'Poppins', 'Montserrat', 'Noto Sans KR', sans-serif !important;
    margin-bottom : 40px;
    color : #fff;
    text-shadow : 8px 8px 8px rgb(41, 93, 161);
    bottom : 30px;
`;
const FormBoxContainer = styled.div`
    margin-bottom : 10px;
    width:80%;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : flex-start;
    position : relative;
`
const MainExplanationContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 5px;  /* 두 요소 간 간격 */
    margin-bottom: 4px;  /* Input과의 간격 */
`;

const MainExplanationP = styled.p`
    display: flex;
    align-items: center;  /* 세로 가운데 정렬 */
    font-size: 18px;
    color: #fff;
    text-shadow : 1px 1px 2px rgba(0, 0, 0, 0.8);
    margin-bottom: 1px;
`;

const SubExplanationP = styled.span`
    display: flex;
    align-items: center; /* 부모 컨테이너 내에서 가운데 정렬 */
    line-height: 18px; /* 글자 크기보다 약간 더 큰 높이로 균형 맞추기 */
    font-size: 12px;
    font-weight : bold;
    color: rgb(0, 0, 0);
    text-shadow : 0.5px 0.5px 1px rgba(255, 255, 255, 0.8);
`;
export default function Standard_Register(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const { fetchUserInfo } = useAuth();
    const handleRegister = async () => {
        if (email === "" || password === "" || passwordCheck === "" || name === "") {
            return alert("모든 입력칸은 필수 입력 사항입니다!");
        }
        if (!(email.includes("@") && email.includes("."))) {
            return alert("올바른 이메일 형식을 입력해주세요!");
        }
        try {
            if (password === passwordCheck) {
                const response = await fetch(CONFIG.BACK_SERVER + "/api/users/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ email, password, name })
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('회원가입 응답 : ', data.doc);
                    await fetchUserInfo();
                    navigate("/");
                } else {
                    alert("회원가입 실패 : " + data.error);
                }
            } else {
                alert("비밀번호와 비밀번호 확인이 일치해야 합니다.")
            }
        } catch (error) {
            console.error("회원가입 중 오류 발생", error);
        }
    }
    return (
        <Wrapper>
            <StyledP>KS Page</StyledP>
            <FormBoxContainer>
                <MainExplanationContainer>
                    <MainExplanationP>*이메일</MainExplanationP>
                    <SubExplanationP>(아이디로 사용됩니다.)</SubExplanationP>
                </MainExplanationContainer>
                <Input_Email Email={email} onChange={(e) => setEmail(e.target.value)} />
            </FormBoxContainer>
            <FormBoxContainer>
                <MainExplanationContainer >
                    <MainExplanationP>*비밀번호</MainExplanationP>
                    <SubExplanationP>(아무거나 대충 지어주세요.)</SubExplanationP>
                </MainExplanationContainer>
                <Input_Password Password={password} onChange={(e) => setPassword(e.target.value)} />
            </FormBoxContainer>
            <FormBoxContainer>
                <MainExplanationContainer >
                    <MainExplanationP>*비밀번호 확인</MainExplanationP>
                </MainExplanationContainer>
                <Input_PasswordCheck PasswordCheck={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />
            </FormBoxContainer>
            <FormBoxContainer>
                <MainExplanationContainer>
                    <MainExplanationP>*이름</MainExplanationP>
                    <SubExplanationP>(닉네임)</SubExplanationP>
                </MainExplanationContainer>
                <Input type={"text"} value={name} placeholder={"이름(닉네임)"} onChange={(e) => setName(e.target.value)} />
            </FormBoxContainer>
            <FormBoxContainer>
                <Button title="가입하기" borderColor={"rgb(0, 123, 255)"} textColor={"rgb(0, 123, 255)"} hoverbgColor={"rgb(0, 123, 255)"} onClick={handleRegister} />
            </FormBoxContainer>
        </Wrapper>
    )
}