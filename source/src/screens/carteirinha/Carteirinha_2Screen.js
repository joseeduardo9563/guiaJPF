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
    ImageBackground,
    ScrollView,
    Animated,
    Dimensions,
    Text
} from "react-native";
import {
    Container,
    Header,
    Left,
    Body,
    Title,
    Right,
    //Text,
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
import Swiper from 'react-native-swiper';
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



export default class CarteirinhaScreen extends Component {
    constructor(props) {
        super(props);

        const contratos = this.props.navigation.getParam('contratos', []);

        this.state = {
            dataToBeSend: {},
            isLoading: false,
            //matricula: "54589",
            // data: data,
            contratos: contratos,
            user: {},
            imgcarteirinha: ""
        };

        // this.setState({data: data});
    }

    UNSAFE_componentWillMount() {
        this.setState({imgcarteirinha: '../../assets/extremamedic_carteirinhafrente.png'})
        this._doloading();
    }

    componentDidMount() {
        this._doloading();
        // this.doloading();
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

    // doloading() {
    //     if (this.state.data.matricula != '') {
    //         this.setState({ isLoading: true });
    //         Keyboard.dismiss();

    //         const url =
    //             Server.API +
    //             'financeiro/getComponenteCadastral.asp?matricula=' +
    //             this.state.data.matricula;
    //         fetch(url)
    //             .then(response => response.json())
    //             .then(responseJson => {

    //                 console.log(responseJson);

    //                 this.setState({ contratos: responseJson, isLoading: false });


    //             })
    //             .catch(err => {
    //                 this.setState({ isLoading: false });
    //                 console.log(err);
    //                 Alert.alert(
    //                     "Ops!.",
    //                     "Algo deu errado.",
    //                     [

    //                         {
    //                             text: "OK",
    //                         }
    //                     ],
    //                     { cancelable: false }
    //                 )
    //             });
    //     }
    // }

    render() {
        // let item = this.state.contratos[0];
        // console.log("item", item);
        return (
            <Root>
                <HeaderGoBack
                    navigation={this.props.navigation}
                    title={'Cartão Virtual'}
                />

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
                            {Platform.OS == "ios" ? <Spinner color={ColorsScheme.MAIN_COLOR}/> :
                                <Spinner
                                    size={85}
                                    color={ColorsScheme.MAIN_COLOR}
                                    Container={{ Content: 'center' }}
                                />

                            }
                            {/* <Text style={{ color: '#000000', textAlign: "center" }}>Buscando...</Text> */}
                        </View>

                    </View>
                }>
                    <Swiper>
                        <View
                            style={{
                                width: '100%',
                                height: '100%',
                                justifyContent: "center",
                            }}
                        >

                            <ImageBackground
                                source={this.state.contratos.find(x => x.cod_plano == 45 || x.cod_plano == 46) ? require('../../assets/medicGlobal.png') : require('../../assets/extremamedic_carteirinhafrente.png')}

                                style={this.state.contratos.find(x => x.cod_plano == 45 || x.cod_plano == 46) ? {
                                    width: '95%',
                                    height: '100%',
                                    maxHeight: 600,
                                    flex: 1,
                                    justifyContent: "center",
                                    marginLeft: "5%",
                                    marginTop: 5,
                                    marginBottom: "2%",
                                } : {
                                    width: '92%',
                                    height: '100%',
                                    maxHeight: 600,
                                    flex: 1,
                                    justifyContent: "center",
                                    marginLeft: "5%",
                                    marginTop: 5,
                                    marginBottom: "2%",
                                }}
                                imageStyle={{
                                    borderRadius: 35
                                }}
                            >
                                <View
                                    style={Platform.OS === "ios" ? {
                                        transform: [{ rotate: "270deg" }],
                                        // width: "140%",
                                        // height: "80%",
                                        width: "140%",
                                        height: "70%",
                                        position: "relative",
                                        right: "7%"
                                    } : {
                                        transform: [{ rotate: "270deg" }],
                                        // width: "140%",
                                        // height: "80%",
                                        width: "140%",
                                        height: "70%",
                                        position: "relative",
                                        right: "7%",
                                        marginRight: "2%"
                                    }}
                                >
                                    <Text
                                        style={this.state.contratos.find(x => x.cod_plano == 45 || x.cod_plano == 46) ? {
                                            fontWeight: "bold",
                                            fontSize: 22,
                                            marginTop: "15%",
                                            color: "#FFFFFF",
                                            textAlign: "right",
                                            marginRight: "5%"
                                        } : {
                                            fontWeight: "bold",
                                            fontSize: 22,
                                            marginTop: "8%",
                                            color: "#FFFFFF",
                                            textAlign: "right",
                                            marginRight: "5%"
                                        }}
                                    >
                                        {this.state.contratos.matricula}
                                    </Text>

                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 18,
                                            color: "#FFFFFF",
                                            marginTop: "2%"
                                        }}
                                    >
                                        {this.state.contratos.nome_beneficiario}
                                    </Text>

                                    <Text
                                        style={{
                                            // fontWeight: "bold",
                                            fontSize: 13,
                                            // marginTop: "2%"
                                        }}
                                    >
                                        Empresa:
                                    </Text>

                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 15,
                                            // marginTop: "2%"
                                            color: "#FFFFFF"
                                        }}
                                    >
                                        {this.state.contratos.nome_empresa}
                                    </Text>

                                    <Text
                                        style={{
                                            // fontWeight: "bold",
                                            fontSize: 13,
                                            // marginTop: "2%"
                                        }}
                                    >
                                        Plano:
                                    </Text>

                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 15,
                                            // marginTop: "2%"
                                            color: "#FFFFFF"
                                        }}
                                    >
                                        {this.state.contratos.plano}
                                    </Text>

                                    <Grid>
                                        <Row
                                            style={{
                                                height: "20%"
                                            }}
                                        >
                                            <Col>
                                                <Text
                                                    style={{
                                                        // fontWeight: "bold",
                                                        fontSize: 13,
                                                        marginTop: "2%"
                                                    }}
                                                >
                                                    Cobertura:
                                                </Text>

                                                <Text
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: 15,
                                                        // marginTop: "2%"
                                                        color: "#FFFFFF"
                                                    }}
                                                >
                                                    {this.state.contratos.cobertura}
                                                </Text>
                                            </Col>
                                            <Col>
                                                <Text
                                                    style={{
                                                        // fontWeight: "bold",
                                                        fontSize: 13,
                                                        // marginTop: "2%"
                                                    }}
                                                >
                                                    Nascimento: {" "}
                                                    <Text
                                                        style={{
                                                            fontSize: 15,
                                                            fontWeight: "bold",
                                                            color: "#FFFFFF"
                                                        }}
                                                    >
                                                        {this.state.contratos.nascimento}
                                                    </Text>
                                                </Text>
                                            </Col>
                                        </Row>
                                        <Row
                                            style={{
                                                // height: "2%"
                                            }}
                                        >
                                            <Col>
                                                {/* <Text
                                                    style={{
                                                        // fontWeight: "bold",
                                                        fontSize: 13,
                                                        marginTop: "2%"
                                                    }}
                                                >
                                                    Cobertura:
                                                </Text>

                                                <Text
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: 15,
                                                        // marginTop: "2%"
                                                    }}
                                                >
                                                    {this.state.contratos.cobertura}
                                                </Text> */}
                                            </Col>
                                        </Row>
                                    </Grid>


                                </View>
                            </ImageBackground>
                        </View>

                        <View style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: "center",
                        }}
                        >
                            <ImageBackground
                                source={this.state.contratos.find(x => x.cod_plano == 45 || x.cod_plano == 46) ? require('../../assets/medicGlobalFundo.png') : require('../../assets/extremamedic_carteirinhaverso.png')}
                                style={{
                                    width: '92%',
                                    height: '100%',
                                    maxHeight: 600,
                                    flex: 1,
                                    justifyContent: "center",
                                    marginLeft: "5%",
                                    marginTop: 5,
                                    marginBottom: "2%",
                                }}
                                imageStyle={{
                                    borderRadius: 25
                                }}
                            ></ImageBackground>
                        </View>
                    </Swiper>

                </RenderIf>

            </Root>
        )
    }

}