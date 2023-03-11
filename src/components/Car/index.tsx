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


interface Props extends TouchableOpacityProps{
    data: CarDto
}

export function Car({data, ...rest}: Props) {
    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.name}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.rent.period}</Period>
                        <Price>{`R$ ${data.rent.price}`}</Price>
                    </Rent>

                    <Type>
                        <GasolineSvg />
                    </Type>

                </About>
            </Details>

            <CardImage source={{uri: data.thumbnail}} resizeMode="contain"/>
        </Container>
    )
}