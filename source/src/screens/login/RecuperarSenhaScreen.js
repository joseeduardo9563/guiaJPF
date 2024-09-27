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
    Icon,
    Spinner
} from 'native-base';
import ColorsScheme from '../../settings/ColorsScheme';
import { TextInputMask } from 'react-native-masked-text';
import Server from '../../settings/Server';
import { sha1 } from 'react-native-sha1';
import RenderIf from '../../components/RenderIf';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class RecuperarSenha extends Component {
    constructor() {
        super();
        this.state = {
            cpf: '',
            data_nascimento: '',
            matricula: '',
            email: '',
            disable: false,
            novaSenha: Math.random().toString(36).slice(-10),
            emailAlternativo:'',
            nome_mae: '',
            isloading: false
        };
    }
    componentDidMount() {
       
    }

    recuperar() {
        console.log("recuperar",this.state);
        this.setState({ disable: true })
        if (this.state.cpf != '' && this.state.data_nascimento != '' && 
            this.state.matricula != '' && this.state.nome_mae != '') {
            
            
            
            Keyboard.dismiss();
            const urlmae =
            Server.API +
            'login/testeRecuperar.asp?matricula=' +
            this.state.matricula +
            '&cpf=' +
            this.state.cpf + 
            '&datanascimento=' +
            this.state.data_nascimento 

            fetch(urlmae)
            .then(response => response.json())
            .then(responseJson => {
                let mae = responseJson.nome_mae.split(" ");
                this.setState({ email: responseJson.email });

                if(this.state.nome_mae.toUpperCase() == mae[0]){
                    this.setState({ isloading: true });
                    let res={
                        oauthtoken: "kYXbW>c&qt*wVd))/H9pa#oHc<E<",
                        email: responseJson.email,
                        // email: 'jose.eduardo@adaptweb.com.br',
                        senha: this.state.novaSenha,
                        // emailAlternativo: this.state.emailAlternativo,
                        matricula: this.state.matricula
                    }
            
                    fetch('http://awapp.net.br/extremamedic/MailerApi/sendMailrecoveryExtrema.php', {
                        method: 'POST',
                        body: JSON.stringify(res),
                    })
                        .then((response) => response.json())
                        .then((final) => {
                            console.log(final)
                            if (final.status) {
                                sha1(this.state.novaSenha).then(hash => {
                                    let key = '';

                                    if (Platform.OS === "ios") {
                                        key = hash.toUpperCase();
                                    } else {
                                        key = hash;
                                    }
                                    const url =
                                    Server.API +
                                    'login/testeUpdateRecuperaSenha.asp?matricula=' +
                                    this.state.matricula +
                                    '&senha=' +
                                    key
                                    console.log("hash: ",key);
                                fetch(url)
                                    .then(responseJson => {
                                        this.setState({ isloading: false })
                                        console.log("ok",responseJson)
                                        Alert.alert(
                                            "Verifique seu e-mail",
                                            "Sua senha foi encaminhada para o e-mail " + this.state.email + ".",
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
                                    })  .catch(err => {
                                        this.setState({ disable: false, isloading: false })
                                        console.log(err)
                    
                                    
                                    })
                    
                                })
    
                            } else {
                                this.setState({ disable: false, isloading: false })
    
                                Alert.alert(
                                    "Endereço de e-mail inválido",
                                    "Verifique seu e-mail e tente novamente.",
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
                            this.setState({ disable: false, isloading: false })
                            console.log(err)
    
                            Alert.alert(
                                "Ops!",
                                "Algo deu errado no envio do e-mail.",
                                [
    
                                    {
                                        text: "OK",
                                    }
                                ],
                                { cancelable: false }
                            )
                        })

                    
                } else {
                    this.setState({ isloading: false });
                    Alert.alert(
                        "Nome da mãe incorreto!",
                        "Nome da mãe não confere com o cadastrado.",
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
                this.setState({ isloading: false });
                console.log(err)
                Alert.alert(
                    "Aviso",
                    "Beneficiário não possui cadastro de acesso ao aplicativo, deseja se cadastrar?",
                    [

                        {
                            text: "Sim",
                            onPress: () =>
                                this.props.navigation.navigate('PrimeiroAcesso', {
                                    cpf: this.state.cpf,
                                    data_nascimento: this.state.data_nascimento,
                                    matricula: this.state.matricula,
                                    option: 'recuperar'
                                }),
                            style: "default"
                        },
                        {
                            text: "Não",
                            onPress: () => 
                                this.props.navigation.navigate('Login'),
                            style: "default"
                        }
                    ],
                    { cancelable: false }
                )
            })

         } else {
            Alert.alert(
                "Campo vazio!",
                "Preecha todos os campos e tente novamente.",
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
                        // justifyContent: 'center',
                        // alignItems: 'center'
                    }}
                >
                    <RenderIf condition={!this.state.isloading} else ={
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
                                <Text style={{ color: '#000000', textAlign: "center" }}>Enviando senha por email...</Text>
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
                                RECUPERAR SENHA
                            </H3>
                            <Form style={{ padding: 10 }}>
                                <Item
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    <Text style={Platform.OS == 'ios' ? {marginBottom: 10} : { marginBottom: -13 }}>
                                        CPF :
                                    </Text>
                                    <TextInputMask
                                        type={"cpf"}
                                        ref="CPFMY"
                                        style={Platform.OS == 'ios'? {
                                            width: '100%',
                                            marginTop: 2,
                                            marginBottom: 4,
                                            fontSize: 14,
                                            color: "#000000"
                                        } : {
                                            width: '100%',
                                            marginTop: 10,
                                            marginBottom: -10,
                                            fontSize: 14,
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
                                    <Text style={Platform.OS == 'ios' ? {marginBottom:10} : { marginBottom: -13 }}>
                                        Data de nascimento:
                                    </Text>
                                    <TextInputMask
                                        type={"datetime"}
                                        options={{
                                            format: "DD/MM/YYYY"
                                        }}
                                        style={Platform.OS == 'ios'? {
                                            width: '100%',
                                            marginTop: 2,
                                            marginBottom: 4,
                                            fontSize: 14,
                                            color: "#000000"
                                        } : {
                                            width: '100%',
                                            marginTop: 10,
                                            marginBottom: -10,
                                            fontSize: 14,
                                            color: "#000000"
                                        }}
                                        value={this.state.data_nascimento}
                                        onChangeText={val =>
                                            this.setState({ data_nascimento: val })
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
                                    <Text style={Platform.OS == 'ios' ? {marginBottom: -14} : { marginBottom: -13 }}>
                                        Matrícula:
                                    </Text>
                                    <Input
                                        keyboardType={'number-pad'}
                                        style={{
                                            width: '100%',
                                            marginTop: 10,
                                            marginBottom: -10,
                                            fontSize: 14,
                                            color: "#000000"
                                        }}
                                        onChangeText={val =>
                                            this.setState({ matricula: val })
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
                                    <Text style={Platform.OS == 'ios' ? {marginBottom: -14} : { marginBottom: -13 }}>
                                        Primeiro nome da mãe:
                                    </Text>
                                    <Input
                                        style={{
                                            width: '100%',
                                            marginTop: 10,
                                            marginBottom: -10,
                                            fontSize: 14,
                                            color: "#000000"
                                        }}
                                        onChangeText={val =>
                                            this.setState({ nome_mae: val })
                                        }
                                    />
                                </Item>


                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    <Button
                                        style={{
                                            margin: 10,
                                            backgroundColor:
                                                ColorsScheme.ASENT_COLOR
                                        }}
                                        rounded
                                        dark
                                        onPress={this.recuperar.bind(this)}
                                    >
                                        <Text>Enviar</Text>
                                    </Button>
                                </View>
                            </Form>

                        </Content>
                    </RenderIf>
                </ImageBackground>

                <Button
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
