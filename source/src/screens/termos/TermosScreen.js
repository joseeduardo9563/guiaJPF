import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  Image,
  View,
  Keyboard,
  Platform,
  ImageBackground,
  ScrollView,
  ToastAndroid
} from "react-native";
import {
  Text,
  Root,
  Content,
  H3,
  Form,
  Item,
  Input,
  Button,
  Toast,
  Icon,
  Thumbnail,
  ListItem,
  CheckBox,
  Body
} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import axios from 'axios';
import { NavigationEvents } from 'react-navigation';

import ColorsScheme from "../../settings/ColorsScheme";
import SpinnerDrawer from '../../components/Spinner';
import RenderIf from "../../components/RenderIf";
import Server from "../../settings/Server";

export default class TermosScreen extends Component{
  constructor(props){
    super(props);

    this.state = {
      isloading: false,
      isFail: false,
      checkTermo: false,
      usuario: {}
    }
  }

  componentDidMount(){
    this.doloading();
  }
  
  doloading() {
    this.setState({ isloading: true })
    AsyncStorage.getItem('@usuario')
      .then(val => {
        this.setState({
          isloading: false,
          usuario: JSON.parse(val)
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  aceiteTermos(){
    this.setState({ isloading: true });

    const { usuario, checkTermo } = this.state;

    if (checkTermo) {
      const obj = {
        matricula: usuario.matricula
      }

      axios
        .post(`${Server.POST}setTermos`, obj)
        .then(res => {
          console.log(res);

          this.setState({ isloading: false })
          this.props.navigation.navigate('Carteirinha')
        })
        .catch(err => {
          console.log(err => {
            Platform.OS === "ios" ?
              Toast.show({
                text: 'Ocorreu um erro ao registrar os termos de compromisso.',
                buttonText: 'Ok',
                type: "danger",
                duration: 3000
              }) :
              ToastAndroid.show('Ocorreu um erro ao registrar os termos de compromisso.', 3000);

            this.props.navigation.navigate('Carteirinha')
          })
        })
    }
  }

  onScreenFocus(){
    this.setState({
      isloading: true,
    });

    this.doloading()
  }

  render() {
    console.log(this.state);
    return (
      <Root>
        <NavigationEvents onWillFocus={payload => this.onScreenFocus()} />
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
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '100%'
            }}
          >
            <ScrollView nestedScrollEnabled={true}>
              <RenderIf condition={!this.state.isloading} else={
                <SpinnerDrawer
                  style={{ marginTop: 105 }}
                  text="Carregando..."
                  textColor={"#000000"}
                  spinColor={ColorsScheme.MAIN_COLOR}
                />
              }>
                <View
                  style={[
                    {
                      padding: 20,
                      marginTop: "10%",
                      justifyContent: "center",
                      alignItems: 'center',
                    }
                  ]}
                >
                  <Image
                    style={{ marginBottom: 20 }}
                    source={require('../../assets/jpfTransparente.png')}
                  />
                </View>

                <H3
                  style={{
                    // marginTop: 30,
                    // marginTop: "8%",
                    paddingTop: "10%",
                    padding: 10,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: "#000000",
                    // marginTop: 80
                  }}
                >
                  TERMO DE COMPROMISSO
                </H3>

                <View
                  style={{
                    backgroundColor: "#FFFFFF",
                    margin: "5%",
                    // paddingLeft: "2%",
                    // paddingRight: "2%",
                    // paddingTop: "2%",
                    padding: "2%",
                    maxHeight: 250
                    // height: "100%"
                  }}
                >
                  <ScrollView nestedScrollEnabled={true}>
                    <Text
                      style={{
                        fontSize: 15
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
                    </Text>

                    <Form>
                      <ListItem
                        style={{
                          borderColor: "#FFFFFF"
                        }}
                      >
                        <CheckBox
                          onPress={() => {
                            this.setState({ checkTermo: !this.state.checkTermo })
                          }}
                          checked={this.state.checkTermo}
                          color={ColorsScheme.MAIN_COLOR}
                        />
                        <Body>
                          <Text
                            style={{
                              fontSize: 13
                            }}
                          >
                            Li e aceito os termos de compromisso.
                          </Text>
                        </Body>
                      </ListItem>
                    </Form>
                  </ScrollView>
                </View>
                <RenderIf condition={this.state.checkTermo}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      width: "100%",
                      // marginBottom: 35,
                    }}
                  >
                    <Button
                      small
                      block
                      // disabled={!this.state.checkTermo}
                      style={{
                        marginLeft: 20,
                        marginTop: 20,
                        marginRight: 20,
                        marginBottom: 20,
                        width: "40%",
                        backgroundColor: ColorsScheme.MAIN_COLOR,
                        alignItems: "center",
                        alignSelf: "center",
                        borderRadius: 20
                      }}

                      onPress={() => this.aceiteTermos()}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold"
                        }}
                      >
                        Prosseguir
                        </Text>
                    </Button>
                  </View>
                </RenderIf>
              </RenderIf>
            </ScrollView>
          </View>
        </ImageBackground>
      </Root>
    )
  }
}