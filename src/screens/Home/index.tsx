import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";
import { synchronize } from '@nozbe/watermelondb/sync'
import Animated, {
    useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring
} from 'react-native-reanimated';
import { database } from '../../databases';
import {Car as ModelCar} from '../../databases/models/Car'
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

import { LoadAnimation } from '../../components/LoadAnimation';
import CarDto from '../../dtos/CarDto';
import api from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';

export function Home() {
    const [cars, setCars] = useState<ModelCar[]>([])
    const [loading, setIsLoading] = useState(true)

    const positionY = useSharedValue(0)
    const positionX = useSharedValue(0)

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value }
            ]
        }
    })

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any) {
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event, ctx: any) {
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd() {
            positionX.value = withSpring(0)
            positionY.value = withSpring(0)
        }
    })

    const netInfo = useNetInfo()
    const navigation = useNavigation<any>()

    function handleCarDetails(car: ModelCar) {
        navigation.navigate("CarDetails", { car })
    }

    function handleOpenMyCars() {
        navigation.navigate("MyCars")
    }

    async function offlineSynchronize() {
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
                const response = await api
                .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

                const {changes, latestVersion} = response.data
                return {changes, timestamp: latestVersion}
            },
            pushChanges: async ({ changes }) => {
                const user = changes.users
                await api.post('users/sync', user)
            }
        })
    }

    useEffect(() => {
        let isMounted = true

        async function fetchCars() {
            try {
                // const response = await api.get('/cars')
                const carCollection = database.get<ModelCar>('cars')
                const cars = await carCollection.query().fetch()

                if (isMounted) {
                    setCars(cars)
                }
            } catch (error) {
                console.log(error)
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        fetchCars()
        return () => {
            isMounted = false
        }
    }, [])

    useEffect(() => {
        if(netInfo.isConnected === true) {
            offlineSynchronize()
        }
    }, [netInfo.isConnected])

    return (
        <Container>
            <StatusBar
                barStyle='light-content'
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    {
                        !loading &&
                        <TotalCars>
                            Total de {cars.length} carros
                        </TotalCars>
                    }
                </HeaderContent>
            </Header>

            {loading ? <LoadAnimation /> :
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <Car
                            data={item}
                            onPress={() => handleCarDetails(item)}
                        />
                    }
                />
            }


            {/* <PanGestureHandler
                onGestureEvent={onGestureEvent}
            >
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22
                        }
                    ]}
                >
                    <ButtonAnimated
                        onPress={handleOpenMyCars}
                        style={[styles.botton, { backgroundColor: theme.colors.main }]}
                    >
                        <Ionicons name='ios-car-sport' size={32} color={theme.colors.shape} />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler> */}
        </Container>
    )
}

const styles = StyleSheet.create({
    botton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})