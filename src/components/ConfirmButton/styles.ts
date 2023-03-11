import { TouchableOpacity } from "react-native";
import { TouchableOpacityProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ButtonProps extends TouchableOpacityProps {
    color: string
}

export const Container = styled(TouchableOpacity)`
    width: 80px;
    height: 56px;

    background-color: ${({theme}) => theme.colors.shape_dark};

    align-items: center;
    justify-content: center;
`
export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.primary_500};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(15)}px;
`