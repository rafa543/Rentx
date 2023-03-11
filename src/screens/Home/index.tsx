import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native';
import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api'
import CarDto from '../../dtos/CarDto';
import { Load } from '../../components/Load';

export function Home() {
    const [cars, setCars] = useState<CarDto[]>([])
    const [loading, setIsLoading] = useState(true)

    const navigation = useNavigation<any>()
    const carData = {
        brand: "Audi",
        name: "RS 5 Coupe",
        rent: {
            period: "AO DIA",
            price: 120
        },
        thumbnail: 'https://i.pinimg.com/originals/f6/71/7b/f6717b67f9b1a4c3c03527ed21837766.png'
    }

    function handleCarDetails() {
        navigation.navigate("CarDetails")
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/cars')
                setCars(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCars()
    }, [])

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

            {loading ? <Load /> :
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <Car
                            data={item}
                            onPress={handleCarDetails}
                        />
                    }
                />
            }
        </Container>
    )
}