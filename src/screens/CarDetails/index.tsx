import React from 'react'
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Container, Header, CarImages } from "./styles";


export function CarDetails() {
   
    return (
        <Container>
            <Header>
                <BackButton onPress={() => {}}/>
            </Header>

            <CarImages>
                <ImageSlider 
                    imagesUrl={['https://i.pinimg.com/originals/f6/71/7b/f6717b67f9b1a4c3c03527ed21837766.png']}
                />
            </CarImages>
        </Container>
    )
}