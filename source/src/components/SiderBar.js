import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Image,
    TouchableHighlight,
    SectionList,
    Text,
    StyleSheet, 
    Linking
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

import { ListItem, Right, Left, Body } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome5';
import ComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const iconSize = 20;
const iconColor = '#666666';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Select' })],
});

class SideBarDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: {},
            hasUsuario: false
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('@usuario').then(val => {
            if (val) {
                this.setState({ usuario: JSON.parse(val), hasUsuario: true });
            }
        });
    }

    getMenuItems() {
        const { navigate, dispatch } = this.props.navigation;

        let arr = [
            {
                title: 'Menu',
                data: [
                    {
                        type: 'item',
                        action: () => navigate('WebView', {
                                        title: "Jornal de Poço Fundo",
                                        url: 'https://www.jornalpf.com.br/'
                        }),
                        icon: (
                            <Icon
                                color={iconColor}
                                size={iconSize}
                                name={'newspaper'}
                            />
                        ),
                        displayName: 'Notícias',
                        name: 'noticias'
                    },
                    {
                        type: 'item',
                        action: () => navigate('WebViewGuia', {
                                        title: "Guia JPF",
                                        url: 'https://lfsoft.tech/jornalpf/'
                        }),
                        icon: (
                            <Icon
                                color={iconColor}
                                size={iconSize}
                                name={'address-book'}
                            />
                        ),
                        displayName: 'Guia de endereços',
                        name: 'guia'
                    },
                ]
            },
            {
                title: 'Meu Plano',
                data: [
                    {
                        type: 'item',
                        action: () => {
                            navigate('About');
                        },
                        icon: (
                            <Icon
                                solid
                                color={iconColor}
                                size={iconSize}
                                name={'info-circle'}
                            />
                        ),
                        fontAwesomeIcon: 'info-circle',
                        displayName: 'Sobre',
                        name: 'about'
                    }

                ]
            }
        ];
        let obb1 = {
            type: 'item',
            action: () => navigate('Perfil'),
            icon: (
                <Icon solid color={iconColor} size={iconSize + 1} name={'user'} />
            ),
            displayName: 'Perfil',
            name: 'Perfil'
        };
        let obb2 = {

            type: 'item',

            action: () => {
                navigate('Carteirinha', {
                    data: this.state.usuario
                })
            },
            icon: (
                <Icon
                    solid
                    color={iconColor}
                    size={iconSize - 2}
                    name={'id-card'}
                />
            ),
            displayName: 'Cartão virtual',
            name: 'Cartao virtual'
        };
        let obb3 = {
            type: 'item',
            action: () => this.props.openModalIR(),
            icon: (
                <Icon
                    solid
                    color={iconColor}
                    size={iconSize - 1}
                    name={'hand-holding-usd'}
                />
            ),
            displayName: 'Imposto de Renda',
            name: 'Imposto de Renda'
        };

        let obb4 = {
            type: 'item',
            action: () => {
                navigate('Financeiro', {
                    data: this.state.usuario
                })
            },
            icon: (
                <Icon
                    solid
                    color={iconColor}
                    size={iconSize - 3}
                    name={'money-bill'}
                />
            ),
            displayName: 'Financeiro',
            name: 'Financeiro'
        };

        let obb5 = {

            type: 'item',

            action: () => {
                navigate('Contrato', {
                    data: this.state.usuario
                })
            },
            icon: (
                <Icon
                    solid
                    color={iconColor}
                    size={iconSize - 2}
                    name={'file-signature'}
                />
            ),
            displayName: 'Detalhes do Contrato',
            name: 'Contrato'
        };

        let obb6 = {

            type: 'item',
            action: () => {
                navigate('Utilizacoes2', {
                    data: this.state.usuario
                })
            },
            icon: (
                <Icon
                    solid
                    color={iconColor}
                    size={iconSize + 7}
                    name={'clipboard-list'}
                />
            ),
            displayName: 'Utilizações',
            name: 'Utilizacoes'
        };

        let obb7 = {

            type: 'item',
            action: () =>
                // AsyncStorage.clear().then(() => navigate('Select')),
                AsyncStorage.clear().then(() => dispatch(resetAction)),
            icon: (
                <Icon
                    solid
                    color={iconColor}
                    size={iconSize}
                    name={'sign-out-alt'}
                />
            ),
            displayName: 'Sair',
            name: 'Sair'
        };

        let obb8 = {
            type: 'item',
            action: () => navigate('Coparticipacao'),
            icon: (
                <Icon solid color={iconColor} size={iconSize + 1} name={'receipt'} />
            ),
            displayName: 'Coparticipacao',
            name: 'Coparticipacao'
        };

        let obb9 = {

            type: 'item',
            action: () => navigate('Select'),
            icon: (
                <Icon
                    solid
                    color={iconColor}
                    size={iconSize}
                    name={'sign-in-alt'}
                />
            ),
            displayName: 'Sou assinante',
            name: 'Login'
        };

        let obb10 = {
            type: 'item',
            action: () => Linking.openURL("http://187.60.158.90:8080/boletoonline/"),
            icon: (
                <Icon
                    solid
                    color={iconColor}
                    size={iconSize - 3}
                    name={'money-bill'}
                />
            ),
            displayName: 'Segunda via de boleto',
            name: 'Boleto'
        };



        // if (this.state.hasUsuario) {
        //     if(this.state.usuario.empresa == 1000){
        //         arr[1].data.splice(-1, 0, obb1, obb2, obb3, obb4, obb10, obb5, obb8, obb6, obb7); // por aq tbm o obb3
        //     } else {
        //         arr[1].data.splice(-1, 0, obb1, obb2, obb10, obb5, obb8, obb6, obb7); // por aq tbm o obb3
        //     }
            
        // }
        // else {
        //     arr[1].data.push(obb9);
        // }

        if (this.state.hasUsuario) {
            arr[1].data.splice(-1, 0, obb7);
        }
        else {
            arr[1].data.push(obb9);
        }

        return arr;
    }

    renderItem(item) {
        return (
            <TouchableHighlight>
                <ListItem noBorder icon onPress={item.item.action}>
                    <Left>{item.item.icon}</Left>
                    <Body>
                        <Text
                            style={styles.colorItem}
                        >{item.item.displayName}</Text>
                    </Body>
                    <Right />
                </ListItem>
            </TouchableHighlight>
        );
    }

    renderSection(section) {
        return (
            <Text style={styles.sectionHeader}>{section.section.title}</Text>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/JPFNew.png')}
                    resizeMode="contain"
                    style={{
                        height: 204,
                        width: 280.6,
                        alignSelf: 'stretch',
                        position: 'absolute',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />

                <SectionList
                    style={{ marginTop: 122 }}
                    sections={this.getMenuItems()}
                    renderItem={item => this.renderItem(item)}
                    renderSectionHeader={section => this.renderSection(section)}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: 'white'
    },
    sectionHeader: {
        paddingTop: 8,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 8,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
        color: "#000000",
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    },
    colorItem: {
        color: "#000000"
    },
});

export default SideBarDrawer;
