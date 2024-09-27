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
    ScrollView
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
    Grid,
    Col
} from 'native-base';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColorsScheme from '../../settings/ColorsScheme';
import { TextInputMask } from 'react-native-masked-text';
import Server from '../../settings/Server';
import { sha1 } from 'react-native-sha1';

export default class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            matricula: '',
            senha: '',
            isSecurity: true
        };
    }

    

    componentDidMount() {
        
    }

    getAceite(){
        const { matricula } = this.state;

        axios
        .get(`${Server.GET}getTermoAceite/${matricula}`)
        .then(res => {
            console.log(res);

            if(res.data && res.data.flag_termo == 1){
                this.props.navigation.navigate('Carteirinha')
            } else {
                this.props.navigation.navigate('Termos')
            }
        })
        .catch(err => {
            console.log(err);

            this.props.navigation.navigate('Carteirinha')
        })
    }

    onSubmit() {
        if (this.state.matricula != '' && this.state.senha != '') {
            Keyboard.dismiss();

            sha1(this.state.senha).then(hash => {
                console.log("Senha",hash);
                const url =
                    Server.API +
                    'login/autenticate.asp?matricula=' +
                    this.state.matricula +
                    '&senha=' +
                    hash;
                fetch(url)
                    .then(response => response.json())
                    .then(responseJson => {
                        console.log("login",responseJson);
                        if (responseJson.didFind) {
                            AsyncStorage.setItem(
                                '@usuario',
                                JSON.stringify(responseJson)
                            ).then(() => 
                                // this.getAceite()
                                this.props.navigation.navigate('Carteirinha')
                            );
                        } else {
                            Alert.alert(
                                "Matrícula ou senha inválidos.",
                                "Tente novamente e verifique se a matrícula e senha informada estão corretas.",
                                [
                                  
                                    {
                                        text: "Tentar novamente",                                                       
                                    }
                                ],
                                { cancelable: false }
                            )
                           
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        Alert.alert(
                            "Ops!.",
                            "Algo deu errado.",
                            [
                              
                                {
                                    text: "OK",                                                       
                                }
                            ],
                            { cancelable: false }
                        )
                    });
            });
        } else {
            Alert.alert(
                "Campo vazio.",
                "Prencha todos os campos e tente novamente.",
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
        console.log("Login",this.state);
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
                                style={{ width: 350.6, height: 274 }}
                                source={require('../../assets/JPFNew.png')}
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
                            AUTENTICAÇÃO
                        </H3>
                        <ScrollView>
                            <Form style={{ padding: 10 }}>
                                <Item
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'flex-start'
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
                                            color: "#000000"
                                        }}
                                        keyboardType={'number-pad'}
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
                                    <Text style={{ marginBottom: -13 }}>
                                        Senha:
                                    </Text>
                                    <Input
                                        secureTextEntry={this.state.isSecurity}
                                        style={{
                                            width: '80%',
                                            marginTop: 10,
                                            marginBottom: -10,
                                            color: "#000000"
                                        }}
                                        onChangeText={val =>
                                            this.setState({ senha: val })
                                        }
                                        autoCapitalize={"none"}
                                    />

                                    <FontAwesome5
                                        name={this.state.isSecurity ? 'eye' : 'eye-slash'}
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
                                        onPress={() => {
                                            this.state.isSecurity ? this.setState({ isSecurity: false }) :
                                            this.setState({ isSecurity: true });
                                        }}
                                    />
                                </Item>

                                <Button
                                    style={{

                                        margin: 10,
                                        backgroundColor:
                                            ColorsScheme.ASENT_COLOR
                                    }}
                                    block
                                    rounded
                                    // dark
                                    onPress={this.onSubmit.bind(this)}
                                >
                                    <Text>Entrar</Text>
                                </Button>

                                <Button
                                    style={{

                                        margin: 10,
                                        backgroundColor:
                                            ColorsScheme.ASENT_COLOR
                                    }}
                                    block
                                    rounded
                                // dark
                                // onPress={this.onSubmit.bind(this)}
                                    onPress={() =>
                                        this.props.navigation.navigate("PrimeiroAcesso")
                                    }
                                >
                                    <Text>Primeiro acesso</Text>
                                </Button>

                                <TouchableOpacity
                                    onPress={() =>
                                        this.props.navigation.navigate("RecuperarSenha")
                                    }>

                                    <Text style={{ color: ColorsScheme.ASENT_COLOR, fontSize: 15, marginTop: 20, alignSelf: "center" }}> Recuperar senha {"\n"} </Text>
                                </TouchableOpacity>

                                {/* <Grid>

                                <Col style={{ left: 12 }}>

                                    <TouchableOpacity
                                        onPress={() =>
                                            this.props.navigation.navigate("RecuperarSenha")
                                        }>

                                        <Text style={{ color: ColorsScheme.ASENT_COLOR, fontSize: 12, marginTop: 20 }}> Recuperar senha {"\n"} </Text>
                                    </TouchableOpacity>

                                </Col>
                                <Col style={{ left: 50 }}>

                                    <TouchableOpacity
                                        onPress={() =>
                                            this.props.navigation.navigate("PrimeiroAcesso")
                                        }>

                                        <Text style={{ color: ColorsScheme.ASENT_COLOR, fontSize: 12, marginTop: 20 }}> Primeiro acesso </Text>
                                    </TouchableOpacity>
                                    <Button
                                    style={{
                                    
                                        margin: 10,
                                        backgroundColor:
                                            ColorsScheme.ASENT_COLOR
                                    }}
                                    rounded
                                    dark
                                    onPress={this.onSubmit.bind(this)}
                                >
                                    <Text>Entrar</Text>
                                </Button>




                                </Col>

                        
                            </Grid> */}

                            </Form>  
                        </ScrollView>             
                    </Content>
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
