import React from "react";
import styled from "styled-components";

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000; /* 원하는 배경색 적용 */
`;

const StyledImage = styled.img`
  max-width: 50%;
  max-height: 70vh;
  object-fit: contain; /* 이미지가 컨테이너 내에서 비율 유지 */
`;

function ExampleCarouselImage({ imageSrc }) {
    return (
        <ImageContainer>
            <StyledImage src={imageSrc} alt="Carousel Slide" />
        </ImageContainer>
    );
}

export default ExampleCarouselImage;
