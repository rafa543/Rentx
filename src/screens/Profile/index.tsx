import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section
} from "./styles";
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'
import { Input } from "../../components/Input";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { PasswordInput } from "../../components/PasswordInput";
import { useAuth } from "../../hooks/auth";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { Button } from "../../components/Button";
import * as Yup from 'yup'


export function Profile() {
    const { user, signOut, updatedUser } = useAuth()

    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
    const [avatar, setAvatar] = useState(user.avatar)
    const [name, setName] = useState(user.name)
    const [driverLicense, setDriverLicense] = useState(user.driver_license)

    const theme = useTheme()
    const navigation = useNavigation()

    function handleBack() {
        navigation.goBack()
    }

    async function handleAvatarSelect() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        })

        if (result.cancelled) {
            return;
        }

        const { uri } = result as ImageInfo
        if (uri) {
            setAvatar(uri)
        }
    }

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        setOption(optionSelected)
    }

    async function handleProfileUpdate() {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required("CNH é obrigatoria"),
                name: Yup.string().required("Nome é obrigatorio")
            })

            const data = {name, driverLicense}

            await schema.validate(data)
            await updatedUser({
                id: user.id,
                user_id: user.user_id,
                email: user.email,
                name,
                driver_license: driverLicense,
                avatar,
                token: user.token
            })


            Alert.alert("Perfil atualizado!")
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                Alert.alert("Opa", error.message)
            }else{
                Alert.alert("Não foi possivel alterar o perfil")
            }
        }
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeaderTop>
                            <BackButton
                                color={theme.colors.shape}
                                onPress={handleBack}
                            />
                            <HeaderTitle>Editar Perfil</HeaderTitle>
                            <LogoutButton onPress={signOut}>
                                <Feather
                                    name="power"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </LogoutButton>
                        </HeaderTop>

                        <PhotoContainer>
                            {!!avatar && <Photo source={{ uri: avatar }} />}
                            <PhotoButton onPress={handleAvatarSelect}>
                                <Feather
                                    name="camera"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </PhotoButton>
                        </PhotoContainer>

                    </Header>

                    <Content style={{ marginBottom: useBottomTabBarHeight() }}>
                        <Options>
                            <Option
                                active={option === 'dataEdit'}
                                onPress={() => handleOptionChange('dataEdit')}
                            >
                                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
                            </Option>
                            <Option
                                active={option === 'passwordEdit'}
                                onPress={() => handleOptionChange('passwordEdit')}
                            >
                                <OptionTitle active={option === 'passwordEdit'}>Trocar Senha</OptionTitle>
                            </Option>
                        </Options>

                        {
                            option === 'dataEdit' ?
                                <Section>
                                    <Input
                                        iconName="user"
                                        placeholder="Nome"
                                        autoCorrect={false}
                                        defaultValue={user.name}
                                        onChangeText={setName}
                                    />
                                    <Input
                                        iconName="mail"
                                        editable={false}
                                        defaultValue={user.email}
                                    />
                                    <Input
                                        iconName="credit-card"
                                        placeholder="CNH"
                                        keyboardType="numeric"
                                        defaultValue={user.driver_license}
                                        onChangeText={setDriverLicense}
                                    />
                                </Section>
                                :
                                <Section>
                                    <PasswordInput
                                        iconName="lock"
                                        placeholder="Senha atual"
                                    />
                                    <PasswordInput
                                        iconName="lock"
                                        placeholder="Nova senha"
                                    />
                                    <PasswordInput
                                        iconName="lock"
                                        placeholder="Repetir senha"
                                    />
                                </Section>
                        }
                        <Button
                            title="Salvar alterações"
                            onPress={handleProfileUpdate}
                        />
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}