import React, { Component } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import {
    Body,
    Card,
    CardItem,
    Text,
    Content,
    Spinner,
    Form,
    Picker,
    Button,
    FlatList,
    H3
} from 'native-base';
import axios from 'axios';
import ColorsScheme from '../../settings/ColorsScheme';
import SpinnerDrawer from '../../components/Spinner';
import SemInformacao from '../../components/SemInformacao';
import Base from '../../components/Base';
import HeaderGoBack from '../../components/HeaderGoBack';
import RenderIf from '../../components/RenderIf';
import Server from '../../settings/Server';
import { Input } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class EscolhaIsoladaScreen extends Component {
    constructor(props) {
        super(props);
        const data = this.props.navigation.getParam('data', []); // recupera os dados que foram passados 
        const type = this.props.navigation.getParam('type', 'nenhum');
        const subTitle = this.props.navigation.getParam('subTitle', 'nenhum');
        if (type != 'Regiao') {
            this.state = {
                rawData: data,
                data: data,
                type: type,
                isLoading: false,
                subTitle: subTitle
            };
        } else {
            this.state = {
                data: data,
                type: type,
                isLoading: false,
                selectedEstado: 'key0',
                cidades: [],
                selectedCidade: 'key0',
                bairros: [],
                selectedBairro: 'key0',
                isButtonEnable: false,
                subTitle: subTitle
            };
        }
    }
    doFilter = txt => {
        let teste = this.state.rawData.filter(
            item =>
                item.nome
                    .toLocaleUpperCase()
                    .indexOf(txt.toLocaleUpperCase()) != -1
        );
        this.setState({ data: teste });
    };

    doSerchByType = id => {
        switch (this.state.type) {
            case 'Plano':
                this.setState({ isLoading: true });

                let urlplano = Server.API + 'isolada/getAllFromPlano.asp?plano=' + id
                // let urlplano = Server.API +
                // 'isolada/getProficionalByEspecialidade.asp?especialidade=' +
                // id

                console.log(urlplano)

                // axios
                // .get(urlplano, {
                //     headers: { "Content-Type": "application/json"}
                // })
                // .then(res => {
                //     console.log(res);
                //     this.setState({ isLoading: false });
                //     // this.props.navigation.navigate('ResultadoBusca', {
                //     //     data: res.data,
                //     //     title: 'Resultados',
                //     //     subTitle: 'Abaixo o resultados da pesquisa',
                //     //     isolada: true
                //     // });
                // })
                // .catch(err => {
                //     console.log(err);

                //     this.setState({ isLoading: true })
                // })
                fetch(urlplano)
                    .then(response => response.json())
                    .then(responseJson => {
                        console.log("response", responseJson)
                        this.setState({ isLoading: false });
                        this.props.navigation.navigate('ResultadoBusca', {
                            data: responseJson,
                            title: 'Resultados',
                            subTitle: 'Abaixo o resultados da pesquisa',
                            isolada: true
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        this.setState({ isLoading: true })
                    });
                break;

            case 'Nome':
                this.setState({ isLoading: true });
                let url2 =
                    Server.API +
                    'isolada/getProfByidNome.asp?codigo_profissional=' +
                    id;
                // let url2 = Server.API +
                // 'isolada/getProficionalByEspecialidade.asp?especialidade=' +
                // id
                console.log(url)
                fetch(url2)
                    .then(response => response.json())
                    .then(responseJson => {
                        console.log(responseJson)
                        this.setState({ isLoading: false });
                        responseJson[0].display = responseJson[0].descricao
                            .split(' ')
                            .pop()
                            .replace(
                                ')',
                                ' ' + responseJson[0].nconselho + ')'
                            );
                        this.props.navigation.navigate('ResultadoDetalhes', {
                            data: responseJson[0],
                            isolada: true
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        this.setState({ isLoading: true })
                    });
                break;
            case 'Especialidade':
                this.setState({ isLoading: true });
                let url =
                    Server.API +
                    'isolada/getProficionalByEspecialidade.asp?especialidade=' +
                    id;

                console.log(url)
                fetch(url)
                    .then(response => response.json())
                    .then(responseJson => {
                        this.setState({ isLoading: false });
                        this.props.navigation.navigate('ResultadoBusca', {
                            data: responseJson,
                            title: 'Resultados',
                            subTitle: 'Abaixo o resultados da pesquisa',
                            isolada: true
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        this.setState({ isLoading: true })
                    });
                break;
            case 'Qualificacao':
                this.setState({ isLoading: true });
                console.log(Server.API +
                    'isolada/getQualificacaoByQualicacao.asp?qualificacao=' +
                    id);
                fetch(
                    Server.API +
                        'isolada/getQualificacaoByQualicacao.asp?qualificacao=' +
                        id
                )
                    .then(response => response.json())
                    .then(responseJson => {
                        this.setState({ isLoading: false });
                        this.props.navigation.navigate('ResultadoBusca', {
                            data: responseJson,
                            title: 'Resultados',
                            subTitle: 'Abaixo o resultados da pesquisa',
                            isolada: true
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        this.setState({ isLoading: true })
                    });
                break;
            default:
                break;
        }
    };

    onValueChangeEstado(value) {
        this.setState({
            selectedEstado: value
        });
        this.getCidade(value);
    }
    onValueChangeCidade(value) {
        this.setState({
            selectedCidade: value
        });
        console.log(Server.API +
            'isolada/getRegiaoBairro.asp?estado=' +
            this.state.selectedEstado +
            '&cidade=' +
            value)
        fetch(
            Server.API +
                'isolada/getRegiaoBairro.asp?estado=' +
                this.state.selectedEstado +
                '&cidade=' +
                value
        )
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    bairros: responseJson,
                    selectedBairro: 'key0'
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    onValueChangeBairo(value) {
        this.setState({
            selectedBairro: value,
            isButtonEnable: true
        });
    }
    getCidade(value) {
        console.log(Server.API + 'isolada/getRegiaoCidade.asp?estado=' + value)
        fetch(Server.API + 'isolada/getRegiaoCidade.asp?estado=' + value)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    cidades: responseJson,
                    selectedCidade: 'key0'
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    pesquisarPorRegiao() {
        this.setState({ isLoading: true });
        let url =
            Server.API +
            'isolada/getResultadoRegiao.asp?estado=' +
            this.state.selectedEstado +
            '&cidade=' +
            this.state.selectedCidade +
            '&bairro=' +
            this.state.selectedBairro;
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ isLoading: false });
                this.props.navigation.navigate('ResultadoBusca', {
                    data: responseJson,
                    title: 'Resultados',
                    subTitle: 'Abaixo o resultados da pesquisa',
                    isolada: true
                });
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                this.setState({ isLoading: true })
            });
    }

    render() {
        console.log("state", this.state)
        return (
            <Base navigation={this.props.navigation}>
                <HeaderGoBack
                    navigation={this.props.navigation}
                    title={'Rede Credenciada'}
                />
                <RenderIf condition={!this.state.isLoading} else={<Spinner />}>
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
                            {this.state.subTitle}
                        </Text>
                    </View>
                    <RenderIf
                        condition={
                            this.state.type == 'Plano' ||
                            this.state.type == 'Nome' ||
                            this.state.type == 'Especialidade' ||
                            this.state.type == 'Qualificacao'
                        }
                    >
                        <Content style={{ padding: 20 }}>
                            <RenderIf condition={this.state.data} else={
                                <SemInformacao/>
                            }>
                                <Card style={{ marginBottom: 20 }}>
                                    <Input
                                        placeholder="Filtro"
                                        style={{ fontSize: 12, color: "#000000" }}
                                        onChangeText={txt => this.doFilter(txt)}
                                        
                                    />


                                    {this.state.data.map((item, index) => (
                                        <CardItem
                                            key={index}
                                            bordered
                                            button
                                            onPress={this.doSerchByType.bind(
                                                this,
                                                item.id
                                            )}
                                        >
                                            <Body>
                                                <Text style={{ fontSize: 12 }}>
                                                    {item.nome}
                                                </Text>
                                            </Body>
                                        </CardItem>
                                    ))}
                                </Card>
                            </RenderIf>
                        </Content>
                    </RenderIf>

                    {this.state.type == 'Regiao' ? (
                        <Form style={{ margin: 20 }}>
                            <View
                                style={{
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    padding: 10
                                }}
                            >
                                <Text
                                    style={{ fontSize: 12, fontWeight: 'bold' }}
                                >
                                    INFORME O ESTADO
                                </Text>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Selecione estado"
                                    iosIcon={<FontAwesome5 name="angle-down" />}
                                    style={{ width: '100%', color: "#000000" }}
                                    selectedValue={this.state.selectedEstado}
                                    onValueChange={this.onValueChangeEstado.bind(
                                        this
                                    )}
                                >
                                    <Picker.Item
                                        label="Selecione..."
                                        value="key0"
                                    />
                                    {this.state.data.map(item => (
                                        <Picker.Item
                                            label={item.estado}
                                            value={item.estado}
                                        />
                                    ))}
                                </Picker>
                            </View>
                            {this.state.cidades.length != 0 ? (
                                <View
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#fff',
                                        padding: 10
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        INFORME O CIDADE
                                    </Text>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Selecione estado"
                                        iosIcon={
                                            <FontAwesome5 name="angle-down" />
                                        }
                                        style={{ width: '100%', color: "#000000" }}
                                        selectedValue={
                                            this.state.selectedCidade
                                        }
                                        onValueChange={this.onValueChangeCidade.bind(
                                            this
                                        )}
                                    >
                                        <Picker.Item
                                            label="Selecione..."
                                            value="key0"
                                        />
                                        {this.state.cidades.map(item => (
                                            <Picker.Item
                                                label={item.NOME}
                                                value={item.cidade}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                            ) : null}
                            {this.state.bairros.length != 0 ? (
                                <View
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#fff',
                                        padding: 10
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        INFORME O BAIRRO
                                    </Text>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Selecione"
                                        iosIcon={
                                            <FontAwesome5 name="angle-down" />
                                        }
                                        style={{ width: '100%', color: "#000000" }}
                                        selectedValue={
                                            this.state.selectedBairro
                                        }
                                        onValueChange={this.onValueChangeBairo.bind(
                                            this
                                        )}
                                    >
                                        <Picker.Item
                                            label="Selecione..."
                                            value="key0"
                                        />
                                        {this.state.bairros.map(item => (
                                            <Picker.Item
                                                label={item.Nome}
                                                value={item.seq_bairro}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                            ) : null}
                            <Button
                                onPress={this.pesquisarPorRegiao.bind(this)}
                                disabled={!this.state.isButtonEnable}
                                block
                                style={[
                                    {
                                        marginTop: 10
                                    },

                                    this.state.isButtonEnable
                                        ? {
                                              backgroundColor:
                                                  ColorsScheme.ASENT_COLOR
                                          }
                                        : {}
                                ]}
                            >
                                <Text>Pesquisar</Text>
                            </Button>
                        </Form>
                    ) : null}
                </RenderIf>
            </Base>
        );
    }
}
