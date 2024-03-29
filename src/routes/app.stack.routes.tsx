import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { CarDetails } from '../screens/CarDetails'
import { Confirmation } from '../screens/Confirmation'
import { MyCars } from '../screens/MyCars'
import { Scheduling } from '../screens/Scheduling'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { Home } from '../screens/Home'


const { Navigator, Screen } = createStackNavigator()

export function AppStackRoutes() {
    return (
        <Navigator initialRouteName='Home' screenOptions={{
            headerShown: false
        }}>
            <Screen
                name='Home'
                component={Home}
            />
            <Screen
                name='CarDetails'
                component={CarDetails}
            />
            <Screen
                name='Scheduling'
                component={Scheduling}
            />
            <Screen
                name='SchedulingDetails'
                component={SchedulingDetails}
            />
            <Screen
                name='Confirmation'
                component={Confirmation}
            />
            <Screen
                name='MyCars'
                component={MyCars}
            />
        </Navigator>
    )
}