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
import { useNavigation, useRoute } from "@react-navigation/native";

interface Params {
    title: string;
    message: string;
    nextScreenRoute: string;
}

export function Confirmation() {
    const route = useRoute()

    const {title, message, nextScreenRoute} = route.params as Params

    const {width} = useWindowDimensions()

    const navigation = useNavigation<any>()

    function handleConfirm() {
        navigation.navigate(nextScreenRoute)
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
                <Title>{title}</Title>

                <Message>
                   {message}
                </Message>
            </Content>

            <Footer>
                <ConfirmButton title="OK" onPress={handleConfirm}/>
            </Footer>
        </Container>
    )
}