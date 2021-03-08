import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import CarouselImage from '../assets/images/cheriebanner.png'


const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const slides = [
        {
            image: CarouselImage
        },
        {
            image: CarouselImage
        },
        {
            image: CarouselImage
        }
    ]
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex( (currentIndex + 1 ) % slides.length)
        },3000)
        return () => {
            clearInterval(timer)
        } 
    })

    
    return(
        <Root>
            <Container index={ (-currentIndex * window.outerWidth) + 'px'}>
                {
                    slides.map( (slide , key) => 
                        <Slide id={`slide_${key}`} onClick={
                            () => setCurrentIndex(key)
                        }>
                            <img src={slide.image} />
                        </Slide>
                    )
                }
                
            </Container>
            <Dots>
                {
                    slides.map( (_ , key) => 
                    <DotItem
                        selected={key === currentIndex}
                        onClick={
                            () => setCurrentIndex(key)
                        }
                    />
                    )
                }
            </Dots>
        </Root>
    )
}

export default Carousel

const Root = styled.div`
    display: flex;
    border-top: 6px solid grey;
    border-bottom: 6px solid grey;
    width: 100%;
    flex-direction: column;

`

const Container = styled.div`
    display: flex;
    transform: translateX(${props => props.index});
    transition: all 0.5s ease-out;
    box-sizing: border-box;
`

const Slide = styled.div`
    min-width: 100%;
    height: 200px;
    
    & > img {
        height: inherit;
        width: auto;
    }
    
`

const Dots = styled.div`
    display: flex;
    background-color: transparent;
    justify-content: center;
    margin-top: 6px;
    z-index: 12;
    
`

const DotItem = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.selected ? '#000' : '#00000070'};
    margin-right: 16px;
`