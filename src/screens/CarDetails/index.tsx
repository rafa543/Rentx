import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { useTheme } from 'styled-components'
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Container, Header, CarImages, Details, Description, Brand, Name, Rent, Period, Price, About,OfflineInfo,  Accessories, Footer } from "./styles";
import { Car as ModelCar } from '../../databases/models/Car'
import CarDto from '../../dtos/CarDto';
import speedSvg from '../../assets/speed.svg'
import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import api from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';

interface Params {
    car: ModelCar
}

export function CarDetails() {
    const [carUpdated, setCarUpdated] = useState<CarDto>({} as CarDto)
    const navigation = useNavigation<any>()
    const route = useRoute()
    const { car } = route.params as Params

    const netInfo = useNetInfo()

    const theme = useTheme()

    const scrollY = useSharedValue(0)
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y
    })

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            )
        }
    })

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    })

    function handleConfirmRental() {
        navigation.navigate("Scheduling", { car })
    }

    function handleBack() {
        navigation.goBack()
    }

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
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />

            <Animated.View
                style={[
                    headerStyleAnimation,
                    styles.header,
                    { backgroundColor: theme.colors.background_secondary }
                ]}
            >
                <Header>
                    <BackButton onPress={handleBack} />
                </Header>

                <CarImages>
                    <Animated.View style={sliderCarsStyleAnimation}>
                        <ImageSlider
                            imagesUrl={
                                !!carUpdated.photos ?
                                    carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
                            }
                        />

                    </Animated.View>
                </CarImages>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160,
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {netInfo.isConnected === true ? car.price : '....'}</Price>
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

                <About>
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                </About>
            </Animated.ScrollView>

            <Footer>
                <Button 
                    title="Escolher período do aluquel" 
                    onPress={handleConfirmRental} 
                    enabled={netInfo.isConnected=== true}
                />
                {
                    netInfo.isConnected === false &&
                    <OfflineInfo>
                        Conecte-se a Internet para ver mais detalhes e agendar seu carro.
                    </OfflineInfo>
                }
            </Footer>
        </Container>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1
    }
})