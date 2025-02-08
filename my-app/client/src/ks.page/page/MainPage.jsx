import React from 'react';
import styled from 'styled-components';
import CarouselFadeExample from '../ui/CarouselFadeExample';

const Container = styled.div`
    display: flex;
  justify-content: center;
  align-items: center;
  height: 94vh; /* 화면 전체 높이 */
  width: 100vw; /* 화면 전체 너비 */
  background-color: #f8f9fa; /* 배경색 (필요 시 설정) */
  overflow: hidden; /* 화면 넘침 방지 */
`;

export default function MainPage() {
  return (
    <Container>
      <CarouselFadeExample />
    </Container>
  )
}