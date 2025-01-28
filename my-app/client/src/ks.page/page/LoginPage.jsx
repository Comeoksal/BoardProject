import React from "react";
import styled from "styled-components";
import Input_Id from "../ui/Inputs/Input_Id";
import Input_Password from "../ui/Inputs/Input_Password";
import Button from "../ui/Button";
import Sun from "../images/Sun.jpg"
const Wrapper = styled.div`
    width: 500px; /* 너비 */
  height: 700px; /* 높이 */
  background-color: #f0f0f0; /* 배경색 */
  border-radius: 16px; /* 둥근 모서리 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 */
  display: flex; /* 내용 정렬을 위한 flexbox */
  flex-direction : column; /*세로방향 정렬*/
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  font-size: 18px; /* 글씨 크기 */
  font-weight: bold; /* 글씨 굵기 */
  gap : 10px;
  color: #333; /* 글씨 색 */
`
const Container = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    height:94vh;
    background-image : url(${Sun});  
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color : #000;
`;
export default function LoginPage(props) {
    return (
        <Container>
            <Wrapper>
                <p>로그인</p>
                <Input_Id />
                <Input_Password />
                <Button title="로그인" />
            </Wrapper>
        </Container>
    )
}