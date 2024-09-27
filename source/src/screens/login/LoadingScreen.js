import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Image,
    ImageBackground,
    Alert
} from 'react-native';
import { Spinner, Text, Toast } from 'native-base';
import ColorsScheme from '../../settings/ColorsScheme';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Server from '../../settings/Server';

export default class LoadingScreen extends Component {
    componentDidMount() {
        setInterval(() => {
            NetInfo.fetch().then(isConnected => { // verifica a cada 3 segundos se tem internet
                if (!isConnected) {

                    Alert.alert(
                        "Sem internet",
                        "Verifique sua conexão e tente novamente.",
                        [

                            {
                                text: "OK",
                            }
                        ],
                        { cancelable: false }
                    )
                }
            });
        }, 10000);
        AsyncStorage.getItem('@usuario').then(val => { //se usuario estiver registrado na "cache" do celular ele loga direto na home else select
            if(val){
                let user = JSON.parse(val);
                // this.getAceite(user.matricula);
                this.props.navigation.navigate('Carteirinha');
            }else{
                this.props.navigation.navigate('Select');
            }
        }); 
    }

    getAceite(matricula){
        // const { matricula } = this.state;

        axios
        .get(`${Server.GET}getTermoAceite/${matricula}`)
        .then(res => {
            console.log(res);

            if(res.data && res.data.flag_termo == 1){
                this.props.navigation.navigate('Carteirinha')
            } else {
                this.props.navigation.navigate('Termos')
            }
        })
        .catch(err => {
            console.log(err);

            this.props.navigation.navigate('Carteirinha')
        })
    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/fundoNovo.png')}
                style={{
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <StatusBar
                    backgroundColor={ColorsScheme.ASENT_COLOR}
                    barStyle="light-content"
                />
                 <Image
                    style={{ width: 350.6, height: 274 }}
                    source={require('../../assets/JPFNew.png')}
                    resizeMode="contain"
                />
                <Spinner color={ColorsScheme.ASENT_COLOR} />
            </ImageBackground>
        );
    }
}
