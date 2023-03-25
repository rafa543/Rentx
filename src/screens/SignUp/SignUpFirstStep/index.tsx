import { useNavigation } from "@react-navigation/native";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { KeyboardAvoidingView, Keyboard, Alert } from 'react-native'
import { Container, Header, Steps, Title, Subtitle, Form, FormTitle } from "./styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useState } from "react";
import * as Yup from 'yup'
import { useAuth } from "../../../hooks/auth";

export function SignUpFirstStep() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [driverLicense, setDriverLicense] = useState('')

    const navigation = useNavigation<any>()
    const {user} = useAuth()
    console.log(user)

    function handleBack() {
        navigation.goBack()
    }

    async function handleNextStep() {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string()
                    .required("CNH é obrigatoria"),
                email: Yup.string()
                    .email("E-mail invalido")
                    .required('E-mail é obrigatorio'),
                name: Yup.string()
                    .required("Nome é obrigatorio"),
            })

            const data = { name, email, driverLicense }
            await schema.validate(data)
            navigation.navigate("SignUpSecondStep", { user: data })
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert("Opa", error.message)
            }
        }
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
                        <FormTitle>1. Dados</FormTitle>
                        <Input
                            iconName="user"
                            placeholder="Nome"
                            onChangeText={setName}
                            value={name}
                        />
                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                            value={email}
                        />
                        <Input
                            iconName="credit-card"
                            placeholder="CNH"
                            keyboardType="numeric"
                            value={driverLicense}
                            onChangeText={setDriverLicense}
                        />
                    </Form>

                    <Button
                        title="Próximo"
                        onPress={handleNextStep}
                    />

                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}