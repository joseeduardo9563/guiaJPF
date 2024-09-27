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

export default class Confirma extends Component {

    constructor(props) {
        super(props);
        const matricula = this.props.navigation.getParam('matricula', '000');
        const cpf = this.props.navigation.getParam('cpf', '000');
        const data_nascimento = this.props.navigation.getParam('data_nascimento', '000');
        const nome = this.props.navigation.getParam('nome', '000');
        const codigo = this.props.navigation.getParam('codSeguranca','000');
        const email = this.props.navigation.getParam('email','000');
        const nome_mae = this.props.navigation.getParam('mae','000');

        console.log("matricula", matricula)
        console.log("cpf", cpf)
        console.log("data_nascimento", data_nascimento)
        console.log("nome", nome),
        console.log("nome_mae",nome_mae);

        this.state = {
            senhaGerada: Math.floor(Math.random() * 999999) ,
            nome: nome,
            cpf: cpf,
            data_nascimento: data_nascimento,
            matricula: matricula,
            email: email,
            confirmarEmail: '',
            disable: false,
            codigo: codigo,
            isloading: false,
            value: '',
            nome_mae: nome_mae,
        };

    }
    UNSAFE_componentWillMount() {
        this.sendCode();
        // console.log(this.state.codigo);
    }

    componentDidMount(){
        console.log("DidMount",this.state)
        this.forceUpdate();
        this.sendCode();
    }

    sendCode(){
        this.setState({ isloading: true });
        const cod = Math.floor(Math.random() * 999999);
        let obj = {
            oauthtoken: "kYXbW>c&qt*wVd))/H9pa#oHc<E<",
            email: this.state.email,
            // email: 'jose.eduardo@adaptweb.com.br',
            codigo: cod,
            matricula: this.state.matricula
        }

        console.log("obj",obj)

        fetch('http://awapp.net.br/extremamedic/MailerApi/sendSecureCodeExtrema.php', {
            method: 'POST',
            body: JSON.stringify(obj),
        })
        .then((response) => response.json())
        .then((final) => {
            console.log("final",final);
            this.setState({ isloading: false, codigo: cod });
        })
        .catch(err => {
            console.log(err);
        })
    }

    // contagem(){
    //     if(this.state.codigo != ''){
    //         setInterval(() => { 
    //             this.setState({codigo: ''});
    //             this.props.navigation.navigate('Login')
    //         }, 3000)
    //     }
    // }

    componentDidMount() { console.log("senhaGerada", this.state.senhaGerada) }

    onConfirm(){
        if (this.state.value != ''){
            if(this.state.value == this.state.codigo){
                console.log("Value: ",this.state.value);
                this.props.navigation.navigate('Senha',{
                    matricula: this.state.matricula,
                    nome: this.state.nome,
                    cpf: this.state.cpf,
                    datanascimento: this.state.data_nascimento,
                    email: this.state.email
                })
            } else {
                Platform.OS === "ios" ? 
                Toast.show({
                    text: 'Código inválido',
                    buttonText: 'Okay',
                    type: "danger",
                    duration: 3000
                }) : 
                ToastAndroid.show('Código inválido.',3000);
                console.log("Código Invalido");
            }
        } else {
            Platform.OS === "ios" ? 
            Toast.show({
                text: 'Informe o codigo para prosseguir.',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            }) : 
            ToastAndroid.show('Informe o código para prosseguir.',3000);
        }
    }




    render() {
        console.log("State: ",this.state);
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
                                <Text style={{ color: '#000000', textAlign: "center" }}>Enviando código de segurança...</Text>
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
                                    Um código de segurança foi enviado para o e-mail {this.state.email}
                            </Text>
                                <Text style={{
                                    marginTop: 15,
                                    fontSize: 15
                                }}>
                                    Digite o código enviado para prosseguir:
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
                                        Código de segurança:
                                </Text>
                                    <Input
                                        style={{
                                            width: '100%',
                                            marginTop: 10,
                                            marginBottom: -10,
                                            fontSize: 14,
                                            color: "#000000"
                                        }}
                                        keyboardType={'number-pad'}
                                        onChangeText={val =>
                                            this.setState({ value: val })
                                        }
                                    />
                                </Item>
                                {/* <Item
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    paddingTop: 10
                                }}
                            >
                                <Text style={{ marginBottom: -13 }}>
                                    Confirme seu e-mail:
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
                                        this.setState({ confirmarEmail: val })
                                    }
                                />
                            </Item> */}
                            <TouchableOpacity
                                onPress={() =>{
                                    Alert.alert(
                                        "Não recebi o código",
                                        "Escolha a opção desejada.",
                                        [
                                            {
                                                text: "Reenviar código",
                                                onPress: () =>{
                                                    let codigo = Math.random().toLocaleString().slice(-6);
                                                    this.setState({ codigo: codigo});
                                                    this.sendCode()
                                                },
                                                    
                                                style: "default"
                                            },
                                            {
                                                text: "Novo e-mail",
                                                onPress: () => {
                                                    this.props.navigation.navigate('PrimeiroAcesso_dois', {
                                                        matricula: this.state.matricula,
                                                        nome: this.state.nome,
                                                        cpf: this.state.cpf,
                                                        data_nascimento: this.state.nascimento,
                                                        codSeguranca: Math.random().toLocaleString().slice(-6),
                                                        value: 'not_found',
                                                        mae: this.state.nome_mae
                                                    });
                                                },
                                                style: "default"
                                            },
                                            {
                                                text: "Cancelar",
                                                // onPress: () =>
                                                //     this.sendCode(),
                                                style: "default"
                                            },
                                        ],
                                        { cancelable: false }
                                    )
                                    
                                }}
                            >
                                <Text style={{ color: ColorsScheme.ASENT_COLOR, fontSize: 15, marginTop: 20 }}> Não recebi o código </Text>
                            </TouchableOpacity>

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
                                        onPress={this.onConfirm.bind(this)}
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
