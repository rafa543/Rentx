import React from 'react'
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Container, Header, CarImages, Content, Details, Description, Brand, Name, Rent, Period, Price, About, Accessorys, Footer } from "./styles";

import speedSvg from '../../assets/speed.svg'
import accelerationSvg from '../../assets/acceleration.svg'
import forceSvg from '../../assets/force.svg'
import gasolineSvg from '../../assets/gasoline.svg'
import exchangeSvg from '../../assets/exchange.svg'
import peopleSvg from '../../assets/people.svg'
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

export function CarDetails() {

    const navigation = useNavigation<any>()

    function handleConfirmRental() {
        navigation.navigate("Scheduling")
    }

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

                <Accessorys>
                    <Accessory name="380kM/H" icon={speedSvg} />
                    <Accessory name="3.2S" icon={accelerationSvg} />
                    <Accessory name="800 HP" icon={forceSvg} />
                    <Accessory name="Gasolina" icon={gasolineSvg} />
                    <Accessory name="Auto" icon={exchangeSvg} />
                    <Accessory name="2 pessoas" icon={peopleSvg} />
                </Accessorys>

                <About>
                    ESte é automovel desportivo. Surgiu do lendario touro de lide indultado
                    na praça Real Maestranza de Sevilla. É um belissimo carro para quem gosta de acelerar.
                </About>
            </Content>

            <Footer>
                <Button title="Escolher período do aluquel" onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    )
}