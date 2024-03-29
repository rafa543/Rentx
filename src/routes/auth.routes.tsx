import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { Confirmation } from '../screens/Confirmation'
import { Signin } from '../screens/Signin'
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep'
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep'
import { Splash } from '../screens/Splash'


const { Navigator, Screen } = createStackNavigator()

export function Authroutes() {
    return (
        <Navigator initialRouteName='Splash' screenOptions={{
            headerShown: false
        }}>
            <Screen
                name='Splash'
                component={Splash}
            />
            <Screen
                name='Signin'
                component={Signin}
            />
            <Screen
                name='SignUpFirstStep'
                component={SignUpFirstStep}
            />
            <Screen
                name='SignUpSecondStep'
                component={SignUpSecondStep}
            />
            <Screen
                name='Confirmation'
                component={Confirmation}
            />
        </Navigator>
    )
}