import React from 'react'
import { StatusBar } from 'react-native';
import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';

export function Home() {
    const carData = {
        brand: "Audi",
        name: "RS 5 Coupe",
        rent: {
            period: "AO DIA",
            price: 120
        },
        thumbnail: 'https://i.pinimg.com/originals/f6/71/7b/f6717b67f9b1a4c3c03527ed21837766.png'
    }
    return (
        <Container>
            <StatusBar
                barStyle='light-content'
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    <TotalCars>
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>

            <CarList 
                data={[1, 2, 3, 4, 5, 6, 7]}
                keyExtractor={item => String(item)}
                renderItem={({item}) => <Car data={carData}/>}
            />
            
        </Container>
    )
}