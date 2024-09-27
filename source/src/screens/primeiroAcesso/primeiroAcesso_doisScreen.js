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
    ToastAndroid
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
import ColorsScheme from '../../settings/ColorsScheme';
import { TextInputMask } from 'react-native-masked-text';
import Server from '../../settings/Server';
import { sha1 } from 'react-native-sha1';
import RenderIf from '../../components/RenderIf';

export default class PrimeiroAcesso_dois extends Component {

    constructor(props) {
        super(props);
        const matricula = this.props.navigation.getParam('matricula', '000');
        const cpf = this.props.navigation.getParam('cpf', '000');
        const data_nascimento = this.props.navigation.getParam('data_nascimento', '000');
        const nome = this.props.navigation.getParam('nome', '000');
        const codigo = this.props.navigation.getParam('codSeguranca','000');
        const opcao = this.props.navigation.getParam('value','000');
        const nome_mae = this.props.navigation.getParam('mae','000');
   

        this.state = {
            senhaGerada: Math.random().toString(36).slice(-10),
            nome: nome,
            cpf: cpf,
            data_nascimento: data_nascimento,
            matricula: matricula,
            email: '',
            disable: false,
            isloading: false,
            codigo: codigo,
            opcao: opcao,
            nome_mae: nome_mae,
            confirmMae: ''
        };

    }
    UNSAFE_componentWillMount() {

    }

    onUpdateEmail(){
        
        if(this.state.opcao === 'not_found'){
            let mae = this.state.nome_mae.split(" ");
            if(this.state.confirmMae != ''){
                if(this.state.confirmMae.toUpperCase() == mae[0]){
                    this.submitEmail();
                } else {
                }
            } else {
                Platform.OS === "ios" ? 
                Toast.show({
                    text: 'Preencha todos os campos.',
                    buttonText: 'Okay',
                    type: "danger",
                    duration: 3000
                }) : 
                ToastAndroid.show('Preencha todos os campos.',3000);
            }
        } else {
            this.submitEmail();
        }
    }

    submitEmail(){
        if(this.state.email != ''){
            const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            if(regex.test(this.state.email)){
                this.setState({ isloading: true })

                const url =
                    Server.API +
                    'primeiroAcesso/testeUpdateEmail.asp?email=' +
                    this.state.email +
                    '&matricula=' +
                    this.state.matricula;
                console.log(url);

                fetch(url)
                    .then((response) => response.json())
                    .then(responseJson => {
                        if (responseJson.success) {
                            if (this.state.opcao === 'not_found') {
                                this.setState({ isloading: false });
                                this.props.navigation.navigate('Confirma_notFound', {
                                    matricula: this.state.matricula,
                                    nome: this.state.nome,
                                    cpf: this.state.cpf,
                                    data_nascimento: this.state.data_nascimento,
                                    codSeguranca: this.state.codigo,
                                    email: this.state.email,
                                });
                            } else {
                                this.setState({ isloading: false });
                                this.props.navigation.navigate('Confirma', {
                                    matricula: this.state.matricula,
                                    nome: this.state.nome,
                                    cpf: this.state.cpf,
                                    data_nascimento: this.state.data_nascimento,
                                    codSeguranca: this.state.codigo,
                                    email: this.state.email,
                                });
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                Platform.OS === "ios" ?
                Toast.show({
                    text: 'Email inválido.',
                    buttonText: 'Okay',
                    type: "danger",
                    duration: 3000
                }) : 
                ToastAndroid.show('Email inválido.',3000);
            }
            // this.setState({ isloading: true })

            // const url =
            //     Server.API +
            //     'primeiroAcesso/testeUpdateEmail.asp?email=' +
            //     this.state.email +
            //     '&matricula=' +
            //     this.state.matricula;
            // console.log(url);

            // fetch(url)
            // .then((response) => response.json())
            // .then(responseJson => {
            //     if(responseJson.success){
            //         if(this.state.opcao === 'not_found'){
            //             this.setState({ isloading: false });
            //             this.props.navigation.navigate('Confirma_notFound', {
            //                 matricula: this.state.matricula,
            //                 nome: this.state.nome,
            //                 cpf: this.state.cpf,
            //                 data_nascimento: this.state.data_nascimento,
            //                 codSeguranca: this.state.codigo,
            //                 email: this.state.email,
            //             });
            //         } else {
            //             this.setState({ isloading: false });
            //             this.props.navigation.navigate('Confirma', {
            //                 matricula: this.state.matricula,
            //                 nome: this.state.nome,
            //                 cpf: this.state.cpf,
            //                 data_nascimento: this.state.data_nascimento,
            //                 codSeguranca: this.state.codigo,
            //                 email: this.state.email,
            //             });
            //         }
            //     }
            // })
            // .catch(err => {
            //     console.log(err);
            // })
        } else {
            Platform.OS === "ios" ?
            Toast.show({
                text: 'Informe um e-mail para prosseguir.',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            }) : 
            ToastAndroid.show('Informe um e-mail para prosseguir.',3000);
        }
    }


    componentDidMount() { console.log("senhaGerada", this.state.senhaGerada) }


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
                                <Text style={{ color: '#000000', textAlign: "center" }}>Cadastrando E-mail...</Text>
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
                                margin: 20
                            }}>
                                <Text style={{
                                    fontSize: 15
                                }}>
                                    {this.state.opcao === 'First' ? "Beneficiário não possui e-mail cadastrado." : "Informe um novo email para receber o codigo de segurança."}
                                </Text>
                                <Text style={{
                                    marginTop: 15,
                                    fontSize: 15
                                }}>
                                    Digite um endereço de e-mail para prosseguir:
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
                                    <Text style={{ marginBottom: -13 }}>
                                        E-mail: 
                                    </Text>
                                    <Input
                                        style={{
                                            width: '100%',
                                            marginTop: 10,
                                            marginBottom: -10,
                                            fontSize: 14,
                                            color: "#000000"
                                        }}
                                        autoCorrect={false}
                                        onChangeText={val =>
                                            this.setState({ email: val })
                                        }
                                    />
                                </Item>
                                
                                {this.state.opcao === 'not_found' && this.state.email != '' ? (
                                    <Item
                                        style={{
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            paddingTop: 10
                                        }}
                                    >
                                        <Text style={{ marginBottom: -13 }}>
                                            Primeiro nome da mae:
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
                                                this.setState({ confirmMae: val })
                                            }
                                        />
                                    </Item>
                                ) : (
                                    <Text></Text>
                                )}
                                
                            
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
                                        onPress={this.onUpdateEmail.bind(this)}
                                        // onPress={() => {
                                        //     this.props.navigation.navigate('Confirma');
                                        // }}
                                    >
                                        <Text>Prosseguir</Text>
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
