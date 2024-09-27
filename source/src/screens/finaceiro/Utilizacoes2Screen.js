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
    Appearance
} from "react-native";
import {
    Container,
    Header,
    // Left,
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
    Root,
    // DatePicker,
    Form,
    Item,
    Icon,
} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker'
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

export default class Utilizacoes2Screen extends Component {
    constructor(props) {
        super(props);

        const dados = this.props.navigation.getParam('data', []);

        this.state = {
            dataToBeSend: {},
            isLoading: false,
            //matricula: "54589",
            data: [],
            dados: dados,
            chosenDateBegin: new Date(),
            chosenDateEnd: new Date(),
            isDateInitial: false,
            isDateFinal: false,
        };
    }

    setDateBegin(newDate) {
        this.setState({ chosenDateBegin: newDate })
    }

    setDateEnd(newDate) {
        this.setState({ chosenDateEnd: newDate })
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
        console.log("doloading", this.state);

        if (this.state.chosenDateBegin != "" && this.state.chosenDateEnd != "") {

            let DI = moment(this.state.chosenDateBegin).format("DD/MM/YYYY");
            let DF = moment(this.state.chosenDateEnd).format("DD/MM/YYYY");

            // let DI = this.state.chosenDateBegin
            // let DF = this.state.chosenDateEnd

            this.props.navigation.navigate('Utilizacoes', {
                dataInicio: DI,
                dataFim: DF,
                dados: this.state.dados
            })
        } else {
            Toast.show({
                text: 'Preencha todos os campos',
                buttonText: 'Ok',
                duration: 3000
            });
        }
    }

    showDateTimePicker = () => {
        this.setState({ isDateInitial: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateInitial: false });
    };

    handleDatePicked = date => {
        this.setState({ chosenDateBegin: date })
        this.hideDateTimePicker();
    };

    showDateTimePickerFinal = () => {
        this.setState({ isDateFinal: true });
    };

    hideDateTimePickerFinal = () => {
        this.setState({ isDateFinal: false });
    };

    handleDatePickedFinal = date => {
        this.setState({ chosenDateEnd: date })
        this.hideDateTimePickerFinal();
    };

    render() {
        let datenow = moment().format('DD-MM-YYYY');
        const { chosenDateBegin, chosenDateEnd, isDateFinal, isDateInitial } = this.state;
        const darkmode = Appearance.getColorScheme();

        return (
            <Root>
                <Container>
                    <Base navigation={this.props.navigation}>
                        <DatePicker
                            modal
                            open={isDateInitial}
                            date={chosenDateBegin}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            mode="date"
                            minimumDate={new Date("2001-01-01")}
                            maximumDate={new Date()}
                            textColor={darkmode === "dark" ? "#FFFFFF" : "#000000"}
                            confirmText={"Confirmar"}
                            cancelText={"Cancelar"}
                            title={"Selecione a data"}
                            locale={'pt'}
                        />

                        <DatePicker
                            modal
                            open={isDateFinal}
                            date={chosenDateEnd}
                            onConfirm={this.handleDatePickedFinal}
                            onCancel={this.hideDateTimePickerFinal}
                            mode="date"
                            minimumDate={new Date("2001-01-01")}
                            maximumDate={new Date()}
                            confirmText={"Confirmar"}
                            textColor={darkmode === "dark" ? "#FFFFFF" : "#000000"}
                            cancelText={"Cancelar"}
                            title={"Selecione a data"}
                            locale={'pt'}
                        />
                        <NavigationEvents
                            onWillFocus={payload => this.setState({ isLoading: true })}
                        />
                        <HeaderGoBack
                            navigation={this.props.navigation}
                            title={'Utilizações'}
                        />
                        <Content style={{ marginBottom: 55 }}>
                            <View style={{ margin: 15, padding: 10 }}>

                                <Text
                                    style={{
                                        //alignSelf: 'center',
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    INFORME O PERÍODO
                                </Text>
                                <Grid>
                                    <Col style={{ width: "50%"}}>
                                        <Item style={{ marginTop: 20, alignSelf: "center" }}>
                                            <TouchableOpacity onPress={this.showDateTimePicker}>
                                                <View
                                                    style={{
                                                        // backgroundColor: "red",
                                                        // padding: "2%"
                                                        paddingHorizontal: "5%",
                                                        paddingVertical: "2%",
                                                        borderColor: ColorsScheme.GENERAL_BLACK,
                                                        borderWidth: 1
                                                    }}
                                                >

                                                    <Text
                                                        style={{
                                                            fontSize: 14
                                                        }}
                                                    >
                                                        {moment(chosenDateBegin).format(
                                                            "DD/MM/YYYY"
                                                        )}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </Item>
                                    </Col>

                                    <Col style={{ width: "50%"}}>
                                        <Item style={{ marginTop: 20, alignSelf: "center" }}>
                                            <TouchableOpacity onPress={this.showDateTimePickerFinal}>
                                                <View
                                                    style={{
                                                        // backgroundColor: "red",
                                                        // padding: "2%"
                                                        paddingHorizontal: "5%",
                                                        paddingVertical: "2%",
                                                        borderColor: ColorsScheme.GENERAL_BLACK,
                                                        borderWidth: 1
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 14
                                                        }}
                                                    >
                                                        {moment(chosenDateEnd).format(
                                                            "DD/MM/YYYY"
                                                        )}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </Item>
                                    </Col>
                                </Grid>

                                <Button
                                    style={{
                                        marginTop: 25,
                                        marginLeft: 180,
                                        width: 140,
                                        backgroundColor: ColorsScheme.MAIN_COLOR,
                                        justifyContent: 'center'
                                        //alignSelf: 'center'
                                    }}

                                    onPress={() => this.doloading()}
                                    // onPress={() => {
                                    //     console.log(this.state);
                                    //     console.log("Date now",datenow);
                                    // }}
                                >
                                    <Text> Localizar </Text>
                                </Button>
                            </View>
                        </Content>
                    </Base>
                </Container>
            </Root>
        )
    }
}