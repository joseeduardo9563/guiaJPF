import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, TouchableOpacity ,BackHandler, Platform} from 'react-native';
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
    Spinner,
    Text,
    H3
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import RenderIf from '../../components/RenderIf';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: {},
            isBannerActive: false,
            isloading: false 
        };
        this._didFocusSubscription = props.navigation.addListener(
            "didFocus",
            payload =>  //comando sair do app
                BackHandler.addEventListener(
                    "hardwareBackPress",
                    this.onBackButtonPressAndroid
                )
        );
    }
   
    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener(
            "willBlur",
            payload =>   //comando sair do app
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    this.onBackButtonPressAndroid
                )
        );
        AsyncStorage.getItem('@usuario').then(val => {
            if(val){

                this.setState({ usuario: JSON.parse(val), isBannerActive: true });
                console.log(this.state);
            }
        });

        this.forceUpdate();

        setTimeout(() => { // tempo  que o spinner irá rodar enquanto o componente é montado
            this.setState({isloading: true});
          }, 3000)
    }

    onBackButtonPressAndroid = () => { //comando sair do app
        BackHandler.exitApp();
    };

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }


    render() {
        console.log("Home",this.state)
        return (
            <Base navigation={this.props.navigation}>

                <Header
                    androidStatusBarColor={ColorsScheme.MAIN_COLOR}
                    style={{ backgroundColor: ColorsScheme.MAIN_COLOR }}
                    
                >
                    <Left />
                    <Body style={{ flex: 3 }}>
                        <Title style={{ color: 'white', right:15 }}>MedicGLOBAL</Title>
                    </Body>
                    <Right />
                </Header>

               <RenderIf condition={this.state.isloading} 
                        else={
                            <View style={{ 
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                //alignItems: 'stretch',
                            }}>
                                {Platform.OS == "ios" ? <Spinner color={ColorsScheme.MAIN_COLOR}/> : 
                                   <Spinner size={100} // carrega por 3 segundos
                                   color={ColorsScheme.MAIN_COLOR}
                                   Container={{Content: 'center'}}
                               />
                        }
                             
                            </View>
                        }
                >
                
                    <View style={{ flex: 1}}>
                        <WebView
                            source={{
                                uri: 'https://serpram.com.br/noticiaAPP.asp'
                            }}
                            renderLoading
                            style={{ marginBottom: 55, flex: 1 }}
                        />
                    </View>
                </RenderIf>

               {/* irá executar apenas se usuario estiver logado */}
                <RenderIf condition={this.state.isBannerActive}> 
                    <View
                        style={{
                            position: 'absolute',
                            top: 20
                        }}
                    >
                        <View
                            style={{
                                margin: 20,
                                borderRadius: 10,
                                backgroundColor: '#fefefe',
                                shadowColor: '#000',
                                shadowOffset: { width: 20, height: 20 },
                                shadowOpacity: 1.0,
                                shadowRadius: 2,
                                elevation: 10
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    top: -10,
                                    right: 20
                                }}
                                onPress={() => {
                                    this.setState({
                                        isBannerActive: false
                                    });
                                }}
                            >
                                <FAIcon
                                    style={{
                                        backgroundColor: '#fefefe',
                                        borderRadius: 30
                                    }}
                                    
                                    size={20}
                                    solid
                                    color={ColorsScheme.ASENT_COLOR}
                                    name="times-circle"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        isBannerActive: false
                                    });
                                }}
                            >
                                <Text style={{
                                        paddingTop:15, 
                                        paddingLeft:15,
                                        paddingRight:15,
                                        paddingBottom:5,
                                        fontSize:16
                                    }}
                                >Olá {this.state.usuario.nome}</Text>
                                <Text
                                    style={{
                                        paddingTop:5, 
                                        paddingLeft:15,
                                        paddingRight:15,
                                        paddingBottom:15,
                                        fontSize:12
                                    }}
                                >
                                    Agora que estamos conectados, podemos otimizar a utilização do aplicativo.
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RenderIf>
            </Base>
        );
    }
}
