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
import ColorsScheme from '../../settings/ColorsScheme';
import { TextInputMask } from 'react-native-masked-text';
import Server from '../../settings/Server';
import { sha1 } from 'react-native-sha1';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default class AlterarSenha extends Component {
    constructor() {
        super();
        this.state = {
            cpf: '',
            senhaAtual: '',
            disable: false,
            usuario: {},
            matricula: '',
            secureTextEntry: true
        };

    
    }
    componentDidMount() {
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
    onSubmit() {
        if (this.state.cpf != '' && this.state.senhaAtual != '') {
            Keyboard.dismiss();

            sha1(this.state.senhaAtual).then(hash => {
            const url =
                Server.API +
                'alterarSenha/getDados.asp?cpf=' +
                this.state.cpf +
                '&senha=' +
                hash +
                '&matricula=' +
                this.state.matricula;
                fetch(url)       
                .then(response => response.json())
                .then(responseJson => {
                    console.log("url", url)
                    if (responseJson.senha != "" && responseJson.cpf != "") {

                        this.props.navigation.navigate('AlterarSenhaDois')

                    } else {
                        Alert.alert(
                            "Dados inválido",
                            "Verifique os dados informados e tente novamente.",
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
                    console.log(err);
                    Alert.alert(
                        "Dados inválido!",
                        "Verifique os dados informados e tente novamente.",
                        [

                            {
                                text: "OK",
                            }
                        ],
                        { cancelable: false }
                    )
                });
            });
        } 
        else {
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
                                    alignItems: 'flex-start'
                                }}
                            >
                                <Text style={{ marginBottom: 13 }}>
                                    CPF :
                                </Text>
                                <TextInputMask
                                        type={"cpf"}
                                        ref="CPFMY"
                                    style={{
                                        width: '100%',
                                        // marginTop: 10,
                                        // marginBottom: -10,
                                        fontSize:14,
                                        color: "#000000"
                                    }}
                                    keyboardType={'number-pad'}
                                    value={this.state.cpf}
                                    onChangeText={val =>
                                        this.setState({ cpf: val })
                                    }
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
                                    Senha atual:
                                </Text>
                                <Input
                                    secureTextEntry={this.state.secureTextEntry}
                                    style={{
                                        width: '80%',
                                        fontSize: 14,
                                        color: "#000000"
                                    }}
                                    onChangeText={val =>
                                        this.setState({ senhaAtual: val })
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
                                    <Text>Próximo</Text>
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
