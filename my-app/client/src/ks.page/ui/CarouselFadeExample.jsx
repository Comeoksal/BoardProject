import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../components/ExampleCarouselImage";
import IoImage from "../images/Io.jpg";
import EuropaImage from "../images/Europa.png";
import GanymedeImage from "../images/Ganymede.jpg";
import CallistoImage from "../images/Callisto.jpg";
import "../css/CarouselStyles.css"; // 외부 CSS 파일로 스타일링

function CarouselFadeExample() {
    return (
        <Carousel fade className="carousel-container">
            <Carousel.Item className="carousel-item">
                <ExampleCarouselImage imageSrc={IoImage} />
                <Carousel.Caption className="carousel-caption">
                    <h3>Io</h3>
                    <p>Galilean moons</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="carousel-item">
                <ExampleCarouselImage imageSrc={EuropaImage} />
                <Carousel.Caption className="carousel-caption">
                    <h3>Europa</h3>
                    <p>Galilean moons</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="carousel-item">
                <ExampleCarouselImage imageSrc={GanymedeImage} />
                <Carousel.Caption className="carousel-caption">
                    <h3>Ganymede</h3>
                    <p>Galilean moons</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="carousel-item">
                <ExampleCarouselImage imageSrc={CallistoImage} />
                <Carousel.Caption className="carousel-caption">
                    <h3>Callisto</h3>
                    <p>Galilean moons</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselFadeExample;
