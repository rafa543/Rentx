import { Container, Title } from "./styles";
import { useTheme } from 'styled-components'
import { ActivityIndicator } from "react-native";

interface Props {
    title: string;
    color?: string;
    onPress: () => void
    disabled?: boolean;
    loading?: boolean;
}

export function Button({
    title,
    color,
    onPress,
    disabled = false,
    loading = false
}: Props) {
    const theme = useTheme()

    return (
        <Container
            color={color ? color : theme.colors.main}
            onPress={onPress}
            disabled={disabled}
            style={{ opacity: disabled === false ? 1 : .5 }}
        >
            {loading ?
                <ActivityIndicator color={theme.colors.shape} />
                :
                <Title>
                    {title}
                </Title>
            }
        </Container>
    )
}