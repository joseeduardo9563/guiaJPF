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
    Platform
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
//import ColorsScheme from '../../settings/ColorsScheme';
import Base from '../../components/Base';
import HeaderGoBack from '../../components/HeaderGoBack';
//import RenderIf from '../../components/RenderIf';
//import Server from '../../settings/Server';
import { NavigationEvents } from 'react-navigation';
//import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class UtilizacoesScreen extends Component {
    constructor(props) {
        super(props);

        const dados = this.props.navigation.getParam('dados', []);
        const dataI = this.props.navigation.getParam('dataInicio', "");
        const dataF = this.props.navigation.getParam('dataFim', "");

        this.state = {
            DI: dataI,
            DF: dataF,
            dataToBeSend: {},
            isLoading: false,
            //matricula: "21036",
            data: [],
            dados: dados
        };
    }

    UNSAFE_componentWillMount() {
        this.doloading();
    }

    componentDidMount() {
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
        if (this.state.matricula != '') {
            this.setState({ isLoading: true });
            Keyboard.dismiss();

            const url =
                Server.API +
                'financeiro/getUtilizacaoServicos.asp?matricula=' +
                this.state.dados.matricula + "&datainicial=" + this.state.DI +
                "&datafinal=" + this.state.DF;
            console.log(url);

            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    console.log("Entrou")
                    console.log(responseJson);

                    this.setState({ data: responseJson, isLoading: false });






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




    render() {
        console.log("utilizacoes", this.state);
        return (
            <Root>
                <Container>
                    <Base navigation={this.props.navigation} >
                        <NavigationEvents
                            onWillFocus={payload => this.setState({ isLoading: true })}
                        />
                        <HeaderGoBack
                            navigation={this.props.navigation}
                            title={'Utilizações'}
                        />

                        <Content style={{ marginBottom: 55 }}>

                            <RenderIf condition={!this.state.isLoading} else={
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
                            }>
                                <View style={{ margin: 20, marginTop: 5 }}>
                                    {this.state.data.length > 0 ? (
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                marginTop: 25,
                                                marginBottom: 23
                                            }}
                                        >Relatório de utilização por período</Text>
                                    ) :
                                        <Text></Text>
                                    }
                                    {this.state.data.length > 0 ? (
                                        <Card>

                                            {

                                                this.state.data.map((item, index) => {

                                                    return (

                                                        <CardItem
                                                            style={{ marginBottom: 0 }}
                                                            bordered
                                                            key={index}
                                                        >
                                                            <Body>

                                                                <Text style={{ fontSize: 12 }}>
                                                                    {item.data_execucao}
                                                                </Text>

                                                                <Text style={{
                                                                    fontSize: 14,
                                                                    //marginBottom: 10,
                                                                    fontWeight: 'bold',
                                                                    //alignSelf: "center"
                                                                }}>
                                                                    {item.procedimento}
                                                                </Text>

                                                                <Text
                                                                    style={{
                                                                        fontSize: 12,
                                                                        //fontWeight: 'bold',
                                                                        //marginBottom: 15,
                                                                        //alignSelf: "center"
                                                                    }}
                                                                >
                                                                    {item.nome_beneficiario}
                                                                </Text>



                                                                <Text style={{ fontSize: 12 }}>
                                                                    Matrícula: {item.matricula}
                                                                </Text>

                                                                <Text style={{ fontSize: 12 }}>
                                                                    {item.nome_fantasia}
                                                                </Text>

                                                                <Text style={{ fontSize: 12 }}>
                                                                    Guia: {item.numero_guia}
                                                                </Text>

                                                            </Body>
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


        );
    }
}