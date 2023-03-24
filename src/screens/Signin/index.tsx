import React, { useState } from 'react';
import { KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Container, Footer, Form, Header, Subtitle, Title } from "./styles";

import { Button } from '../../components/Button'
import theme from '../../styles/theme';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native';

export function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation<any>()

    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required("E-mail obrigatorio")
                    .email('Digite um e-mail válido'),
                password: Yup.string()
                .required("A senha é obrigatoria")
            })
    
            await schema.validate({email, password})
        } catch (error) {
            if(error) {
                if(error instanceof Yup.ValidationError){
                    return Alert.alert("Opa", error.message)
                }else {
                    return Alert.alert('Error na autenticação', 
                    "Ocorreu um erro ao fazer login, verifique as credenciais")
                }
            }
        }

    }

    function handleNewAccount() {
        navigation.navigate("SignUpFirstStep")
    }

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
                            onPress={handleSignIn}
                            enabled={false}
                            loading={false}

                        />
                        <Button
                            title='Criar conta gratuita'
                            color={theme.colors.background_secondary}
                            light
                            onPress={handleNewAccount}
                            loading={false}
                        />
                    </Footer>

                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}