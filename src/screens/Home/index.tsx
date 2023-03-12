import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native';
import { Container, Header, TotalCars, HeaderContent, CarList, MyCarsButton } from "./styles";
import {Ionicons} from '@expo/vector-icons'

import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api'
import CarDto from '../../dtos/CarDto';
import { Load } from '../../components/Load';
import theme from '../../styles/theme';

export function Home() {
    const [cars, setCars] = useState<CarDto[]>([])
    const [loading, setIsLoading] = useState(true)

    const navigation = useNavigation<any>()

    function handleCarDetails(car: CarDto) {
        navigation.navigate("CarDetails", {car})
    }

    function handleOpenMyCars() {
        navigation.navigate("MyCars")
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
                            onPress={() => handleCarDetails(item)}
                        />
                    }
                />
            }

            <MyCarsButton onPress={handleOpenMyCars}>
                <Ionicons name='ios-car-sport' size={32} color={theme.colors.shape}/>
            </MyCarsButton>
        </Container>
    )
}