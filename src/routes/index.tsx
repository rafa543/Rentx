import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { LoadAnimation } from '../components/LoadAnimation'
import { useAuth } from '../hooks/auth'
import { AppTabRoutes } from './app.tab.routes'
import { Authroutes } from './auth.routes'

export function Routes() {
    const {user, loading} = useAuth()

    return(
        loading ? <LoadAnimation/> : 
        <NavigationContainer>
            {user.id ? <AppTabRoutes/> : <Authroutes/>}
        </NavigationContainer>
    )
}