import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Image,
    BackHandler,
    ImageBackground,
    Platform
} from 'react-native';
import { Text, Root, Button } from 'native-base';
import ColorsScheme from '../../settings/ColorsScheme';
import Version from '../../settings/Version';

export default class SelectScreen extends Component {
    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props); 
        this._didFocusSubscription = props.navigation.addListener( 
            'didFocus',
            (payload) =>
                BackHandler.addEventListener(
                    'hardwareBackPress',
                    this.onBackButtonPressAndroid
                )
        );
    }
    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener(
            'willBlur',
            payload =>
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    this.onBackButtonPressAndroid
                )
        );
        
    }

    onBackButtonPressAndroid = () => {
        BackHandler.exitApp();
    };
    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    render() {
        const { ANDROID, IOS } = Version
        return (
            <Root>
                <ImageBackground
                    source={require('../../assets/fundoNovo.png')}
                    style={{ width: '100%', height: '100%' }}
                >
                    <View style={styles.container}>
                        <StatusBar
                            backgroundColor={ColorsScheme.ASENT_COLOR}
                            barStyle="light-content"
                        />
                        <Image
                            style={{ width: 350.6, height: 274, alignSelf: 'center' }}
                            source={require('../../assets/JPFNew.png')}
                            resizeMode="contain"
                        />

                        <View
                            style={[
                                {
                                    marginTop: 180,
                                    justifyContent: 'center',
                                    // alignItems: 'center'
                                }
                            ]}
                        >
                            <Button
                                style={Platform.OS == "ios" ? {margin:10,
                                    backgroundColor: ColorsScheme.ASENT_COLOR} : {
                                    // width:"90%",
                                    margin: 10,
                                    backgroundColor: ColorsScheme.ASENT_COLOR
                                }}
                                rounded
                                dark
                                block
                                onPress={() =>
                                    this.props.navigation.navigate('Login')
                                }
                            >
                                <Text style={
                                Platform.OS == "ios" ? {textAlign:"center", fontSize:11} : {fontSize:11}}>
                                    {"JÁ SOU ASSINANTE".toUpperCase()}
                                </Text>
                            </Button>
                            <Button
                                style={{
                                    margin: 10,
                                    color: ColorsScheme.ASENT_COLOR
                                }}
                                rounded
                                bordered
                                dark
                                block
                                onPress={() =>
                                    this.props.navigation.navigate('WebView', {
                                        title: "Guia JPF",
                                        url: 'https://www.jornalpf.com.br/'
                                    })
                                }
                            >
                                <Text style={{ fontSize: 11 }}>
                                    AINDA NÃO SOU ASSINANTE
                                </Text>
                            </Button>
                        </View>
                        <Text style={{ fontSize: 12, alignSelf: 'center' }}>Versão {Platform.OS === "ios" ? IOS : ANDROID}</Text>
                    </View>
                </ImageBackground>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
    }
});
