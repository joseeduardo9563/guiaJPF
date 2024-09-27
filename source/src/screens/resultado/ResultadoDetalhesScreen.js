import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Image,
    Dimensions,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import { Button, Text, Content, Picker, H3, Grid, Col } from 'native-base';
import ColorsScheme from '../../settings/ColorsScheme';
import Base from '../../components/Base';
import HeaderGoBack from '../../components/HeaderGoBack';
import RenderIf from '../../components/RenderIf';
import Server from '../../settings/Server';
import { NavigationEvents } from 'react-navigation';
import { Overlay } from 'react-native-elements';

import MapView, { Marker } from 'react-native-maps';
import { OpenMapDirections } from 'react-native-navigation-directions';
import call from 'react-native-phone-call';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FavoriteButton from '../../components/FavoriteButton';

export default class ResultadoDetalhesScreen extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        const data = this.props.navigation.getParam('data', {});
        const goBack = this.props.navigation.getParam('goBack', {});
        const isolada = this.props.navigation.getParam('isolada', false)
        this.state = {
            data: data,
            DadoGoBack: goBack,
            detalhes: [],
            especialidades: [],
            latitude: -21.4294,
            logitude: -45.9471,
            selected: 0,
            icon: [],
            isVisible: false,
            informacao: [],
            isolada: isolada
        };
    }
    onValueChange(value) {
        this.GetLatLog(this.state.detalhes[value]);
        this.setState({
            selected: value
        });
    }

    UNSAFE_componentWillMount() {
        if (this.state.data.tipo == 'P') {
            this.GetDetahesMedico().then(res => {
                
                this.GetLatLog(res[0]);
            });
            this.GetEspecialidade();
            this.GetIconByProf();
        } else {
            let temp = [];
            temp.push(this.state.data);
            this.setState({ detalhes: temp });
            this.GetLatLog(this.state.data);
        }
    }
    _callShowDirections = () => {
        const endPoint = {
            longitude: this.state.logitude,
            latitude: this.state.latitude
        };

        const transportPlan = 'd';

        OpenMapDirections(null, endPoint, transportPlan).then(res => {});
    };
    GetIconByProf() {
        fetch(
            Server.API +
                'isolada/getIconByProf.asp?profissional=' +
                this.state.data.profissional
        )
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ icon: responseJson });
                console.log(this.state);
            })
            .catch(error => {
                console.log(error);
            });
    }
    GetEspecialidade() {
        fetch(
            Server.API +
                'isolada/getEspecialidadeByProficional.asp?profissional=' +
                this.state.data.profissional
        )
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                this.setState({ especialidades: responseJson });
            })
            .catch(error => {
                console.log(error);
            });
    }

    GetDetahesMedico = async () => {
        let url =
            Server.API +
            'isolada/getDetalhesMedico.asp?profissional=' +
            this.state.data.profissional;

            console.log("detalheMedico", url)
        return fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({ detalhes: responseJson });
                return responseJson;
            })
            .catch(error => {
                console.log(error);
            });
    };

    GetLatLog(element) {
        console.log("Element",element)

        let endereco = "";
        
        if(element.tipo == 'J'){

                endereco =
                element.logradouro +
                ',' +
                element.numero +
                ',' +
                element.endereco +
                ',' +
                element.bairro +
                ',' +
                element.cidade +
                ',' +
                element.cep;
        } else {
            endereco =
                element.LOGRADOURO +
                ',' +
                element.ENDERECO_NUMERO +
                ',' +
                element.ENDERECO +
                ',' +
                element.BAIRRO +
                ',' +
                element.CIDADE +
                ',' +
                element.CEP;
        }
        endereco = endereco.split(' ').join('+');
        console.log(endereco);
        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&key=AIzaSyAWSGpo09MB0xiqFVLDhKYDtYUo3QajDyY`
        )
            .then(newresponse => newresponse.json())
            .then(mapsresponseJson => {
                this.setState({
                    latitude: mapsresponseJson.results[0].geometry.location.lat,
                    logitude: mapsresponseJson.results[0].geometry.location.lng
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
    loadModal() {
        let url =
            Server.API +
            'isolada/getInformacao.asp?prestador=' +
            this.state.detalhes[this.state.selected].PRESTADOR;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({ informacao: responseJson });
            })
            .catch(error => {
                console.log(error);
            });
        this.setState({ isVisible: true });
    }

    //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAXl7RxozEWjdupkIurEQGfH3koyJsRH3A
    render() {
        console.log(this.state)
        return (
            <Base navigation={this.props.navigation}>
                <HeaderGoBack
                    navigation={this.props.navigation}
                    title={'Rede Credenciada'}
                />
                <Content
                    style={{
                        marginBottom: 55
                    }}
                >
                    <Overlay
                        isVisible={this.state.isVisible}
                        width="auto"
                        height="auto"
                        onBackdropPress={() =>
                            this.setState({ isVisible: false })
                        }
                    >
                        <View style={{ padding: 20, flex: 1, height: '80%' }}>
                            <ScrollView style={{ flex: 1 }}>
                                <Text style={{ margin: 30 }}>
                                    tsendjk fsjdhkfj shjfkdshkh ksf
                                </Text>
                                <Text style={{ margin: 30 }}>
                                    tsendjk fsjdhkfjshjfkdshkh ksf
                                </Text>
                                <Text style={{ margin: 30 }}>
                                    tsendjk fsjdhkfjshjfkdshkh ksf
                                </Text>
                                <Text style={{ margin: 30 }}>
                                    tsendjk fsjdhkfjshjfkdshkh ksf
                                </Text>
                                <Text style={{ margin: 30 }}>
                                    tsendjk fsjdhkfjshjfkdshkh ksf
                                </Text>
                                <Text style={{ margin: 30 }}>
                                    tsendjk fsjdhkfjshjfkdshkh ksf
                                </Text>
                                <Text style={{ margin: 30 }}>
                                    tsendjk fsjdhkfjshjfkdshkh ksf
                                </Text>
                            </ScrollView>
                        </View>
                    </Overlay>
                    <ImageBackground
                        source={require('../../assets/IMAGEMFUNDO.png')}
                        style={{
                            width: '100%',
                            height: 200,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        
                        <View
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10
                            }}
                        >
                            <FavoriteButton data={this.state.data} /> 
          {/* manda para o componente os dados atraves do props, componente recupera la */}
                            
                        </View>
                        <View>
                            <H3
                                style={{
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}
                            >
                                {this.state.data.tipo == 'P'
                                    ? this.state.data.Nome
                                    : this.state.isolada ? this.state.data.NOME : this.state.data.nome_empresa}
                            </H3>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    marginTop: 10,
                                    paddingLeft: 10,
                                    paddingRight: 10
                                }}
                            >
                                {this.state.data.tipo == 'P'
                                    ? this.state.data.display
                                    : this.state.isolada ? this.state.data.ESPECIALIDADE : this.state.data.nome_empresa}
                            </Text>
                            {this.state.data.tipo == 'P' ? (
                                <View
                                    style={{ marginLeft: 10, marginRight: 10 }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            marginTop: 10
                                        }}
                                    >
                                        {this.state.especialidades.map(
                                            (item, index) => (
                                                <Text
                                                    style={{
                                                        fontSize: 8
                                                    }}
                                                    key={index}
                                                >
                                                    {item.NOME}
                                                    {index !=
                                                    this.state.especialidades
                                                        .length -
                                                        1
                                                        ? ' | '
                                                        : null}
                                                </Text>
                                            )
                                        )}
                                    </Text>
                                </View>
                            ) : null}
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 15,
                                    marginTop: 10,
                                    width: Dimensions.get('window').width
                                }}
                            >
                                <View>
                                    {this.state.icon.map((item, index) => (
                                        <Image
                                            style={{ width: 15, height: 15 }}
                                            source={{
                                                uri: `https://www.serpram.com.br/qualificacao/${
                                                    item.LOGO_ACRED_PARTIC_NOME
                                                }`
                                            }}
                                        />
                                    ))}
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                    <RenderIf condition={this.state.detalhes.length > 1}>
                        <View
                            style={{
                                paddingRight: 20,
                                paddingLeft: 20,
                                backgroundColor: '#f9f9f9'
                            }}
                        >
                            <Grid>
                                <Col size={1}>
                                    <Text style={{ marginTop: 10, color: "#000000" }}>
                                        Locais:
                                    </Text>
                                </Col>
                                <Col size={3}>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={{ width: '100%', color: "#000000" }}
                                        selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(
                                            this
                                        )}
                                        iosIcon={
                                            <FontAwesome5 name="angle-down" />
                                        }
                                    >
                                        {this.state.detalhes.map(
                                            (item, index) => (
                                                <Picker.Item
                                                    label={item.NOME_FANTASIA}
                                                    value={index}
                                                />
                                            )
                                        )}
                                    </Picker>
                                </Col>
                            </Grid>
                        </View>
                    </RenderIf>
                    {this.state.detalhes.length != 0 ||
                    this.state.data.tipo == 'J' ? (
                        <View style={{ padding: 20 }}>
                            {/* <TouchableHighlight
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10
                                }}
                                onPress={this.loadModal.bind(this)}
                            >
                                <FontAwesome5
                                    name={'info-circle'}
                                    style={{ fontSize: 15 }}
                                />
                            </TouchableHighlight> */}
                            <Text style={{ fontWeight: 'bold' }}>
                                {
                                    this.state.detalhes[this.state.selected]
                                        .nome_empresa
                                }
                            </Text>
                            <RenderIf condition={this.state.data.tipo == 'P'} else={
                                    <Text style={{ fontSize: 14 }}>
                                        {this.state.detalhes[this.state.selected]
                                            .logradouro +
                                            ' ' +
                                            this.state.detalhes[this.state.selected]
                                                .endereco +
                                            ', ' +
                                            this.state.detalhes[this.state.selected]
                                                .numero +
                                            ', ' +
                                            this.state.detalhes[this.state.selected]
                                                .bairro +
                                            ' - ' +
                                            this.state.detalhes[this.state.selected]
                                                .cidade}
                                    </Text>
                            }>
                            <Text style={{ fontSize: 14 }}>
                                {this.state.detalhes[this.state.selected]
                                    .LOGRADOURO +
                                    ' ' +
                                    this.state.detalhes[this.state.selected]
                                        .ENDERECO +
                                    ', ' +
                                    this.state.detalhes[this.state.selected]
                                        .ENDERECO_NUMERO +
                                    ', ' +
                                    this.state.detalhes[this.state.selected]
                                        .BAIRRO +
                                    ' - ' +
                                    this.state.detalhes[this.state.selected]
                                        .CIDADE}
                            </Text>
                            </RenderIf>

                            <Grid style={{ marginTop: 10 }}>
                                <Col size={70}>
                                    <Text
                                        style={{ fontSize: 14, marginTop: 5 }}
                                    >
                                        {
                                            this.state.detalhes[
                                                this.state.selected
                                            ].FONE_COML
                                        }
                                    </Text>
                                </Col>
                                <Col size={30}>
                                    <Button
                                        style={{
                                            width: '100%',
                                            paddingLeft: 10,
                                            backgroundColor:
                                                ColorsScheme.ASENT_COLOR
                                        }}
                                        iconLeft
                                        onPress={() =>
                                            call({
                                                number: this.state.detalhes[
                                                    this.state.selected
                                                ].FONE_COML.split(
                                                    '/'
                                                )[0].trim(),
                                                prompt: false
                                            }).catch(console.log())
                                        }
                                        small
                                    >
                                        <FontAwesome5
                                            name="phone"
                                            style={{ color: 'white' }}
                                        />
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontSize: 14,
                                                width: '100%'
                                            }}
                                        >
                                            Ligar
                                        </Text>
                                    </Button>
                                </Col>
                            </Grid>
                            <MapView
                                style={{
                                    height: 200,
                                    width: '100%',
                                    marginTop: 20
                                }}
                                region={{
                                    latitude: this.state.latitude,
                                    longitude: this.state.logitude,
                                    latitudeDelta: 0.0032,
                                    longitudeDelta: 0.0021
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: this.state.latitude,
                                        longitude: this.state.logitude
                                    }}
                                    title={
                                        this.state.detalhes[this.state.selected]
                                            .nome_empresa
                                    }
                                />
                            </MapView>
                            <Button
                                onPress={this._callShowDirections.bind(this)}
                                block
                                iconLeft
                                style={{
                                    marginTop: 10,
                                    backgroundColor: ColorsScheme.ASENT_COLOR
                                }}
                            >
                                <FontAwesome5
                                    name="map-marker-alt"
                                    style={{ color: 'white', fontSize: 20 }}
                                />
                                <Text>Navegar</Text>
                            </Button>
                        </View>
                    ) : null}
                </Content>
            </Base>
        );
    }
}
