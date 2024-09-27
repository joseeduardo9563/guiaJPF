import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Drawer, Root, Container, Text, View } from 'native-base';

import SideBar from './SiderBar';
import MyFooter from './MyFooter';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ColorsScheme from '../settings/ColorsScheme';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationEvents } from 'react-navigation'

Drawer.defaultProps.styles.mainOverlay.elevation = 0;

export default class Base extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            isVisibleIR: false
        };
    }

    closeDrawer = () => {
        this.drawer._root.close();
    };

    openDrawer = () => {
        this.drawer._root.open();
    };
    openModal = () => {
        this.closeDrawer();
        this.setState({ isVisible: true });
    };
    closeModal = () => {
        this.setState({ isVisible: false });
    };
    openModalIR = () => {
        this.closeDrawer();
        this.setState({ isVisibleIR: true });
    };
    closeModalIR = () => {
        this.setState({ isVisibleIR: false });
    };

    render() {
        return (
            
                
                <Drawer
                    ref={ref => {
                        this.drawer = ref;
                    }}
                    content={
                        <SideBar
                            navigation={this.props.navigation}
                            openModal={this.openModal.bind(this)}
                            openModalIR={this.openModalIR.bind(this)}
                        />
                    }
                    onClose={() => this.closeDrawer()}
                >
                    <Root>
                    <Overlay
                        isVisible={this.state.isVisibleIR}
                        width="auto"
                        height="auto"
                        onBackdropPress={() =>
                            this.setState({ isVisibleIR: false })
                        }
                    >
                        <View style={{ padding: 20 }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    color: '#444',
                                    textAlign: 'center',
                                    fontSize: 19
                                }}
                            >
                                Imposto de Renda
                            </Text>
                            {/* <Text
                                style={{
                                    color: '#444',
                                    textAlign: 'center',
                                    fontSize: 8
                                }}
                            >
                                Selecione umas opções para iniciar a busca
                            </Text> */}
                            <Button
                                buttonStyle={{
                                    margin: 10,
                                    backgroundColor: ColorsScheme.MAIN_COLOR,
                                    marginTop: 30,
                                    width: 200
                                }}
                                titleStyle={{ color: '#fff' }}
                                onPress={() => {
                                    this.closeModalIR();
                                    this.closeDrawer();
                                    AsyncStorage.getItem('@usuario').then(
                                        val => {
                                            if (val) {
                                                this.setState(
                                                    {
                                                        usuario: JSON.parse(
                                                            val
                                                        ),
                                                        hasUsuario: true
                                                    },
                                                    () => {
                                                        Linking.openURL(
                                                            `http://serpram.com.br/app_json/Saude/IR/IRvisualizar.asp?matricula=${
                                                                this.state
                                                                    .usuario
                                                                    .matricula
                                                            }&autenticacao=${this.state.usuario.senha.substring(
                                                                0,
                                                                10
                                                            )}&ano=${new Date().getFullYear() -
                                                                1}`
                                                        );
                                                    }
                                                );
                                            }
                                        }
                                    );
                                }}
                                title="Abrir"
                            />
                            <Button
                                buttonStyle={{
                                    margin: 10,
                                    backgroundColor: ColorsScheme.MAIN_COLOR
                                }}
                                titleStyle={{ color: '#fff' }}
                                onPress={() => {
                                    this.closeModalIR();
                                    this.closeDrawer();
                                    AsyncStorage.getItem('@usuario').then(
                                        val => {
                                            if (val) {
                                                this.setState(
                                                    {
                                                        usuario: JSON.parse(
                                                            val
                                                        ),
                                                        hasUsuario: true
                                                    },
                                                    () => {
                                                        Share.open({
                                                            title: 'IR Extremamedic',
                                                            message:
                                                                'IR Extremamedic',
                                                            url: `http://serpram.com.br/app_json/Saude/IR/IRvisualizar.asp?matricula=${
                                                                this.state
                                                                    .usuario
                                                                    .matricula
                                                            }&autenticacao=${this.state.usuario.senha.substring(
                                                                0,
                                                                10
                                                            )}&ano=${new Date().getFullYear() -
                                                                1}`,
                                                            subject:
                                                                'IR Extremamedic'
                                                        });
                                                    }
                                                );
                                            }
                                        }
                                    );
                                }}
                                title="Compartilhar"
                            />
                        </View>
                    </Overlay>

                    <Overlay
                        isVisible={this.state.isVisible}
                        width="auto"
                        height="auto"
                        onBackdropPress={() =>
                            this.setState({ isVisible: false })
                        }
                    >
                        <View style={{ padding: 20 }}>
                            <View
                                style={{
                                    alignContent: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Icon
                                    name={'user-md'}
                                    style={{
                                        fontSize: 50,
                                        textAlign: 'center',
                                        color: '#444'
                                    }}
                                />
                            </View>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    color: '#444',
                                    textAlign: 'center',
                                    fontSize: 19
                                }}
                            >
                                REDE CREDENCIADA
                            </Text>
                            <Text
                                style={{
                                    color: '#444',
                                    textAlign: 'center',
                                    fontSize: 8
                                }}
                            >
                                Selecione umas opções para iniciar a busca
                            </Text>
                            <Button
                                buttonStyle={{
                                    margin: 10,
                                    backgroundColor: ColorsScheme.MAIN_COLOR,
                                    marginTop: 30,
                                    width: 200
                                }}
                                titleStyle={{ color: '#fff' }}
                                onPress={() => {
                                    this.closeModal();
                                    this.closeDrawer();
                                    this.props.navigation.navigate(
                                        'SelectCombinada'
                                    );
                                }}
                                title="Busca Combinada"
                            />
                            <Button
                                buttonStyle={{
                                    margin: 10,
                                    backgroundColor: ColorsScheme.MAIN_COLOR
                                }}
                                titleStyle={{ color: '#fff' }}
                                onPress={() => {
                                    this.closeModal();
                                    this.closeDrawer();
                                    this.props.navigation.navigate(
                                        'SelectIsolada'
                                    );
                                }}
                                title="Busca Isolada"
                            />
                        </View>
                    </Overlay>

                    <Container style={{ backgroundColor: '#f8f8f8' }}>
                        {this.props.children}
                    </Container>
                    <MyFooter
                        openModal={this.openModal.bind(this)}
                        navigation={this.props.navigation}
                        openDrawer={this.openDrawer}
                    />
                    </Root>
                </Drawer>
            
        );
    }
}
