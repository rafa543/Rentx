import React from 'react'
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
import { Container, Header, CarImages, Details, Description, Brand, Name, Rent, Period, Price, About, Accessories, Footer } from "./styles";

import speedSvg from '../../assets/speed.svg'
import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import CarDto from '../../dtos/CarDto';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface Params {
    car: CarDto
}

export function CarDetails() {
    const navigation = useNavigation<any>()
    const route = useRoute()
    const { car } = route.params as Params

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
                            imagesUrl={car.photos}
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
                        <Period>{car.rent.period}</Period>
                        <Price>{`R$ ${car.rent.price}`}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map(accesory => (
                            <Accessory
                                key={accesory.type}
                                name={accesory.name}
                                icon={getAccessoryIcon(accesory.type)}
                            />
                        ))
                    }
                </Accessories>

                <About>
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                </About>
            </Animated.ScrollView>

            <Footer>
                <Button title="Escolher período do aluquel" onPress={handleConfirmRental} />
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