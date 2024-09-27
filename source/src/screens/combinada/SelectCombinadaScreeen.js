import React, { Component } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import ColorsScheme from '../../settings/ColorsScheme';
import Base from '../../components/Base';
import {
    Container,
    Header,
    Left,
    Body,
    Title,
    Button,
    Content,
    Card,
    Form,
    Text,
    Picker,
    H3
} from 'native-base';
import { ButtonGroup } from 'react-native-elements';
import HeaderGoBack from '../../components/HeaderGoBack';
import Server from '../../settings/Server';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class SelectCombinadaScreeen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            empresa: 0,
            planos: [],
            selectPlanos: 'key0',
            estabelecimentos: [],
            selectEstabelecimento: 'key0',
            estados: [],
            selectEstado: 'key0',
            cidades: [],
            selectCidades: 'key0',
            bairro: [],
            selectBairro: 'key0',
            especialidade: [],
            selectEspecialidade: 'key0',
            buttonDisable: true
        };
    }

    UNSAFE_componentWillMount() {
        this.getPlano();
    }

    setStateAsyc = async obj => {
        this.setState(obj);
    };

    getModo() {
        switch (this.state.selectedIndex) {
            case 0:
                return 'medico';
            case 1:
                return 'servico';
            default:
                break;
        }
    }

    getPlano() {
        fetch(Server.JSON + 'json_buscaplano.asp?modo=' + this.getModo())
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ planos: responseJson });
            })
            .catch(error => {
                console.log(error);
            });
    }

    updateIndex(selectedIndex) {
        this.setState({
            selectedIndex: selectedIndex,
            selectPlanos: 'key0',
            estabelecimentos: [],
            selectEstabelecimento: 'key0',
            planos: [],
            selectPlanos: 'key0',
            estados: [],
            selectEstado: 'key0',
            cidades: [],
            selectCidades: 'key0',
            bairro: [],
            selectBairro: 'key0',
            especialidade: [],
            selectEspecialidade: 'key0'
        }, () => this.getPlano())
    }

    checkIfIsKey0(par) {
        return par !== 'key0';
    }

    getEstabelecimento() {
        if (this.checkIfIsKey0(this.state.selectPlanos)) {
            const url =
                Server.JSON +
                'json_buscaestabelecimento.asp?modo=' +
                this.getModo() +
                '&plano=' +
                this.state.selectPlanos + 
                '&empresa=' + this.state.empresa;

            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({ estabelecimentos: responseJson });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    getEstados() {
        if (this.checkIfIsKey0(this.state.selectPlanos)) {
            const url =
                Server.JSON +
                'json_buscaestado.asp?modo=' +
                this.getModo() +
                '&plano=' +
                this.state.selectPlanos + 
                '&estabelecimento=' + this.state.selectEstabelecimento;
                
            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({ estados: responseJson });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    getCidades() {
        if (
            this.checkIfIsKey0(this.state.selectPlanos) &&
            this.checkIfIsKey0(this.state.selectEstado)
        ) {
            const url =
                Server.JSON +
                'json_buscacidade.asp?modo=' +
                this.getModo() +
                '&plano=' +
                this.state.selectPlanos +
                '&estado=' +
                this.state.selectEstado;

            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({ cidades: responseJson });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    getBairro() {
        if (
            this.checkIfIsKey0(this.state.selectPlanos) &&
            this.checkIfIsKey0(this.state.selectEstado) &&
            this.checkIfIsKey0(this.state.selectCidades)
        ) {
            const url =
                Server.JSON +
                'json_buscabairro.asp?modo=' +
                this.getModo() +
                '&plano=' +
                this.state.selectPlanos +
                '&estado=' +
                this.state.selectEstado +
                '&cidade=' +
                this.state.selectCidades;

            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({ bairro: responseJson });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    enableButton() {
        if (
            this.checkIfIsKey0(this.state.selectPlanos) &&
            this.checkIfIsKey0(this.state.selectEstado) &&
            this.checkIfIsKey0(this.state.selectCidades) &&
            this.checkIfIsKey0(this.state.selectEspecialidade)
        ) {
            this.setState({ buttonDisable: false });
        }
    }

    getEspecialidade() {
        if (
            this.checkIfIsKey0(this.state.selectPlanos) &&
            this.checkIfIsKey0(this.state.selectEstado) &&
            this.checkIfIsKey0(this.state.selectCidades) &&
            this.checkIfIsKey0(this.state.selectBairro)
        ) {
            const url =
                Server.JSON +
                'json_buscaespecialidade.asp?modo=' +
                this.getModo() +
                '&plano=' +
                this.state.selectPlanos +
                '&estado=' +
                this.state.selectEstado +
                '&cidade=' +
                this.state.selectCidades +
                '&bairro=' +
                this.state.selectBairro;

                console.log(url)
            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({ especialidade: responseJson });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    onValueSelectPlanos(value) {
        this.setStateAsyc({
            selectPlanos: value,
            estabelecimentos: [],
            selectEstabelecimento: 'key0',
            estados: [],
            selectEstado: 'key0',
            cidades: [],
            selectCidades: 'key0',
            bairro: [],
            selectBairro: 'key0',
            especialidade: [],
            selectEspecialidade: 'key0',
            buttonDisable: true
        })
            .then(() => this.getEstabelecimento())
            .catch(err => console.log(err));
    }

    onValueSelectEstabelecimento(value) {
        this.setStateAsyc({
            selectEstabelecimento: value,
            estados: [],
            selectEstado: 'key0',
            cidades: [],
            selectCidades: 'key0',
            bairro: [],
            selectBairro: 'key0',
            especialidade: [],
            selectEspecialidade: 'key0',
            buttonDisable: true
        }).then(() => this.getEstados());
    }

    onValueSelectEstado(value) {
        this.setStateAsyc({
            selectEstado: value,
            cidades: [],
            selectCidades: 'key0',
            bairro: [],
            selectBairro: 'key0',
            especialidade: [],
            selectEspecialidade: 'key0',
            buttonDisable: true
        }).then(() => this.getCidades());
    }

    onValueSelectCidades(value) {
        this.setStateAsyc({
            selectCidades: value,
            bairro: [],
            selectBairro: 'key0',
            especialidade: [],
            selectEspecialidade: 'key0',
            buttonDisable: true
        }).then(() => this.getBairro());
    }

    onValueSelectBairro(value) {
        this.setStateAsyc({
            selectBairro: value,
            especialidade: [],
            selectEspecialidade: 'key0',
            buttonDisable: true
        }).then(() => this.getEspecialidade());
    }

    onValueSelectEspecialidade(value) {
        this.setStateAsyc({
            selectEspecialidade: value,
            buttonDisable: true
        }).then(() => this.enableButton());
    }

    pesquisar() {
        const url =
            Server.JSON +
            'json_guia_medico.asp?modo=' +
            this.getModo() +
            '&plano=' +
            this.state.selectPlanos +
            '&estado=' +
            this.state.selectEstado +
            '&cidade=' +
            this.state.selectCidades +
            '&bairro=' +
            this.state.selectBairro +
            '&especialidade=' +
            this.state.selectEspecialidade;

            console.log(url)
        fetch(url)
            
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                this.props.navigation.navigate('ResultadoBusca', {
                    data: responseJson,
                    title: 'Resultados',
                    subTitle:
                        'Abaixo o resultados da pesquisa'
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <Base navigation={this.props.navigation}>
                <HeaderGoBack
                    navigation={this.props.navigation}
                    title={'Rede Credenciada'}
                />
                <Content
                    style={{ marginBottom: 55, backgroundColor: '#f8f8f8' }}
                >
                    <View
                        style={{
                            marginLeft: 20,
                            marginTop: 20,
                            marginRight: 20
                        }}
                    >
                        <H3
                            style={{
                                fontWeight: 'bold',
                                color: ColorsScheme.ASENT_COLOR
                            }}
                        >
                            BUSCA COMBINADA
                        </H3>
                        <Text style={{ fontSize: 12 }}>
                            Selecione abaixo o tipo
                        </Text>
                    </View>
                    <Form
                        style={{
                            marginTop: 20,
                            marginLeft: 20,
                            marginRight: 20
                        }}
                    >
                        <ButtonGroup
                            onPress={this.updateIndex.bind(this)}
                            selectedIndex={this.state.selectedIndex}
                            buttons={['Medico','Prestadores']}
                            selectedButtonStyle={{
                                backgroundColor: ColorsScheme.ASENT_COLOR
                            }}
                            containerStyle={{
                                marginBottom: 0,
                                width: '100%',
                                marginLeft: 0
                            }}
                        />
                        {this.state.planos.length != 0 ? (
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
                                    INFORME PLANO
                                </Text>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Selecione"
                                    iosIcon={<FontAwesome5 name="angle-down" />}
                                    style={{ width: '100%', color: "#000000" }}
                                    selectedValue={this.state.selectPlanos}
                                    onValueChange={this.onValueSelectPlanos.bind(
                                        this
                                    )}
                                >
                                    <Picker.Item
                                        label="Selecione..."
                                        value="key0"
                                    />
                                    {this.state.planos.map(item => (
                                        <Picker.Item
                                            label={item.nomeplano}
                                            value={item.nplano}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        ) : null}
                        {this.state.estabelecimentos.length != 0 ? (
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
                                    INFORME O TIPO DE ESTABELECIMENTO
                                </Text>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Selecione plano"
                                    iosIcon={<FontAwesome5 name="angle-down" />}
                                    style={{ width: '100%', color: "#000000" }}
                                    selectedValue={this.state.selectEstabelecimento}
                                    onValueChange={this.onValueSelectEstabelecimento.bind(
                                        this
                                    )}
                                >
                                    <Picker.Item
                                        label="Selecione..."
                                        value="key0"
                                    />
                                    {this.state.estabelecimentos.map(item => (
                                        <Picker.Item
                                            label={item.estabelecimento}
                                            value={item.seq_class_propria}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        ) : null}
                        {this.state.estados.length != 0 ? (
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
                                    iosHeader="Selecione plano"
                                    iosIcon={<FontAwesome5 name="angle-down" />}
                                    style={{ width: '100%', color: "#000000" }}
                                    selectedValue={this.state.selectEstado}
                                    onValueChange={this.onValueSelectEstado.bind(
                                        this
                                    )}
                                >
                                    <Picker.Item
                                        label="Selecione..."
                                        value="key0"
                                    />
                                    {this.state.estados.map(item => (
                                        <Picker.Item
                                            label={item.nomeestado}
                                            value={item.uf}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        ) : null}
                        {this.state.cidades.length != 0 ? (
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
                                    INFORME A CIDADE
                                </Text>

                                <Picker
                                    mode="dropdown"
                                    iosHeader="Selecione plano"
                                    iosIcon={<FontAwesome5 name="angle-down" />}
                                    style={{ width: '100%', color: "#000000" }}
                                    selectedValue={this.state.selectCidades}
                                    onValueChange={this.onValueSelectCidades.bind(
                                        this
                                    )}
                                >
                                    <Picker.Item
                                        label="Selecione..."
                                        value="key0"
                                    />
                                    {this.state.cidades.map(item => (
                                        <Picker.Item
                                            label={item.nomecidade}
                                            value={item.ncidade}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        ) : null}
                        {this.state.bairro.length != 0 ? (
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
                                    INFORME O BAIRRO
                                </Text>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Selecione plano"
                                    iosIcon={<FontAwesome5 name="angle-down" />}
                                    style={{ width: '100%', color: "#000000" }}
                                    selectedValue={this.state.selectBairro}
                                    onValueChange={this.onValueSelectBairro.bind(
                                        this
                                    )}
                                >
                                    <Picker.Item
                                        label="Selecione..."
                                        value="key0"
                                    />
                                    {this.state.bairro.map(item => (
                                        <Picker.Item
                                            label={item.nomebairro}
                                            value={item.nbairro}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        ) : null}
                        {this.state.especialidade.length != 0 ? (
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
                                    INFORME A ESPECIALIDADE
                                </Text>
                                <Picker
                                    mode="dropdown"
                                    iosHeader=""
                                    iosIcon={<FontAwesome5 name="angle-down" />}
                                    style={{ width: '100%', color: "#000000" }}
                                    selectedValue={
                                        this.state.selectEspecialidade
                                    }
                                    onValueChange={this.onValueSelectEspecialidade.bind(
                                        this
                                    )}
                                >
                                    <Picker.Item
                                        label="Selecione..."
                                        value="key0"
                                    />
                                    {this.state.especialidade.map(item => (
                                        <Picker.Item
                                            label={item.nespecialidade}
                                            value={item.especialidade}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        ) : null}
                        <Button
                            disabled={this.state.buttonDisable}
                            block
                            onPress={this.pesquisar.bind(this)}
                            style={[
                                {
                                    marginTop: 20,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    marginBottom:40
                                },
                                !this.state.buttonDisable
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
                </Content>
            </Base>
        );
    }
}
