import React, { useState } from 'react';
import { KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Container, Footer, Form, Header, Subtitle, Title } from "./styles";

import { Button } from '../../components/Button'
import theme from '../../styles/theme';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

export function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <KeyboardAvoidingView
            behavior='position'
            enabled
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            onChangeText={setEmail}
                            value={email}
                        />
                        <PasswordInput
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
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
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}