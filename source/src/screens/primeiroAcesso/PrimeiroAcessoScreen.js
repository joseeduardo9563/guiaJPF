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
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColorsScheme from '../../settings/ColorsScheme';
import { TextInputMask } from 'react-native-masked-text';
import Server from '../../settings/Server';
import RenderIf from '../../components/RenderIf';
import { sha1 } from 'react-native-sha1';

export default class PrimeiroAcesso extends Component {
    
    constructor(props) {
        super(props);

        const matricula = this.props.navigation.getParam('matricula', '000');
        const cpf = this.props.navigation.getParam('cpf', '000');
        const data_nascimento = this.props.navigation.getParam('data_nascimento', '000');
        // const mae = this.props.navigation.getParam('nome_mae', '000');
        const option = this.props.navigation.getParam('option','000');

        this.state = {
            cpf: '',
            cpfRec: cpf,
            data_nascimento: '',
            data_nascimentoRec: data_nascimento,
            matricula: '',
            matriculaRec: matricula,
            mae: '',
            option: option,
            isloading: false
        };
    }
    componentDidMount() { }

    onSubmit() {
        console.log("Submit");
        if (this.state.cpf != '' && this.state.data_nascimento != '' && this.state.matricula != '' && this.state.mae != '') {
            this.setState({ isloading: true });

            const url =
            Server.API +
            'primeiroAcesso/testeFirst.asp?matricula=' +
            this.state.matricula;

            console.log("teste",url)
            fetch(url)

                .then(response => response.json())
                .then(responseJson => {
                    this.setState({ isloading: false });
                    if (responseJson.isBenefNet == true) { // se beneficiario não tiver matricula no banco cad_benef_net = Segundo Passo
                        Alert.alert(
                            "Matrícula já cadastrada",
                            "Caso você seja este beneficiário utilize a opção Recuperar Senha ou entre em contato com a operadora.",
                            [

                                {
                                    text: "OK",
                                }
                            ],
                            { cancelable: false }
                        )


                    } else if (responseJson.isBenef == false) {
                        Alert.alert(
                            "Beneficiário não encontrado",
                            "Verifique os dados informados ou procure a operadora para maiores informações.",
                            [

                                {
                                    text: "OK",
                                }
                            ],
                            { cancelable: false }
                        )
                    } else {
                        let cpf = this.state.cpf.replace(".","");
                        cpf = cpf.replace(".","");
                        cpf = cpf.replace("-","");                        
                        console.log("cpf",cpf);
                        if(cpf == responseJson.cpf){
                            if(this.state.data_nascimento == responseJson.nascimento){
                                if(this.state.matricula == responseJson.matricula){
                                    let mae = responseJson.nome_mae.split(" ");
                                    console.log("mae", mae);
                                    console.log("toUpper", this.state.mae.toUpperCase());
                                    let nomeMae = this.state.mae.replace(" ", "");
                                    if (nomeMae.toUpperCase() == mae[0]) {
                                        let codigo = 0;
                                        Platform.OS === "ios" ? codigo = Math.floor(Math.random() * 999999) : 
                                        codigo = Math.random().toLocaleString().slice(-6);
                                        if (responseJson.email != '') {
                                            // console.log("Codigo",codigo)
                                            this.props.navigation.navigate('Confirma', {
                                                matricula: responseJson.matricula,
                                                nome: responseJson.nome,
                                                cpf: responseJson.cpf,
                                                data_nascimento: responseJson.nascimento,
                                                codSeguranca: codigo,
                                                email: responseJson.email,
                                                mae: responseJson.nome_mae
                                            });
                                        } else {
                                            this.props.navigation.navigate('PrimeiroAcesso_dois', {
                                                matricula: responseJson.matricula,
                                                nome: responseJson.nome,
                                                cpf: responseJson.cpf,
                                                data_nascimento: responseJson.nascimento,
                                                codSeguranca: codigo,
                                                value: 'First',
                                                mae: responseJson.mae
                                            });
                                        }
                                    } else {
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
                                } else {
                                    Alert.alert(
                                        "Matrícula inválida!",
                                        "Matrícula não confere com a cadastrada.",
                                        [
        
                                            {
                                                text: "OK",
                                            }
                                        ],
                                        { cancelable: false }
                                    )
                                }
                            } else {
                                Alert.alert(
                                    "Data de nascimento inválida!",
                                    "Data de nascimento não confere com a cadastrada.",
                                    [
    
                                        {
                                            text: "OK",
                                        }
                                    ],
                                    { cancelable: false }
                                )
                            }
                        } else {
                            Alert.alert(
                                "CPF ou matrícula incorreta!",
                                "Verifique os dados e tente novamente.",
                                [

                                    {
                                        text: "OK",
                                    }
                                ],
                                { cancelable: false }
                            )
                        }
                        // let mae = responseJson.nome_mae.split(" ");
                        // console.log("mae",mae);
                        // console.log("toUpper", this.state.mae.toUpperCase());
                        // if(this.state.mae.toUpperCase() == mae[0]){
                        //     let codigo = Math.random().toFixed(36).slice(-6);
                        //     if(responseJson.email != ''){
                        //         // console.log("Codigo",codigo)
                        //         this.props.navigation.navigate('Confirma', {
                        //             matricula: responseJson.matricula,
                        //             nome: responseJson.nome,
                        //             cpf: responseJson.cpf,
                        //             data_nascimento: responseJson.nascimento,
                        //             codSeguranca: codigo,
                        //             email: responseJson.email,
                        //             mae: responseJson.nome_mae
                        //         });
                        //     } else {
                        //         this.props.navigation.navigate('PrimeiroAcesso_dois', {
                        //             matricula: responseJson.matricula,
                        //             nome: responseJson.nome,
                        //             cpf: responseJson.cpf,
                        //             data_nascimento: responseJson.nascimento,
                        //             codSeguranca: codigo,
                        //             value: 'First',
                        //             mae: responseJson.mae
                        //         });
                        //     }
                        // } else {
                        //     Alert.alert(
                        //         "Nome da mãe incorreto!",
                        //         "Nome da mãe não confere com o cadastrado.",
                        //         [
    
                        //             {
                        //                 text: "OK",
                        //             }
                        //         ],
                        //         { cancelable: false }
                        //     )
                        // }
                    }
                })
                .catch(err => {
                    this.setState({ isloading: false });
                    console.log("Interno",err);
                    console.log("interno", err.response);
                    Alert.alert(
                        "Erro interno",
                        "Verifique sua conexão com a internet e tente novamente.",
                        [
                            {
                                text: "OK",
                            }
                        ],
                        { cancelable: false }
                    )
                });
        } else {
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

    onSubmitRec(){
        console.log("Submit");
        if (this.state.cpfRec != '' && this.state.data_nascimentoRec != '' && this.state.matriculaRec != '' && this.state.mae != '') {
            this.setState({ isloading: true });
            //Keyboard.dismiss();

            // const url =
            //     Server.API +
            //     'primeiroAcesso/first-acess.asp?matricula=' +
            //     this.state.matricula +
            //     '&cpf=' +
            //     this.state.cpf +
            //     '&datanascimento=' +
            //     this.state.data_nascimento;

            const url =
            Server.API +
            'primeiroAcesso/testeFirst.asp?matricula=' +
            this.state.matriculaRec;

            console.log(url)
            fetch(url)

                .then(response => response.json())
                .then(responseJson => {
                    this.setState({ isloading: false });
                    console.log("responseJson: ",responseJson);
                    console.log("stateResponse",this.state);
                    if (responseJson.isBenefNet == true) { // se beneficiario não tiver matricula no banco cad_benef_net = Segundo Passo
                        Alert.alert(
                            "Matrícula já cadastrada",
                            "Caso você seja este beneficiário tente a opção Recuperar Senha ou entre em contato com a operadora.",
                            [

                                {
                                    text: "OK",
                                }
                            ],
                            { cancelable: false }
                        )


                    } else if (responseJson.isBenef == false) {
                        Alert.alert(
                            "Beneficiário não encontrado",
                            "Os dados informados não se encontra cadastrado em nosso sistema. Verifique os dados informados ou entre em contato com a operadora.",
                            [

                                {
                                    text: "OK",
                                }
                            ],
                            { cancelable: false }
                        )
                    } else {
                        let cpf = this.state.cpfRec.replace(".","");
                        cpf = cpf.replace(".","");
                        cpf = cpf.replace("-","");                        
                        console.log("cpf",cpf);
                        if(cpf == responseJson.cpf){
                            if(this.state.data_nascimentoRec == responseJson.nascimento){
                                if(this.state.matriculaRec == responseJson.matricula){
                                    let mae = responseJson.nome_mae.split(" ");
                                    console.log("mae", mae);
                                    console.log("toUpper", this.state.mae.toUpperCase());
                                    let nomeMae = this.state.mae.replace(" ", "");
                                    if (nomeMae.toUpperCase() == mae[0]) {
                                        let codigo = Math.random().toLocaleString().slice(-6);
                                        if (responseJson.email != '') {
                                            // console.log("Codigo",codigo)
                                            this.props.navigation.navigate('Confirma', {
                                                matricula: responseJson.matricula,
                                                nome: responseJson.nome,
                                                cpf: responseJson.cpf,
                                                data_nascimento: responseJson.nascimento,
                                                codSeguranca: codigo,
                                                email: responseJson.email,
                                                mae: responseJson.nome_mae
                                            });
                                        } else {
                                            this.props.navigation.navigate('PrimeiroAcesso_dois', {
                                                matricula: responseJson.matricula,
                                                nome: responseJson.nome,
                                                cpf: responseJson.cpf,
                                                data_nascimento: responseJson.nascimento,
                                                codSeguranca: codigo,
                                                value: 'First',
                                                mae: responseJson.mae
                                            });
                                        }
                                    } else {
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
                                } else {
                                    Alert.alert(
                                        "Matrícula inválida!",
                                        "Matrícula não confere com a cadastrada.",
                                        [
        
                                            {
                                                text: "OK",
                                            }
                                        ],
                                        { cancelable: false }
                                    )
                                }
                            } else {
                                Alert.alert(
                                    "Data de nascimento inválida!",
                                    "Data de nascimento não confere com a cadastrada.",
                                    [
    
                                        {
                                            text: "OK",
                                        }
                                    ],
                                    { cancelable: false }
                                )
                            }
                        } else {
                            Alert.alert(
                                "CPF ou matrícula incorreta!",
                                "Verifique os dados e tente novamente.",
                                [

                                    {
                                        text: "OK",
                                    }
                                ],
                                { cancelable: false }
                            )
                        }
                    }
                })
                .catch(err => {
                    this.setState({ isloading: false });
                    console.log("Eis me aqui",err);
                    Alert.alert(
                        "Erro interno",
                        "Verifique sua conexão com a internet e tente novamente.",
                        [

                            {
                                text: "OK",
                            }
                        ],
                        { cancelable: false }
                    )
                });
        } else {
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
        console.log("firstAccess",this.state);
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
                                    <Text style={{ color: '#000000', textAlign: "center" }}>Carregando...</Text>
                                </View>

                            </View>
                        }>
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
                            <Form style={{ padding: 10 }}>
                                <Item
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Text style={{ marginBottom: -13 }}>
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
                                        value={this.state.option == 'recuperar' ? this.state.matriculaRec : this.state.matricula}
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
                                    <Text style={ Platform.OS == 'ios' ? {marginBottom: 8} : { marginBottom: -13 }}>
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
                                        value={this.state.option == 'recuperar'? this.state.cpfRec : this.state.cpf}
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
                                    <Text style={ Platform.OS == 'ios' ? {marginBottom: 8} : { marginBottom: -13 }}>
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
                                        value={this.state.option == 'recuperar'? this.state.data_nascimentoRec : this.state.data_nascimento}
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
                                    <Text style={{ marginBottom: -13 }}>
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
                                            this.setState({ mae: val })
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
                                        onPress={this.state.option == 'recuperar' ? this.onSubmitRec.bind(this) : this.onSubmit.bind(this)}
                                    >
                                        <Text>Prosseguir</Text>
                                    </Button>
                                </View>
                            </Form>
                        </RenderIf>
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
