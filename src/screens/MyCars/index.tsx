import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CaFooterPeriod,
    CarFooterDate
} from "./styles";
import { StatusBar, FlatList } from "react-native";
import React, { useState, useEffect } from 'react'
import CarDto from "../../dtos/CarDto";
import api from "../../services/api";
import { BackButton } from "../../components/BackButton";
import theme from "../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { Car } from "../../components/Car";
import { AntDesign } from '@expo/vector-icons'
import { Load } from "../../components/Load";
import { LoadAnimation } from "../../components/LoadAnimation";
import {Car as ModelCar} from '../../databases/models/Car'
import {format, parseISO} from 'date-fns'

interface CarProps {
    id: string;
    user_id: string;
    car: CarDto;
    start: string;
    end: string;
}

interface DataProps {
    id :string;
    car: ModelCar;
    start_date: string;
    end_date: string;
}

export function MyCars() {
    const [cars, setCars] = useState<DataProps[]>([])
    const [loading, setIsLoading] = useState(true)

    function handleBack() {
        navigation.goBack()
    }

    const navigation = useNavigation<any>()

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/rentals')
                const dateFormatted = response.data.map((data: DataProps) => {
                    return {
                        car: data.car,
                        start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                        end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
                    }
                })
                setCars(dateFormatted)
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
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <Header>
                <BackButton onPress={handleBack} color={theme.colors.shape} />

                <Title>
                    Escolha uma {"\n"}
                    data de início e{"\n"}
                    fim do aluguel
                </Title>

                <SubTitle>
                    Conforto, segurança e praticidade.
                </SubTitle>

            </Header>

            {loading ? <LoadAnimation /> :
                <Content>
                    <Appointments>
                        <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                        <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                    </Appointments>

                    <FlatList
                        data={cars}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CarWrapper>
                                <Car data={item.car} />
                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CaFooterPeriod>
                                        <CarFooterDate>{item.start_date}</CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            size={20}
                                            color={theme.colors.title}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>{item.end_date}</CarFooterDate>
                                    </CaFooterPeriod>
                                </CarFooter>
                            </CarWrapper>
                        )}
                    />

                </Content>
            }
        </Container>
    )
}