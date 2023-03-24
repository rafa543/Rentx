import { useNavigation } from "@react-navigation/native";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { KeyboardAvoidingView, Keyboard } from 'react-native'
import { Container, Header, Steps, Title, Subtitle, Form, FormTitle } from "./styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export function SignUpFirstStep() {
    const navigation = useNavigation()

    function handleBack() {
        navigation.goBack()
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
                        />
                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                        />
                        <Input
                            iconName="credit-card"
                            placeholder="CNH"
                        />
                    </Form>

                    <Button
                        title="Próximo"
                    />

                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}