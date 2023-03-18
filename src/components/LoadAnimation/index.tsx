import { Container } from "./styles"

import LottieView from 'lottie-react-native'
import loadingCar from '../../assets/loading_car.json'

export function LoadAnimation() {
    return (
        <Container>
            <LottieView 
                source={loadingCar}
                autoPlay
                resizeMode="contain"
                style={{height: 200}}
                loop
            />
        </Container>
    )
}