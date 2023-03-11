import { 
    Container, 
    Content, 
    Title,
    Message, 
    Footer
} from "./styles";
import {StatusBar, useWindowDimensions} from 'react-native'
import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'
import { ConfirmButton } from "../../components/ConfirmButton";
import { useNavigation } from "@react-navigation/native";


export function SchedulingComplete() {
    const {width} = useWindowDimensions()

    const navigation = useNavigation<any>()

    function handleConfirm() {
        navigation.navigate("Home")
    }

    return (
        <Container>
            <StatusBar 
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <LogoSvg width={width}/>

            <Content>
                <DoneSvg width={80} height={80}/>
                <Title>Carro alugado!</Title>

                <Message>
                    Agora voçê so precia ir{"\n"}
                    até a concessionaria da RENTX {"\n"}
                    pegar o seu automóvel.
                </Message>
            </Content>

            <Footer>
                <ConfirmButton title="OK" onPress={handleConfirm}/>
            </Footer>
        </Container>
    )
}