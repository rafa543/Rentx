import React from 'react'
import { 
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CardImage
} from './styles'

import GasolineSvg from '../../assets/gasoline.svg'
import { TouchableOpacityProps } from 'react-native';
import CarDto from '../../dtos/CarDto';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import {Car as ModelCar} from '../../databases/models/Car'
import { useNetInfo } from '@react-native-community/netinfo';

interface Props extends TouchableOpacityProps{
    data: ModelCar
}

export function Car({data, ...rest}: Props) {
    const netInfo = useNetInfo()
    const MotorIcon = getAccessoryIcon(data.fuel_type)

    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.name}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.period}</Period>
                        <Price>R$ {netInfo.isConnected === true ? data.price : '....'}</Price>
                    </Rent>

                    <Type>
                        <MotorIcon />
                    </Type>

                </About>
            </Details>

            <CardImage source={{uri: data.thumbnail}} resizeMode="contain"/>
        </Container>
    )
}