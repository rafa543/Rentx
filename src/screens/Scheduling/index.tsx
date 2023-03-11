import { BackButton } from "../../components/BackButton";
import { Container, Header, Title,RentalPeriod, DateInfo, DateTitle, DateValue, Content, Footer } from "./styles";
import { useTheme } from 'styled-components'

import ArrowSvg from '../../assets/arrow.svg'
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";
import { useNavigation } from "@react-navigation/native";

export function Scheduling() {
    const theme = useTheme()

    const navigation = useNavigation<any>()

    function handleConfirmRental() {
        navigation.navigate("SchedulingDetails")
    }

    return (
        <Container>
            <StatusBar 
                barStyle="light-content" 
                translucent 
                backgroundColor="transparent"
            />
            <Header> 
                <BackButton onPress={() => { }} color={theme.colors.shape} />

                <Title>
                    Escolha uma {"\n"}
                    data de início e{"\n"}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={false}>18/06/2021</DateValue>
                    </DateInfo>
                    
                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATE</DateTitle>
                        <DateValue selected={false}>18/06/2021</DateValue>
                    </DateInfo>
                </RentalPeriod>

            </Header>

            <Content>
                <Calendar/>
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleConfirmRental}/>
            </Footer>

        </Container>
    )
}