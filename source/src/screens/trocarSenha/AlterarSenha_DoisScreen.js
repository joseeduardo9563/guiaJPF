import React, { Component } from 'react';
import {
    StyleSheet,
    StatusBar,
    Image,
    View,
    Keyboard,
    Platform,
    ImageBackground,
    TouchableOpacity,
    Alert
} from 'react-native';
import {
    Text,
    Root,
    Container,
    Content,
    H3,
    Form,
    Item,
    Input,
    Button,
    Label,
    Toast,
    Icon
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColorsScheme from '../../settings/ColorsScheme';
import { TextInputMask } from 'react-native-masked-text';
import Server from '../../settings/Server';
import { sha1 } from 'react-native-sha1';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class AlterarSenhaDois extends Component {
    constructor() {
        super();
        this.state = {
            novaSenha: '',
            confirmarSenha: '',
            disable: false,
            usuario: {},
            matricula: '',
            secureTextEntry: true,
            secureTextEntry1: true

        };
        AsyncStorage.getItem('@usuario')
            .then(val => {
                this.setState({
                    matricula: JSON.parse(val).matricula,
                    usuario: JSON.parse(val)
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    componentDidMount() { }

    onSubmit() {
        this.setState({ disable: true })
        if (this.state.novaSenha != '' && this.state.confirmarSenha != '') {
            if (this.state.novaSenha == this.state.confirmarSenha) {
                Keyboard.dismiss();

                sha1(this.state.novaSenha).then(hash => {
                    let key = '';

                    if (Platform.OS === "ios") {
                        key = hash.toUpperCase();
                    } else {
                        key = hash;
                    }

                    const url =
                        Server.API +
                        'alterarSenha/UpdatePassword.asp?matricula=' +
                        this.state.matricula +
                        '&senha=' +
                        key;
                    fetch(url)

                        .then(responseJson => {
                            console.log(url),
                                console.log(responseJson)
                            responseJson.oauthtoken = "kYXbW>c&qt*wVd))/H9pa#oHc<E<"
                            responseJson.senha = this.state.novaSenha;
                            responseJson.email = this.state.usuario.email;
                            responseJson.matricula = this.state.matricula;
                            fetch('http://awapp.net.br/extremamedic/MailerApi/sendNewPassword_BeneficiarioExtrema.php', {
                                method: 'POST',
                                body: JSON.stringify(responseJson),
                            })
                                .then((response) => response.json())
                                .then((final) => {
                                    console.log(final)
                                    if (final.status) {
                                        Alert.alert(
                                            "Verifique seu e-mail",
                                            "Sua senha foi alterada e encaminhada para o e-mail informado.",
                                            [
                                                {
                                                    text: "OK",
                                                    onPress: () =>
                                                        this.props.navigation.navigate("Login"),
                                                    style: "default"
                                                }
                                            ],
                                            { cancelable: false }
                                        )

                                    } else {
                                        this.setState({ disable: false })

                                        Alert.alert(
                                            "Ops!",
                                            "Algo deu errado.",
                                            [
    
                                                {
                                                    text: "OK",
                                                }
                                            ],
                                            { cancelable: false }
                                        )
                                    }
                                })
                                .catch(err => {
                                    this.setState({ disable: false })
                                    console.log(err)

                                    Alert.alert(
                                        "Ops!",
                                        "Algo deu errado.",
                                        [

                                            {
                                                text: "OK",
                                            }
                                        ],
                                        { cancelable: false }
                                    )
                                })
                        })
                        .catch((err) => {
                            this.setState({ disable: false })
                            console.log(err)
                            Alert.alert(
                                "Ops!",
                                "Algo deu errado.",
                                [

                                    {
                                        text: "OK",
                                    }
                                ],
                                { cancelable: false }
                            )
                        })
                });
            }

            else {
                this.setState({ disable: false })
                Alert.alert(
                    "Atenção!",
                    "As senhas informadas não conferem, verifique e tente novamente. ",
                    [

                        {
                            text: "OK",
                        }
                    ],
                    { cancelable: false }
                )
            }

        }
        else {
            this.setState({ disable: false })
            Alert.alert(
                "Campo vazio",
                "Preencha todos os campos e tente novamente.",
                [

                    {
                        text: "OK",
                    }
                ],
                { cancelable: false }
            )
        }

    }






    render() {
        return (
            <Root>
                <StatusBar
                    backgroundColor={ColorsScheme.ASENT_COLOR}
                    barStyle="light-content"
                />

                <ImageBackground
                    source={require('../../assets/fundoNovo.png')}
                    style={{
                        width: '100%',
                        height: '100%',
                        flex: 1,
                    }}
                >
                    <Content style={{ width: '100%' }}>
                        <View
                            style={[
                                {
                                    padding: 20,
                                    marginTop: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }
                            ]}
                        >
                            <Image
                                style={{ width: 200.6, height: 124 }}
                                source={require('../../assets/jpfTransparente.png')}
                                resizeMode="contain"
                            />
                        </View>
                        <H3
                            style={{
                                padding: 10,
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}
                        >
                            ALTERAR SENHA
                        </H3>
                        <Form style={{ padding: 10 }}>
                            <Item
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    paddingTop: 10
                                }}
                            >
                                <Text style={{ marginBottom: 13 }}>
                                    Nova Senha:
                                </Text>
                                <Input
                                    secureTextEntry={this.state.secureTextEntry}
                                    style={{
                                        width: '80%',
                                        fontSize: 14,
                                        color: "#000000"
                                    }}

                                    onChangeText={val =>
                                        this.setState({ novaSenha: val })
                                    }
                                />

                                <FontAwesome5
                                    name={this.state.secureTextEntry ? 'eye' : 'eye-slash'}
                                    style={Platform.OS === "ios" ? {
                                        color: ColorsScheme.ASENT_COLOR,
                                        fontSize: 25,
                                        marginTop: -20,
                                        position: "relative",
                                        left: "85%"
                                    } : {
                                        color: ColorsScheme.ASENT_COLOR,
                                        fontSize: 25,
                                        marginTop: -30,
                                        position: "relative",
                                        left: "85%"
                                    }}
                                    onPress={() => { this.setState({ secureTextEntry: !this.state.secureTextEntry }) }}
                                />
                            </Item>
                            <Item
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    paddingTop: 10
                                }}
                            >
                                <Text style={{ marginBottom: -13 }}>
                                    Confirme sua senha:
                                </Text>
                                <Input
                                     secureTextEntry={this.state.secureTextEntry1}
                                    style={{
                                        width: '80%',
                                        fontSize: 14,
                                        color: "#000000"
                                    }}
                                    onChangeText={val =>
                                        this.setState({ confirmarSenha: val })
                                    }
                                />

                                <FontAwesome5
                                    name={this.state.secureTextEntry1 ? 'eye' : 'eye-slash'}
                                    style={Platform.OS === "ios" ? {
                                        color: ColorsScheme.ASENT_COLOR,
                                        fontSize: 25,
                                        marginTop: -20,
                                        position: "relative",
                                        left: "85%"
                                    } : {
                                        color: ColorsScheme.ASENT_COLOR,
                                        fontSize: 25,
                                        marginTop: -30,
                                        position: "relative",
                                        left: "85%"
                                    }}
                                    onPress={() => { this.setState({ secureTextEntry1: !this.state.secureTextEntry1 }) }}
                                />
                            </Item>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end'
                                }}
                            >
                                <Button
                                    disabled={this.state.disable}
                                    style={{
                                        margin: 10,
                                        backgroundColor:
                                            ColorsScheme.ASENT_COLOR
                                    }}
                                    rounded
                                    dark
                                    onPress={this.onSubmit.bind(this)}
                                >
                                    <Text>Enviar</Text>
                                </Button>
                            </View>
                        </Form>

                    </Content>
                </ImageBackground>

                <Button
                    disabled={this.state.disable}
                    transparent
                    onPress={() => this.props.navigation.goBack()}
                    style={[
                        {
                            position: 'absolute'
                        },
                        Platform.OS == 'ios' ? { top: 15 } : {}
                    ]}
                >
                    <Icon name="arrow-back" style={{ color: 'black' }} />
                </Button>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorsScheme.MAIN_COLOR
    }
});
