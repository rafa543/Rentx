import { Container, Header, Title, SubTitle, Content, Appointments, AppointmentsTitle, AppointmentsQuantity } from "./styles";
import { StatusBar, FlatList } from "react-native";
import React, {useState, useEffect} from 'react'
import CarDto from "../../dtos/CarDto";
import api from "../../services/api";
import { BackButton } from "../../components/BackButton";
import theme from "../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { Car } from "../../components/Car";

interface CarProps {
    id: string;
    user_id: string;
    car: CarDto;
}

export function MyCars() {
    const [cars, setCars] = useState<CarProps[]>([])
    const [loading, setIsLoading] = useState(true)

    function handleBack() {
        navigation.goBack()
    }

    const navigation = useNavigation<any>()

    useEffect(() => {
        async function fetchCars() {
            try { 
                const response = await api.get('/schedules_byuser?user_id=1')
                setCars(response.data)
            } catch (error) {
                console.log(error)
            } finally{
                setIsLoading(false)
            }
        }

        fetchCars()
    }, []) 
    return(
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
        
            <Content>
                <Appointments>
                    <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                    <AppointmentsQuantity>10</AppointmentsQuantity>
                </Appointments>

                <FlatList
                    data={cars}
                    keyExtractor={item => item.id} 
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => <Car data={item.car}/>}
                />

            </Content>

        </Container>
    )
}