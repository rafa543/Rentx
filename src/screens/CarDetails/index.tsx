import React from 'react'
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Container, Header, CarImages, Content, Details, Description, Brand, Name, Rent, Period, Price, About, Accessories, Footer } from "./styles";

import speedSvg from '../../assets/speed.svg'
import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import CarDto from '../../dtos/CarDto';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Params {
    car: CarDto
}

export function CarDetails() {
    const navigation = useNavigation<any>()
    const route = useRoute()
    const { car } = route.params as Params

    function handleConfirmRental() {
        navigation.navigate("Scheduling", { car })
    }

    function handleBack() {
        navigation.goBack()
    }

    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack} />
            </Header>

            <CarImages>
                <ImageSlider
                    imagesUrl={car.photos}
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>{`R$ ${car.rent.price}`}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map(accesory => (
                            <Accessory
                                key={accesory.type}
                                name={accesory.name}
                                icon={getAccessoryIcon(accesory.type)}
                            />
                        ))
                    }
                </Accessories>

                <About>
                    {car.about}
                </About>
            </Content>

            <Footer>
                <Button title="Escolher per??odo do aluquel" onPress={handleConfirmRental} />
            </Footer>
        </Container>
    )
}