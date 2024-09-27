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

export default class ContratoScreen extends Component {
    constructor(props) {
        super(props);

        const data = this.props.navigation.getParam('data', []);

        this.state = {
            dataToBeSend: {},
            isLoading: false,
            //matricula: "54589",
            data: data,
            contratos: [],
            user: {}
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
        if (this.state.data.matricula != '') {
            this.setState({ isLoading: true });
            Keyboard.dismiss();

            const url =
                Server.API +
                'financeiro/getComponenteCadastral.asp?matricula=' +
                this.state.data.matricula;
            fetch(url)
                .then(response => response.json())
                .then(responseJson => {

                    console.log(responseJson);

                    this.setState({ contratos: responseJson, isLoading: false });


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
        console.log("ContratoScreen", this.state);
        console.log("User", this.state.user.matricula);
        return (
            <Root>
                <Container>
                    <Base navigation={this.props.navigation} >
                        <NavigationEvents
                            onWillFocus={payload => this.setState({ isLoading: true })}
                        />
                        <HeaderGoBack
                            navigation={this.props.navigation}
                            title={'Contratos'}
                        />

                        <Content style={{ marginBottom: 55, backgroundColor: "#FFFFFF", }}>
                            <RenderIf condition={!this.state.isLoading || this.state.contratos.length > 0} else={
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
                                <View style={{ backgroundColor: 'white', margin: 20, marginTop: 30 }}>

                                    <Card>

                                        {this.state.contratos.map((item, index) => {
                                            //this.setState({ isLoading: false })
                                            console.log("Entrou", item);
                                            console.log("Index", index);
                                            return (

                                                <CardItem
                                                    style={{ marginTop: 13 }}
                                                    bordered
                                                    key={index}
                                                >
                                                    <Body>

                                                        <Text style={{
                                                            fontSize: 16,
                                                            marginBottom: 10,
                                                            fontWeight: 'bold',
                                                            //alignSelf: ""
                                                        }}
                                                        >
                                                            {item.plano}
                                                        </Text>

                                                        <Text style={{ fontSize: 12, marginBottom: 10 }}>
                                                            CNS: {item.cns}
                                                        </Text>

                                                        <Text style={{ fontSize: 12, marginBottom: 10 }}>
                                                            ACOMODAÇÃO: {item.acomodacao}
                                                        </Text>

                                                        <Text style={{ fontSize: 12, marginBottom: 10 }}>
                                                            Cobertura: {item.cobertura}
                                                        </Text>

                                                        <Text style={{ fontSize: 12, marginBottom: 10 }}>
                                                            Data do contrato: {item.data_contrato}
                                                        </Text>

                                                    </Body>
                                                </CardItem>
                                            )
                                        })}
                                    </Card>

                                    <Button
                                        block
                                        style={{
                                            marginTop: 25,
                                            backgroundColor: ColorsScheme.MAIN_COLOR,
                                            margin: 7
                                        }}

                                        onPress={() => this.props.navigation.navigate('Contato')}
                                    >
                                        <Text style={{ fontWeight: "bold" }}>Dúvidas? Fale com a MedicGLOBAL</Text>
                                    </Button>



                                </View>
                            </RenderIf>
                        </Content>
                    </Base>
                </Container>
            </Root>


        );
    }
}