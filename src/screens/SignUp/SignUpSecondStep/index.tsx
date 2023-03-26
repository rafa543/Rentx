import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from 'styled-components'
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { KeyboardAvoidingView, Keyboard, Alert } from 'react-native'
import { Container, Header, Steps, Title, Subtitle, Form, FormTitle } from "./styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { PasswordInput } from "../../../components/PasswordInput";
import { useState } from "react";
import api from "../../../services/api";

interface Params {
    user: {
        name: string,
        email: string,
        driverLicense: string
    }
}

export function SignUpSecondStep() {
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const navigation = useNavigation<any>()
    const route = useRoute()

    const { user } = route.params as Params

    const theme = useTheme()

    function handleBack() {
        navigation.goBack()
    }

    async function handleRegister() {
        if (!password || !passwordConfirm) {
            return Alert.alert("Informe a senha e a confirmação.")
        }

        if (password != passwordConfirm) {
            return Alert.alert("As senhas não são iquais")
        }

        await api.post("/users", {
            name: user.name,
            email: user.email,
            driver_license: user.driverLicense,
            password
        })
        .then(() => {
            navigation.navigate("Confirmation", {
                title: 'Conta criada',
                message: `Agora é só fazer login\n e aproveitar`,
                nextScreenRoute: 'Signin',
            })
        })
        .catch((error) => {
            console.log(error)
            Alert.alert("Opa", "Não foi possivel cadastrar")
        })

    }

    return (
        <KeyboardAvoidingView
            behavior='position'
            enabled
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleBack} />
                        <Steps>
                            <Bullet active />
                            <Bullet />
                        </Steps>
                    </Header>

                    <Title>
                        Crie sua {"\n"} conta
                    </Title>
                    <Subtitle>
                        Faça seu cadastro de {"\n"}
                        forma rápida e facil
                    </Subtitle>

                    <Form>
                        <FormTitle>2. Senha</FormTitle>
                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            value={password}
                            onChangeText={setPassword}
                        />
                        <PasswordInput
                            iconName="lock"
                            placeholder="Repetir Senha"
                            value={passwordConfirm}
                            onChangeText={setPasswordConfirm}
                        />
                    </Form>

                    <Button
                        title="Cadatrar"
                        color={theme.colors.success}
                        onPress={handleRegister}
                    />

                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}