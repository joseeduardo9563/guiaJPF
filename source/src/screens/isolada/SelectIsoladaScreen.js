import React, { Component } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import {
    Button,
    Spinner,
    Text,
    Content,
    Body,
    Left,
    Right,
    H3
} from 'native-base';
import ColorsScheme from '../../settings/ColorsScheme';
import SpinnerDrawer from '../../components/Spinner';
import Seminformacao from '../../components/SemInformacao';
import Base from '../../components/Base';
import HeaderGoBack from '../../components/HeaderGoBack';
import RenderIf from '../../components/RenderIf';
import Server from '../../settings/Server';
import { NavigationEvents } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class SelectIsoladaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataToBeSend: {},
            isLoading: true, 
            isFail: false
        };
    }
    _doFetch = async url =>
        fetch(url)
            .then(response => response.json())
            .then(responseJson => responseJson)
            .catch(error => {
                console.error(error);
            });

    sendDopDown = type => { //apos selecionar ele navega ate a tela escolhaIsolada, passandos os dados
        switch (type) {
            case 'Plano':
                this.setState({ isLoading: false });
                const url = Server.API + 'isolada/getPlano.asp'
                console.log(url);

                fetch(url)
                .then(response => response.json())
                .then(res => {
                    console.log(res);
                    this.props.navigation.navigate('EscolhaIsolada', {
                        data: res,
                        type: 'Plano',
                        subTitle: "Pesquisa por plano"
                    });
                })
                .catch(err => {
                    console.log(err)
                })
                // this._doFetch(Server.API + 'isolada/getPlano.asp')
                //     .then(res => {
                //         console.log(res);
                //         this.props.navigation.navigate('EscolhaIsolada', {
                //             data: res,
                //             type: 'Plano',
                //             subTitle:"Pesquisa por plano"
                //         });
                //     })
                //     .catch(error => {
                //         console.error(error);
                //     });
                break;
            case 'Nome':
                this.setState({ isLoading: false });
                // console.log(Server.API + 'isolada/getNome.asp')

                const urlw = Server.API + 'isolada/GetNome.asp';
                // const urlw = Server.API + 'isolada/getPlano.asp'
                console.log(urlw)
                fetch(urlw)
                .then(response => response.json())
                .then(res => {
                    console.log(res)
                    this.setState({ isLoading: true })
                    this.props.navigation.navigate('EscolhaIsolada', {
                        data: res,
                        type: 'Nome',
                        subTitle: "Pesquisa por nome"
                    });
                })
                .catch(err => {
                    console.log(err);

                    this.setState({ isLoading: true })
                })
                // this._doFetch(Server.API + 'isolada/getNome.asp')
                //     .then(res => {
                //         console.log(res)
                //         this.props.navigation.navigate('EscolhaIsolada', {
                //             data: res,
                //             type: 'Nome',
                //             subTitle:"Pesquisa por nome"
                //         });
                //     })
                //     .catch(error => {
                //         console.error(error);
                //     });
                break;
            case 'Especialidade':
                this.setState({ isLoading: false });
                console.log(Server.API + 'isolada/getAllEspecialidade.asp');
                this._doFetch(Server.API + 'isolada/getAllEspecialidade.asp')
                    .then(res => {
                        this.props.navigation.navigate('EscolhaIsolada', {
                            data: res,
                            type: 'Especialidade',
                            subTitle:"Pesquisa por especialidade"

                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });
                break;
            case 'Regiao':
                console.log(Server.API + 'isolada/getRegiaoEstado.asp');
                this._doFetch(Server.API + 'isolada/getRegiaoEstado.asp')
                    .then(res => {
                        this.props.navigation.navigate('EscolhaIsolada', {
                            data: res,
                            type: 'Regiao',
                            subTitle:"Pesquisa por região"
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });
                break;
            case 'Qualificacao':
                this.setState({ isLoading: false });
                console.log(Server.API + 'isolada/getAllQualificacao.asp')
                this._doFetch(Server.API + 'isolada/getAllQualificacao.asp')
                    .then(res => {
                        this.props.navigation.navigate('EscolhaIsolada', {
                            data: res,
                            type: 'Qualificacao',
                            subTitle:"Pesquisa por qualificação"
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });
                break;
            case 'Urgencia':
                this.setState({ isLoading: false });
                this._doFetch(Server.API + 'isolada/getAllUrgencia.asp')
                    .then(res => {
                        this.props.navigation.navigate('ResultadoBusca', {
                            data: res,
                            title: 'Resultados',
                            subTitle:
                                'Abaixo os resultados da pesquisa de urgência',
                            isolada: true
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });
                break;
            default:
                break;
        }
    };
    render() {
        return (
            <Base navigation={this.props.navigation}>
                <NavigationEvents
                    onWillFocus={payload => this.setState({ isLoading: true })}
                />
                <HeaderGoBack
                    navigation={this.props.navigation}
                    title={'Rede Credenciada'}
                />
                <RenderIf condition={this.state.isLoading} else={
                    <SpinnerDrawer
                        style={{ marginTop: 105 }}
                        text="Carregando..."
                        textColor={"#000000"}
                        spinColor={ColorsScheme.MAIN_COLOR}
                    />
                }>
                    <RenderIf condition={!this.state.isFail} else={
                        <Seminformacao
                            error={true}
                        />
                    }>
                        <Content style={{ marginBottom: 55, marginRight: 20 }}>
                            <View style={{ margin: 20 }}>
                                <H3
                                    style={{
                                        fontWeight: 'bold',
                                        color: ColorsScheme.ASENT_COLOR
                                    }}
                                >
                                    BUSCA ISOLADA
                            </H3>
                                <Text style={{ fontSize: 12 }}>
                                    Selecione abaixo o tipo de busca que deseja
                                    realizar
                            </Text>
                            </View>

                            <Button
                                onPress={this.sendDopDown.bind(this, 'Plano')} // 'Plano' => valor do switch
                                primary
                                iconRight
                                style={{
                                    margin: 10,
                                    width: '100%',
                                    marginLeft: 10,
                                    backgroundColor: ColorsScheme.ASENT_COLOR
                                }}
                            >
                                <Text>Por Plano</Text>

                                <FontAwesome5
                                    name={'angle-right'}
                                    style={{
                                        color: '#fff',
                                        fontSize: 20,
                                        paddingRight: 20
                                    }}
                                />
                            </Button>
                            <Button
                                onPress={this.sendDopDown.bind(this, 'Nome')}
                                primary
                                iconRight
                                style={{
                                    margin: 10,
                                    width: '100%',
                                    marginLeft: 10,
                                    backgroundColor: ColorsScheme.ASENT_COLOR
                                }}
                            >
                                <Text>Por Nome</Text>
                                <FontAwesome5
                                    name={'angle-right'}
                                    style={{
                                        color: '#fff',
                                        fontSize: 20,
                                        paddingRight: 20
                                    }}
                                />
                            </Button>
                            <Button
                                onPress={this.sendDopDown.bind(
                                    this,
                                    'Especialidade'
                                )}
                                primary
                                iconRight
                                style={{
                                    margin: 10,
                                    width: '100%',
                                    marginLeft: 10,
                                    backgroundColor: ColorsScheme.ASENT_COLOR
                                }}
                            >
                                <Text>Por Especialidade</Text>
                                <FontAwesome5
                                    name={'angle-right'}
                                    style={{
                                        color: '#fff',
                                        fontSize: 20,
                                        paddingRight: 20
                                    }}
                                />
                            </Button>
                            <Button
                                onPress={this.sendDopDown.bind(this, 'Regiao')}
                                primary
                                iconRight
                                style={{
                                    margin: 10,
                                    width: '100%',
                                    marginLeft: 10,
                                    backgroundColor: ColorsScheme.ASENT_COLOR
                                }}
                            >
                                <Text>Por Região</Text>
                                <FontAwesome5
                                    name={'angle-right'}
                                    style={{
                                        color: '#fff',
                                        fontSize: 20,
                                        paddingRight: 20
                                    }}
                                />
                            </Button>
                            <Button
                                onPress={this.sendDopDown.bind(
                                    this,
                                    'Qualificacao'
                                )}
                                primary
                                iconRight
                                style={{
                                    margin: 10,
                                    width: '100%',
                                    marginLeft: 10,
                                    backgroundColor: ColorsScheme.ASENT_COLOR
                                }}
                            >
                                <Text>Por Qualificação</Text>
                                <FontAwesome5
                                    name={'angle-right'}
                                    style={{
                                        color: '#fff',
                                        fontSize: 20,
                                        paddingRight: 20
                                    }}
                                />
                            </Button>
                            <Button
                                onPress={this.sendDopDown.bind(this, 'Urgencia')}
                                primary
                                iconRight
                                style={{
                                    margin: 10,
                                    width: '100%',
                                    marginLeft: 10,
                                    backgroundColor: ColorsScheme.ASENT_COLOR
                                }}
                            >
                                <Text>Por Urgência/Emergência</Text>
                                <FontAwesome5
                                    name={'angle-right'}
                                    style={{
                                        color: '#fff',
                                        fontSize: 20,
                                        paddingRight: 20
                                    }}
                                />
                            </Button>
                        </Content>
                    </RenderIf>
                </RenderIf>
            </Base>
        );
    }
}
