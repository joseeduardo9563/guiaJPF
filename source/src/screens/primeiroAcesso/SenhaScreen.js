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
    Alert,
    ToastAndroid,
    TextInput,
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
    Icon, 
    Spinner
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ColorsScheme from '../../settings/ColorsScheme';
import { TextInputMask } from 'react-native-masked-text';
import Server from '../../settings/Server';
import { sha1 } from 'react-native-sha1';
import RenderIf from '../../components/RenderIf';

export default class Senha extends Component {

    constructor(props) {
        super(props);
        const matricula = this.props.navigation.getParam('matricula', '000');
        const cpf = this.props.navigation.getParam('cpf', '000');
        const data_nascimento = this.props.navigation.getParam('datanascimento', '000');
        const nome = this.props.navigation.getParam('nome', '000');
        const email = this.props.navigation.getParam('nome','000');
        console.log("matricula", matricula)
        console.log("cpf", cpf)
        console.log("data_nascimento", data_nascimento)
        console.log("nome", nome)

        this.state = {
            senha: '',
            confirmSenha: '',
            nome: nome,
            cpf: cpf,
            data_nascimento: data_nascimento,
            matricula: matricula,
            email: email,
            disable: false,
            isloading: false,
            isSecurity: true,
            isSecurityConfirm: true
        };

    }
    UNSAFE_componentWillMount() {

    }



    componentDidMount() { console.log("senhaGerada", this.state.senhaGerada) }

    onSubmit() {
        if(this.state.senha != '' && this.state.confirmSenha != ''){
            if(this.state.senha.length >= 8) {
                // const regex = /\W|_/;
                const regex = /^(?=.*[@!#$%^&*()/\\])(?=.*[0-9])(?=.*[A-Z])[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/;
                console.log("regex",regex.test(this.state.senha));
                if(regex.test(this.state.senha)){
                    console.log("Acesso liberado")
                    if (this.state.senha === this.state.confirmSenha) {
                        this.setState({ isloading: true });
                        Keyboard.dismiss();

                        sha1(this.state.senha).then(hash => {
                            let key = '';
                            if (Platform.OS === "ios"){
                                key = hash;
                                key = key.toUpperCase();
                                console.log(key)
                            } else {
                                key = hash
                            }
                            const url =
                                Server.API +
                                'primeiroAcesso/testeInsert.asp?matricula=' +
                                this.state.matricula +
                                '&senha=' +
                                key
                            console.log(url);

                            fetch(url)
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    if (responseJson.success) {
                                        this.setState({ isloading: false });
                                        Platform.OS === "ios" ? 
                                            Toast.show({
                                                text: 'Cadastrado com sucesso',
                                                buttonText: 'Okay',
                                                type: "success",
                                                duration: 3000
                                            })
                                        : ToastAndroid.show('Cadastrado com sucesso', 3000);

                                        this.props.navigation.navigate('Login');
                                    }
                                })
                                .catch(err => {
                                    Toast.show({
                                        text: 'Erro ao cadastrar',
                                        buttonText: 'Okay',
                                        type: "success",
                                        duration: 3000
                                    })
                                    console.log(err);
                                    console.log(err.response);
                                })
                        })
                } else {
                    Platform.OS === "ios" ?
                        Toast.show({
                            text: 'Senhas não conferem',
                            buttonText: 'Okay',
                            type: "danger",
                            duration: 3000
                        }) :
                        ToastAndroid.show('Senhas não conferem.',3000);
                }
                } else {
                    Alert.alert(
                        "Senha inválida",
                        "Senha deve conter no mínimo 1 letra maiúscula, 1 caracter especial e números.",
                        [

                            {
                                text: "OK",
                            }
                        ],
                        { cancelable: false }
                    )
                }
                
            } else {
                Platform.OS === "ios" ? 
                Toast.show({
                    text: 'Informe uma senha com no mínimo 8 caracteres',
                    buttonText: 'Okay',
                    type: "danger",
                    duration: 3000
                }) : 
                ToastAndroid.show('Informe uma senha com no mínimo 8 caracteres.',3000);
            }
        } else {
            Platform.OS === "ios" ? 
            Toast.show({
                text: 'Campos vazios, preencha todos os campos',
                buttonText: 'Okay',
                type: "success",
                duration: 3000
            }) : 
            ToastAndroid.show('Campos vazios, preencha todos os campos.',3000);
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
                        // justifyContent: 'center',
                        // alignItems: 'center'
                    }}
                >
                    <RenderIf condition={!this.state.isloading} else={
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 105
                            }}
                        >
                            <View style={{ flexDirection: "column" }}>
                                {Platform.OS == "ios" ? <Spinner color={ColorsScheme.MAIN_COLOR} /> :
                                    <Spinner
                                        size={85}
                                        color={ColorsScheme.MAIN_COLOR}
                                        Container={{ Content: 'center' }}
                                    />

                                }
                                <Text style={{ color: '#000000', textAlign: "center" }}>Cadastrando...</Text>
                            </View>

                        </View>
                    }>                    
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
                                PRIMEIRO ACESSO
                            </H3>

                            <View style={{
                                margin: 15
                            }}>
                                <Text style={{
                                    fontSize: 15
                                }}>
                                    Cadastre uma senha de acesso ao aplicativo.
                                </Text>

                                <Text style={{
                                    marginTop: 10,
                                    fontSize: 12
                                }}>
                                    <Text style={{
                                        fontSize: 12,
                                        fontWeight: "bold"
                                    }}>
                                        OBSERVAÇÃO:
                                    </Text> 
                                    {" "}A senha deve conter no mínimo 8 caracteres composto por letras e números e deverá conter ao menos um caracter especial e uma letra maiúscula.
                                </Text>

                                <Text style={{
                                    marginTop: 10,
                                    fontSize: 12
                                }}>
                                    Exemplo: Teste@12.
                                </Text>
                            </View>
                            
                            <Form style={{ padding: 10 }}>
                                <Item
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        paddingTop: 10
                                    }}
                                >
                                    <Text style={Platform.OS === "ios" ? {
                                        marginBottom: 10
                                    } : { marginBottom: -13 }}
                                    >
                                        Senha: 
                                    </Text>
                                    
                                    <TextInput
                                        style={Platform.OS === "ios" ? {
                                            width: '100%',
                                            // height: '15%',                                            // marginTop: 10,
                                            marginBottom: -10,
                                            fontSize: 14,
                                            padding: 10,
                                            color: "#000000"
                                        } : {
                                            width: '100%',
                                            // height: '15%',                                            // marginTop: 10,
                                            marginBottom: -10,
                                            fontSize: 14,
                                            color: "#000000"
                                        }}
                                        secureTextEntry={this.state.isSecurity}
                                        autoCapitalize={"none"}
                                        onChangeText={val =>
                                            this.setState({ senha: val })
                                        }
                                        autoCorrect={false}
                                        
                                    />
                                    <FontAwesome5
                                        name={this.state.isSecurity ? 'eye' : 'eye-slash'}
                                        style={Platform.OS === "ios" ? {
                                            color: ColorsScheme.ASENT_COLOR,
                                            // paddingLeft: 5,
                                            fontSize: 25,
                                            marginTop: -20,
                                            position: "relative",
                                            left: 300
                                        } : {
                                            color: ColorsScheme.ASENT_COLOR,
                                            // paddingLeft: 5,
                                            fontSize: 25,
                                            marginTop: -20,
                                            position: "relative",
                                            left: "85%"
                                        }}
                                        onPress={() => {
                                            this.state.isSecurity ? this.setState({ isSecurity: false }) : 
                                                this.setState({ isSecurity: true });
                                        }}
                                    />                                   
                                </Item>

                                <Item
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        paddingTop: 10
                                    }}
                                >
                                    <Text style={Platform.OS === "ios" ? {
                                        marginBottom: 5
                                    } : { marginBottom: -13 }}>
                                        Confirme a Senha: 
                                    </Text>
                                    <TextInput
                                        style={Platform.OS === "ios" ? {
                                            width: '80%',
                                            marginTop: 10,
                                            marginBottom: -10,
                                            fontSize: 14,
                                            padding: 10,
                                            color: "#000000"
                                        } : {
                                            width: '80%',
                                            marginTop: 10,
                                            marginBottom: -10,
                                            fontSize: 14,
                                            color: "#000000"
                                        }}
                                        autoCapitalize={"none"}
                                        secureTextEntry={this.state.isSecurityConfirm}
                                        onChangeText={val =>
                                            this.setState({ confirmSenha: val })
                                        }
                                    />

                                    <FontAwesome5
                                        name={this.state.isSecurityConfirm ? 'eye' : 'eye-slash'}
                                        style={Platform.OS === "ios" ? {
                                            color: ColorsScheme.ASENT_COLOR,
                                            // paddingLeft: 5,
                                            fontSize: 25,
                                            marginTop: -20,
                                            position: "relative",
                                            left: 300
                                        } : {
                                            color: ColorsScheme.ASENT_COLOR,
                                            // paddingLeft: 5,
                                            fontSize: 25,
                                            marginTop: -20,
                                            position: "relative",
                                            left: "85%"
                                        }}
                                        onPress={() => {
                                            this.state.isSecurityConfirm ? this.setState({ isSecurityConfirm: false }) :
                                            this.setState({ isSecurityConfirm: true });
                                        }}
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
                                        // onPress={() => {
                                        //     this.props.navigation.navigate('Confirma');
                                        // }}
                                    >
                                        <Text>Cadastrar</Text>
                                    </Button>
                                </View>
                            </Form>

                        </Content>
                    </RenderIf>
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
