import React from 'react'
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
    Accessorys,
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

import speedSvg from '../../assets/speed.svg'
import accelerationSvg from '../../assets/acceleration.svg'
import forceSvg from '../../assets/force.svg'
import gasolineSvg from '../../assets/gasoline.svg'
import exchangeSvg from '../../assets/exchange.svg'
import peopleSvg from '../../assets/people.svg'
import { Button } from '../../components/Button';

import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native';

export function SchedulingDetails() {
    const theme = useTheme()

    const navigation = useNavigation<any>()

    function handleConfirmRental() {
        navigation.navigate("SchedulingComplete")
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
                        <DateValue>18/06/2023</DateValue>
                    </DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>ATE</DateTitle>
                        <DateValue>18/06/2023</DateValue>
                    </DateInfo>

                </RentalPeriod>
            
                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetail>
                        <RentalPriceQuota>R$ 580 x 3 diárias</RentalPriceQuota>
                        <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
                    </RentalPriceDetail>
                </RentalPrice>
            </Content>

            <Footer>
                <Button title="Alugar agora" color={theme.colors.success} onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    )
}