import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ColorsScheme from '../settings/ColorsScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class MyFooter extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Footer
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0
                }}
            >
                <FooterTab style={mystyles.background}>
                    <Button 
                    vertical 
                        onPress={() => this.props.navigation.navigate('WebViewGuia', {
                                        title: "Guia JPF",
                                        url: 'https://lfsoft.tech/jornalpf/'
                        })}>
                        <FontAwesome5
                            name={'address-book'}
                            solid
                            style={[mystyles.forground, { fontSize: 22 }]}
                        />
                    </Button>
                    {/* <Button
                        vertical
                        onPress={() => {
                            AsyncStorage.getItem('Favoritos').then(res => {
                                this.props.navigation.navigate(
                                    'ResultadoBusca',
                                    {
                                        data: JSON.parse(res),
                                        title: 'Favorito',
                                        subTitle:
                                            'Abaixo todos os credenciados que você marcou como Favorito'
                                    }
                                );
                            });
                        }}
                    >
                        <FontAwesome5
                            name={'heart'}
                            solid
                            style={[mystyles.forground, { fontSize: 22 }]}
                        />
                    </Button> */}
                    <Button
                        vertical
                        onPress={() => this.props.navigation.navigate('WebView', {
                            title: "Guia JPF",
                            url: 'https://www.jornalpf.com.br/'
                        })}
                    >
                        <FontAwesome5
                            name={'home'}
                            style={[mystyles.forground, { fontSize: 22 }]}
                        />
                    </Button>
                    {/* <Button
                        vertical
                        onPress={() =>
                            this.props.navigation.navigate('Contato')
                        }
                    >
                        <FontAwesome5
                            name={'comment'}
                            style={[mystyles.forground, { fontSize: 22 }]}
                            solid
                        />
                    </Button> */}
                    <Button vertical onPress={() => this.props.openDrawer()}>
                        <FontAwesome5
                            name={'bars'}
                            solid
                            style={[mystyles.forground, { fontSize: 22 }]}
                        />
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}
const mystyles = StyleSheet.create({
    background: {
        backgroundColor: ColorsScheme.MAIN_COLOR
    },
    forground: {
        color: 'white'
    }
});
