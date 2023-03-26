import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { useAuth } from '../hooks/auth'
import { AppTabRoutes } from './app.tab.routes'
import { Authroutes } from './auth.routes'

export function Routes() {
    const {user} = useAuth()

    return(
        <NavigationContainer>
            {user.id ? <AppTabRoutes/> : <Authroutes/>}
        </NavigationContainer>
    )
}