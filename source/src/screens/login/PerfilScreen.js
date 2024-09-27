import React, { Component } from 'react';
import {
    StyleSheet,
    StatusBar,
    View,
    AppState
} from 'react-native';
import ColorsScheme from '../../settings/ColorsScheme';
import Base from '../../components/Base';
import {
    Container,
    Header,
    Left,
    Body,
    Title,
    Right,
    Content,
    Card,
    CardItem,
    Button,
    Text,
    H2
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HeaderGoBack from '../../components/HeaderGoBack';

export default class PerfilScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            usuario: {}
        };
        AsyncStorage.getItem('@usuario')
            .then(val => {
                this.setState({
                    nome: JSON.parse(val).nome,
                    usuario: JSON.parse(val)
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = nextAppState => {
        console.log(nextAppState)
        this.props.navigation.navigate('Carteirinha')
    };
    sair() {
        AsyncStorage.clear()
            .then(() => {
                this.props.navigation.navigate('Login');
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <Base navigation={this.props.navigation}>
                <HeaderGoBack
                    title="Perfil"
                    navigation={this.props.navigation}
                />
                <Content style={{ padding: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <View>
                            <FontAwesome5
                                name={'user'}
                                solid
                                style={{
                                    paddingLeft: 15,
                                    fontSize: 120,
                                    color: '#f2f2f2',
                                    marginTop: 50
                                }}
                            />
                        </View>
                    </View>

                    <H2 style={{ textAlign: 'center', marginTop: 20 }}>
                        {this.state.nome}
                    </H2>
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>
                        {this.state.usuario.email}
                    </Text>
                    <Text style={{ textAlign: 'center', marginTop: 10 }}>
                        {this.state.usuario.nascimento}
                    </Text>
                    
                    <Button
                        block
                        style={{
                            marginTop: 30,
                            marginRight: 20,
                            marginLeft: 20
                        }}
                        onPress={() =>
                            this.props.navigation.navigate('AlterarSenha')
                        }
                    >
                        <Text style={{fontSize: 12}}>Alterar senha</Text>
                    </Button> 
                   
                    <Button
                        block
                        danger
                        style={{
                            marginTop: 20,
                            marginRight: 20,
                            marginLeft: 20
                        }}
                        onPress={() => this.sair()}
                    >
                        <Text style={{fontSize: 12}}>Sair</Text>
                    </Button>
                </Content>
            </Base>
        );
    }
}
