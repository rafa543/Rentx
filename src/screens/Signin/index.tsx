import React from 'react';
import { StatusBar } from 'react-native';
import { Container, Footer, Header, Subtitle, Title } from "./styles";

import {Button} from '../../components/Button'
import theme from '../../styles/theme';

export function Signin() {
    return(
        <Container>
            <StatusBar
                backgroundColor='transparent'
                barStyle='dark-content'
                translucent
            />
            <Header>
                <Title>Estamos{'\n'}quase lá</Title>
                <Subtitle>Faça seu login para começar{'\n'}
                    uma experiência incrivel.
                </Subtitle>
            </Header>

            <Footer>
                <Button
                    title='Login'
                    onPress={() => {}}
                    disabled={true}
                    loading={false}
                    
                />
                <Button
                    title='Criar conta gratuita'
                    color={theme.colors.background_secondary}
                    light
                    onPress={() => {}}
                    disabled={true}
                    loading={false}
                />
            </Footer>

        </Container>
    )
}