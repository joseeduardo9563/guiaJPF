import React, { Component } from "react";
import {
    StyleSheet,
    StatusBar,
    View,
    Clipboard,
    FlatList,
    Linking,
    Keyboard,
    Alert,
    Platform,
    TouchableOpacity,
    RefreshControl,
    ToastAndroid
} from "react-native";
import {
    Container,
    Header,
    Left,
    Body,
    Title,
    Right,
    Text,
    Card,
    CardItem,
    Toast,
    Grid,
    Col,
    Content,
    Badge,
    Row,
    Spinner,
    Button,
    Root
} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColorsScheme from "../../settings/ColorsScheme";
import Server from "../../settings/Server";
import moment from "moment/min/moment-with-locales";
import RenderIf from "../../components/RenderIf";
import { TextMask } from "react-native-masked-text";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Base from '../../components/Base';
import HeaderGoBack from '../../components/HeaderGoBack';
import { NavigationEvents } from 'react-navigation';

export default class FinanceiroScreen extends Component {
    constructor(props) {
        super(props);

        const data = this.props.navigation.getParam('data', []);

        this.state = {
            dataToBeSend: {},
            isLoading: false,
            //matricula: "54589",
            data: data,
            boletos: [],
            user: {},
            dataHoje: ""
        };

        // this.setState({data: data});
    }

    UNSAFE_componentWillMount() {
        this.doloading();
        this._doloading();
    }

    componentDidMount() {
        this._doloading();
        this.doloading();

        setTimeout(() => { // tempo  que o spinner irá rodar enquanto o componente é montado
            this.setState({ isloading: true });
        }, 10000)
    }

    _doloading() {
        AsyncStorage.getItem('@usuario')
            .then(val => {
                this.setState({
                    user: JSON.parse(val)
                });
                //this.getReceitas();
            })
            .catch(err => {
                console.log(err);
            });
    }

    doloading() {
        let D = moment().format("DD/MM/YYYY");
        this.setState({ dataHoje: D });
        if (this.state.data.matricula != '') {
            this.setState({ isLoading: true });
            Keyboard.dismiss();

            const url =
                Server.API +
                'financeiro/getBoletoBancario.asp?matricula=' +
                this.state.data.matricula;
            console.log(url);
            fetch(url)
                .then(response => response.json())
                .then(responseJson => {

                    console.log(responseJson);

                    this.setState({ boletos: responseJson, isLoading: false });


                })
                .catch(err => {
                    this.setState({ isLoading: false });
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
        }
    }

    writeToClipboard = async (item) => {
        //To copy the text to clipboard
        await Clipboard.setString(item);
        alert('Copied to Clipboard!');
      };

    render() {
        moment.locale('pt-br');
        console.log("FinanceiroScreen", this.state)
        return (
            <Root>
                <Container>
                    <Base navigation={this.props.navigation}>
                        <NavigationEvents
                            onWillFocus={payload => { this.setState({ isLoading: true }) }}
                        />
                        <HeaderGoBack
                            navigation={this.props.navigation}
                            title={'Segunda via'}
                        />
                        <Content style={{ marginBottom: 55 }}>
                            <RenderIf condition={!this.state.isLoading || this.state.boletos.length > 0}
                                else={
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
                                            <Text style={{ color: '#000000', textAlign: "center" }}>Buscando...</Text>
                                        </View>

                                    </View>
                                }
                            >
                                <View style={{ backgroundColor: 'white', margin: 20, marginTop: 30 }}>

                                    {this.state.boletos.length != 0 ? (
                                        <Card>
                                            {this.state.boletos.map((item, index) => {
                                                let mesReferencia = moment(item.mes_referencia).format('MMMM/YYYY');
                                                return (
                                                    <CardItem
                                                        style={{ marginTop: 13 }}
                                                        bordered
                                                        key={index}
                                                    >
                                                        <Body>
                                                            <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>{mesReferencia}</Text>
                                                            <Text
                                                                style={{
                                                                    fontSize: 16,
                                                                    marginBottom: 10,
                                                                    //fontWeight: 'bold',
                                                                    //alignSelf: ""
                                                                }}
                                                            >
                                                                R$ {item.valor_duplicata}
                                                            </Text>

                                                            <Text style={{ fontSize: 12, marginBottom: 10 }}>
                                                                Vencimento: {item.vencimento_duplicata}
                                                            </Text>

                                                            <TouchableOpacity
                                                                style={{
                                                                    alignSelf: "center"
                                                                }}
                                                                onPress={
                                                                        () => {
                                                                    Clipboard.setString(item.linha_digitavel);
                                                                    // Toast.show({
                                                                    //     text: "Copiado com sucesso",
                                                                    //     buttonText: "Ok",
                                                                    //     duration: 3000
                                                                    // });
                                                                    Platform.OS === "ios" ? 
                                                                        Toast.show({
                                                                            text: 'Cadastrado com sucesso',
                                                                            buttonText: 'Okay',
                                                                            type: "success",
                                                                            duration: 3000
                                                                        }) : 
                                                                        ToastAndroid.show('Copiado com sucesso',3000);
                                                                }}
                                                            >
                                                                <Text style={{ color: "#A9A9A9" }}>Copiar linha digitável</Text>
                                                                {/* Clipboard copir linha, a fazer */}
                                                            </TouchableOpacity>
                                                        </Body>
                                                        {this.state.dataHoje < item.vencimento_duplicata ?
                                                            <Badge style={{ backgroundColor: '#f2d600', position: "relative", marginRight: -25 }}>
                                                                <Text style={{ color: '#000000' }}>A vencer</Text>
                                                                {/* Aguardando campo para verificação */}
                                                            </Badge> :
                                                            <Badge style={{ backgroundColor: '#ec1a07', position: "relative", marginRight: -25 }}>
                                                                <Text style={{ color: '#FFFFFF' }}>Vencido</Text>
                                                                {/* Aguardando campo para verificação */}
                                                            </Badge>
                                                        }
                                                        <TouchableOpacity
                                                            onPress={
                                                                () => {
                                                                    Clipboard.setString(item.linha_digitavel);
                                                                    Platform.OS === "ios" ? 
                                                                        Toast.show({
                                                                            text: 'Copiado com sucesso',
                                                                            buttonText: 'Okay',
                                                                            type: "success",
                                                                            duration: 3000
                                                                        }) : 
                                                                        ToastAndroid.show('Copiado com sucesso',3000);
                                                                }
                                                            }
                                                        >
                                                            <FontAwesome5 name={"copy"} style={{ fontSize: 20 }} />
                                                        </TouchableOpacity>

                                                    </CardItem>
                                                )
                                            })}
                                        </Card>
                                    ) :
                                        <View
                                            style={[
                                                {
                                                    marginTop: 30,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                },

                                                Platform.OS == 'ios'
                                                    ? {}
                                                    : {
                                                        flex: 1
                                                    }
                                            ]}
                                        >
                                            <FontAwesome5 name="exclamation-circle" size={50} color="#a0a0a0" />
                                            <Text style={{ textAlign: 'center', marginTop: 10, color: '#a0a0a0' }}>
                                                Não há informação a ser exibida.
                                            </Text>
                                        </View>
                                    }

                                </View>
                            </RenderIf>
                        </Content>
                    </Base>
                </Container>
            </Root>
        )
    }
}