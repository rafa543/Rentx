import React from "react";
import Animated, {useSharedValue, useAnimatedStyle} from "react-native-reanimated";
import { Container } from "./style";
import { Button, StyleSheet } from "react-native";
export function Splash() {
    const animation = useSharedValue(0)
    
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: animation.value}
            ]
        }
    })

    function handleAnimationPosition() {
        animation.value= Math.random() *190
    }

    return (
        <Container>
            <Animated.View style={[styles.box, animatedStyles]}/>

            <Button title="Mover" onPress={handleAnimationPosition}/>
        </Container>
    )
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'red'
    }
})