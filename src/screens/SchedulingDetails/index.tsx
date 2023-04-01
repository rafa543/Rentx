import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    Footer,
    RentalPeriod,
    CalendaIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetail,
    RentalPriceQuota,
    RentalPriceTotal
} from "./styles";

import { Button } from '../../components/Button';

import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native';
import CarDto from '../../dtos/CarDto';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { format } from 'date-fns';
import { getPlataformDate } from '../../utils/getPlataformDate';
import api from '../../services/api';
import { ActivityIndicator } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo';
import { useAuth } from '../../hooks/auth';

interface Params {
    car: CarDto;
    dates: string[]
}

interface RentalPeriod {
    start: string;
    end: string;
}

export function SchedulingDetails() {
    const [carUpdated, setCarUpdated] = useState<CarDto>({} as CarDto)
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
    const [loading, setIsLoading] = useState(false)
    const route = useRoute()
    const { car, dates } = route.params as Params
    const theme = useTheme()
    const navigation = useNavigation<any>()
    const netInfo = useNetInfo()
    const rentTotal = Number(dates.length * car.price)
    const { user, signOut, updatedUser } = useAuth()

    async function handleConfirmRental() {
        console.log(user)
        setIsLoading(true)
        // const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

        // const unavailable_dates = [
        //     ...schedulesByCar.data.unavailable_dates,
        //     ...dates,
        // ]

        await api.post('rentals', {
            user_id: 1,
            car_id: car.id,
            start_date: new Date(dates[0]),
            end_date: new Date(dates[dates.length - 1]),
            total: rentTotal
        },
        {
            headers: {authorization: `Bearer ${user.token}`}
        }
        ).then(() => navigation.navigate("Confirmation", {
            title: 'Carro alugado!',
            message: `Agora você só preicsa ir\n até a concessionária da RENTX\n pegar o seu automóvel.`,
            nextScreenRoute: 'Home',
        }))
        .catch((error) => {
            console.log(user.token+ "f")
            setIsLoading(false)
            console.log(error)
            console.log(user.token)
            Alert.alert("Não foi possivel confirmar o agendamento.")
        })


    }

    function handleBack() {
        navigation.goBack()
    }

    useEffect(() => {
        
        setRentalPeriod({
            start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
        })
    }, [])

    useEffect(() => {
        async function fetchCarUpdate() {
            const response = await api.get(`/cars/${car.id}`)
            setCarUpdated(response.data)
        }

        if (netInfo.isConnected === true) {
            fetchCarUpdate()
        }
    }, [netInfo.isConnected])

    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack} />
            </Header>

            <CarImages>
                <ImageSlider
                    imagesUrl={
                        !!carUpdated.photos ?
                            carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
                    }
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
                    </Rent>
                </Details>

                {
                    carUpdated.accessories &&
                    <Accessories>
                        {
                            carUpdated.accessories.map(accesory => (
                                <Accessory
                                    key={accesory.type}
                                    name={accesory.name}
                                    icon={getAccessoryIcon(accesory.type)}
                                />
                            ))
                        }
                    </Accessories>
                }

                <RentalPeriod>
                    <CalendaIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendaIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>

                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetail>
                        <RentalPriceQuota>{`R$ ${car.price} x ${dates.length} diárias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetail>
                </RentalPrice>
            </Content>

            <Footer>
                <Button
                    title="Alugar agora"
                    color={theme.colors.success}
                    onPress={handleConfirmRental}
                    // enabled={!loading}
                    // disabled={loading}
                    loading={loading}
                />
            </Footer>

        </Container>
    )
}