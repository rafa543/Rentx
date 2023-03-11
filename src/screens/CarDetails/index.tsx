import React from 'react'
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Container, Header, CarImages, Content, Details, Description, Brand, Name, Rent, Period, Price, About } from "./styles";


export function CarDetails() {

    return (
        <Container>
            <Header>
                <BackButton onPress={() => { }} />
            </Header>

            <CarImages>
                <ImageSlider
                    imagesUrl={['https://i.pinimg.com/originals/f6/71/7b/f6717b67f9b1a4c3c03527ed21837766.png']}
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 500</Price>
                    </Rent>
                </Details>

                <About>
                    ESte é automovel desportivo. Surgiu do lendario touro de lide indultado
                    na praça Real Maestranza de Sevilla. É um belissimo carro para quem gosta de acelerar.
                </About>
            </Content>
        </Container>
    )
}