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
    // Text,
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
    Root,
    H3,
    Picker
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

export default class CarteirinhaScreen extends React.Component {
    constructor(props) {
        super(props);

        const data = this.props.navigation.getParam('data', []);

        this.state = {
            dataToBeSend: {},
            isLoading: false,
            //matricula: "54589",
            contratos: [],
            user: {},
            istitular: false,
            dependentes: [],
            selectDependente: "key0"
        };

        // this.setState({data: data});
    }

    UNSAFE_componentWillMount() {
        this.doloading();
        this._doloading();
    }

    componentDidMount() {
        this._doloading();
    }

    _doloading() {
        AsyncStorage.getItem('@usuario')
            .then(val => {
                this.setState({
                    user: JSON.parse(val)
                }, () => this.doloading());
                //this.getReceitas();
            })
            .catch(err => {
                console.log(err);
            });
    }

    doloading() {
        if (this.state.user.matricula != '') {
            this.getCarteirinha(this.state.user.matricula);
            this.getDependentes();
        }
    }

    getCarteirinha = (matricula) => {
        this.setState({ isLoading: true });
        Keyboard.dismiss();

        const url =
            Server.API +
            'financeiro/getComponenteCadastral.asp?matricula=' +
            matricula;
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ contratos: responseJson, isLoading: false });
            })
            .catch(err => {
                this.setState({ isLoading: false });
                console.log(err);
            });
    }

    getDependentes = () => {
        const { user } = this.state;
        const url =
            Server.API +
            'financeiro/getComponenteCadastralTitular.asp?matricula=' +
            user.matricula;

            console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ istitular: true, dependentes: responseJson });
            })
            .catch(err => {
                this.setState({ isLoading: false });
                console.log(err);
            });
    }

    renderCarteirinha = () => (
        <>
            <View
                style={{
                    width: '100%',
                    height: '100%',
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
                    {this.state.contratos.map((item, index) => {
                        return (
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
                                    {item.matricula}
                                </Text>

                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 18,
                                        color: "#FFFFFF",
                                        marginTop: "5%",
                                        marginLeft: "2%"
                                    }}
                                >
                                    {item.nome_beneficiario}
                                </Text>

                                <Text
                                    style={{
                                        // fontWeight: "bold",
                                        fontSize: 13,
                                        marginLeft: "2%"
                                        // marginTop: "2%"
                                    }}
                                >
                                    Empresa:
                                </Text>

                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 15,
                                        // marginTop: "2%",
                                        color: "#FFFFFF",
                                        marginLeft: "2%"
                                    }}
                                >
                                    {item.nome_empresa}
                                </Text>

                                <Text
                                    style={{
                                        // fontWeight: "bold",
                                        fontSize: 13,
                                        marginLeft: "2%"
                                        // marginTop: "2%"
                                    }}
                                >
                                    Plano:
                                </Text>

                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 15,
                                        // marginTop: "2%",
                                        color: "#FFFFFF",
                                        marginLeft: "2%"
                                    }}
                                >
                                    {item.plano}
                                </Text>

                                <Grid>
                                    <Row
                                        style={{
                                            height: "20%",
                                            marginLeft: "2%"
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
                                                    // marginTop: "2%",
                                                    color: "#FFFFFF"
                                                }}
                                            >
                                                {item.cobertura}
                                            </Text>
                                        </Col>
                                        <Col>
                                            <Text
                                                style={{
                                                    // fontWeight: "bold",
                                                    fontSize: 13,
                                                    marginTop: "2%"
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
                                                    {item.nascimento}
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
                                                                {item.cobertura}
                                                            </Text> */}
                                        </Col>
                                    </Row>
                                </Grid>
                            </View>
                        )
                    })}
                </ImageBackground>
            </View>

            <View
                style={{
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
        </>
    )

    renderCarteirinhaNovoPlano = () => (
        <>
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: "center",
                }}
            >
                <ImageBackground
                    source={require('../../assets/medicGlobal.png')}

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
                >
                    {this.state.contratos.map((item, index) => {
                        return (
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
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 22,
                                        marginTop: "8%",
                                        color: "#FFFFFF",
                                        textAlign: "right",
                                        marginRight: "5%"
                                    }}
                                >
                                    {item.matricula}
                                </Text>

                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 18,
                                        color: "#FFFFFF",
                                        marginTop: "5%",
                                        marginLeft: "2%"
                                    }}
                                >
                                    {item.nome_beneficiario}
                                </Text>

                                <Text
                                    style={{
                                        // fontWeight: "bold",
                                        fontSize: 13,
                                        marginLeft: "2%"
                                        // marginTop: "2%"
                                    }}
                                >
                                    Empresa:
                                </Text>

                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 15,
                                        // marginTop: "2%",
                                        color: "#FFFFFF",
                                        marginLeft: "2%"
                                    }}
                                >
                                    {item.nome_empresa}
                                </Text>

                                <Text
                                    style={{
                                        // fontWeight: "bold",
                                        fontSize: 13,
                                        marginLeft: "2%"
                                        // marginTop: "2%"
                                    }}
                                >
                                    Plano:
                                </Text>

                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 15,
                                        // marginTop: "2%",
                                        color: "#FFFFFF",
                                        marginLeft: "2%"
                                    }}
                                >
                                    {item.plano}
                                </Text>

                                <Grid>
                                    <Row
                                        style={{
                                            height: "20%",
                                            marginLeft: "2%"
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
                                                    // marginTop: "2%",
                                                    color: "#FFFFFF"
                                                }}
                                            >
                                                {item.cobertura}
                                            </Text>
                                        </Col>
                                        <Col>
                                            <Text
                                                style={{
                                                    // fontWeight: "bold",
                                                    fontSize: 13,
                                                    marginTop: "2%"
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
                                                    {item.nascimento}
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
                                                                {item.cobertura}
                                                            </Text> */}
                                        </Col>
                                    </Row>
                                </Grid>
                            </View>
                        )
                    })}
                </ImageBackground>
            </View>

            <View
                style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: "center",
                }}
            >
                <ImageBackground
                    source={require('../../assets/medicGlobalFundo.png')}
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
        </>
    )

    render() {
        const { istitular, dependentes } = this.state;

        return (
            <Base navigation={this.props.navigation}>
                <HeaderGoBack
                    navigation={this.props.navigation}
                    title={'Cartão Virtual'}
                    ishome={true}
                />
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "#FFFFFF"
                    }}
                >
                    <ScrollView>
                        <RenderIf condition={this.state.contratos.length == 1} else={
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
                                    <Text
                                        style={{
                                            marginBottom: 25,
                                            color: '#000000'
                                        }}
                                    >
                                        Selecione abaixo o plano para acessar o cartão virtual.
                                    </Text>
                                    <Card>

                                        {this.state.contratos.map((item, index) => {
                                            return (

                                                <CardItem
                                                    style={{ marginTop: 13 }}
                                                    bordered
                                                    key={index}
                                                    button
                                                    onPress={() => this.props.navigation.navigate('Carteirinha_2', {
                                                        contratos: item
                                                    })}
                                                >
                                                    <Body>

                                                        <Text style={{
                                                            fontSize: 16,
                                                            marginBottom: 10,
                                                            fontWeight: 'bold',
                                                            //alignSelf: "",
                                                            color: '#000000'
                                                        }}
                                                        >
                                                            {item.plano}
                                                        </Text>

                                                        <Text style={{ fontSize: 12, marginBottom: 10, color: "#000000" }}>
                                                            CNS: {item.cns}
                                                        </Text>

                                                    </Body>
                                                </CardItem>
                                            )
                                        })}
                                    </Card>
                                </View>
                            </RenderIf>
                        }>
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
                                        {/* <Text style={{ color: '#000000', textAlign: "center" }}>Buscando...</Text> */}
                                    </View>

                                </View>
                            }>
                                <>
                                    {istitular && (
                                        <>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                }}
                                            >
                                                Dependentes
                                            </Text>

                                            <Picker
                                                note
                                                mode="dropdown"
                                                style={{ width: "100%", color: 'black' }}
                                                selectedValue={this.state.selectDependente}
                                                onValueChange={(val) => this.setState({ selectDependente: val }, () => this.getCarteirinha(val))}
                                                placeholder={"Dependentes"}
                                                placeholderStyle={{ color: "#F8F8F8" }}
                                            >
                                                <Picker.Item
                                                    style={{ fontSize: 12 }}
                                                    label="Dependentes"
                                                    value="key0"
                                                />

                                                <Picker.Item
                                                    style={{ fontSize: 12 }}
                                                    label="Titular"
                                                    value={this.state.user.matricula}
                                                />

                                                {dependentes
                                                .filter(item => item != this.state.user.matricula)
                                                .map((item, index) => {
                                                    return (
                                                        <Picker.Item
                                                            key={index}
                                                            style={{ fontsize: 12 }}
                                                            label={item.nome_beneficiario}
                                                            value={item.matricula}
                                                        />
                                                    )
                                                })}
                                            </Picker>
                                        </>
                                    )}
                                    <Swiper>
                                        <this.renderCarteirinha />
                                    </Swiper>
                                </>

                            </RenderIf>
                        </RenderIf>
                    </ScrollView>
                </View>


            </Base>
        )
    }

}