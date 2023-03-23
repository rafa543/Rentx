import React from 'react';
import { StatusBar } from 'react-native';
import { Container, Footer, Form, Header, Subtitle, Title } from "./styles";

import { Button } from '../../components/Button'
import theme from '../../styles/theme';
import { Input } from '../../components/Input';

export function Signin() {
    return (
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

            <Form>
                <Input 
                    iconName='mail'
                    placeholder='E-mail'
                    keyboardType='email-address'
                    autoCorrect={false}
                    autoCapitalize="none"
                />
            </Form>

            <Footer>
                <Button
                    title='Login'
                    onPress={() => { }}
                    disabled={true}
                    loading={false}

                />
                <Button
                    title='Criar conta gratuita'
                    color={theme.colors.background_secondary}
                    light
                    onPress={() => { }}
                    loading={false}
                />
            </Footer>

        </Container>
    )
}