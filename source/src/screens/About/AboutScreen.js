import React, { Component } from "react";
import {
    StyleSheet,
    StatusBar,
    View,
    ImageBackground,
    Image,
    Platform
} from "react-native";
import { Container, Content, Icon, Button, Text, Root } from "native-base";
import ColorsScheme from "../../settings/ColorsScheme";
import Version from '../../settings/Version';


export default class AboutScreen extends Component {
    render() {
        const { ANDROID, IOS } = Version
        return (
            <Root>
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
                    <Image
                        style={{ width: 200.6, height: 124 }}
                        source={require('../../assets/jpfTransparente.png')}
                        resizeMode="contain"
                    />

                    <Text
                        style={{
                            textAlign: "center",
                            color: ColorsScheme.ASENT_COLOR,
                            fontSize:12
                        }}
                    >
                        <Text style={{ fontSize: 14 }}>Versāo</Text>
                        <Text style={{ fontSize: 14 }}> {Platform.OS === "ios" ? IOS : ANDROID}</Text>
                    </Text>
                    <Text
                        style={{
                            textAlign: "center",
                            padding: 5,
                            color: ColorsScheme.ASENT_COLOR,
                           
                        }}
                    >
                        <Text style={{ fontSize:14}}>www.extremamedic.com</Text>
                    </Text>

                    <Text
                        style={{
                            textAlign: "center",
                            padding: 10,
                            position: 'absolute',
                            bottom: 7,
                            color: ColorsScheme.ASENT_COLOR,
                            fontSize:14
                        }}
                    >
                        Desenvolvido por Adaptweb ©
                    </Text>
                </ImageBackground>
                <Button
                    transparent
                    onPress={() => this.props.navigation.goBack()}
                    //onPress={()=>alert("dfsfsd")}
                    style={[
                        {
                            position: "absolute"
                        },
                        Platform.OS == "ios" ? { top: 15 } : {}
                    ]}
                >
                    <Icon name="arrow-back" style={{ color: "black" }} />
                </Button>
            </Root>
        );
    }
}
