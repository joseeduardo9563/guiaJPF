import React, { Component } from 'react';
import { StyleSheet, StatusBar, View,Platform } from 'react-native';
import {
    Button,
    Spinner,
    Text,
    Content,
    Card,
    CardItem,
    Body,
    H3,
    
} from 'native-base';
import ColorsScheme from '../../settings/ColorsScheme';
import Base from '../../components/Base';
import HeaderGoBack from '../../components/HeaderGoBack';
import RenderIf from '../../components/RenderIf';
import Server from '../../settings/Server';
import { NavigationEvents } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default class ResultadoBuscaScreen extends Component {
    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener(
            'didFocus',
            payload => {
                this.getdata();
            }
        );

        this.state = {
            data: [],
            title: 'Resultados',
            subTitle: 'Abaixo os resultados da pesquisa',
            isolada: false
        };
        this.getdata();
    }

    openDetalhe = item => {
        this.props.navigation.navigate('ResultadoDetalhes', {
            data: item,
            isolada: this.state.isolada
        });
    };

    getdata() {
        const data = this.props.navigation.getParam('data', []);
        const title = this.props.navigation.getParam('title', '');
        const subTitle = this.props.navigation.getParam('subTitle', '');
        const isolada = this.props.navigation.getParam('isolada', false)
        if (data != null) {
            data.forEach(item => {
                if (item.tipo == 'P' && !item.display) {
                    item.display = item.descricao
                        .split(' ')
                        .pop()
                        .replace(')', ' ' + item.nconselho + ')');
                }
            });
            this.setState({ data: data, title: title, subTitle: subTitle, isolada: isolada });
           
        }
    }

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
                        marginBottom: 55,
                        marginRight: 20,
                        marginLeft: 20,
                        paddingBottom: 30,
                        backgroundColor: '#f8f8f8'
                    }}
                >
                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <H3
                            style={{
                                fontWeight: 'bold',
                                color: ColorsScheme.ASENT_COLOR
                            }}
                        >
                            {this.state.title.toLocaleUpperCase()}
                        </H3>
                        <Text style={{ fontSize: 12 }}>
                            {this.state.subTitle}
                        </Text>
                    </View>
                    {this.state.data != ""? (
                        <Card>
                            {this.state.data.map((item, index) => {
                                if (item.tipo == 'P') {
                                    return (
                                        <CardItem
                                            onPress={this.openDetalhe.bind(
                                                this,
                                                item
                                            )}
                                            button
                                            bordered
                                            key={index}
                                        >
                                            <Body>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    {item.Nome}
                                                </Text>
                                                <Text style={{ fontSize: 14 }}>
                                                    {item.display}
                                                </Text>
                                            </Body>
                                        </CardItem>
                                    );
                                } else {
                                    if (item.tipo == 'J') {
                                        return (
                                            <CardItem
                                                onPress={this.openDetalhe.bind(
                                                    this,
                                                    item
                                                )}
                                                button
                                                bordered
                                                key={index}
                                            >
                                                <Body>
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        {this.state.isolada ? item.NOME : item.nome_empresa}
                                                    </Text>
                                                    <Text
                                                        style={{ fontSize: 14 }}
                                                    >
                                                        {this.state.isolada ? item.ESPECIALIDADE : item.especialidade}
                                                    </Text>
                                                </Body>
                                            </CardItem>
                                        );
                                    } else {
                                        return null;
                                    }
                                }
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
                            <FontAwesome5 name="frown" size={130} color="#a0a0a0" />
                            <Text style={{ textAlign: 'center', marginTop:10 }}>
                                Ops.. não foi encontrado favoritos.
                            </Text>
                        </View>
                    }
                </Content>
            </Base>
        );
    }
}
