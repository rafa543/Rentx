import { BackButton } from "../../components/BackButton";
import { Container, Header, Title,RentalPeriod, DateInfo, DateTitle, DateValue, Content, Footer } from "./styles";
import { useTheme } from 'styled-components'

import ArrowSvg from '../../assets/arrow.svg'
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";

export function Scheduling() {
    const theme = useTheme()

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

            </Content>

            <Footer>
                <Button title="Confirmar"/>
            </Footer>

        </Container>
    )
}