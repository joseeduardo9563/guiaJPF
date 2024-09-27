import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Clipboard,
  FlatList,
  Linking,
  Keyboard,
  Alert,
  Platform
} from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Text,
  Card,
  CardItem,
  Toast,
  Grid,
  Col,
  Content,
  Badge,
  Row,
  Spinner,
  Button,
  Root,
  Picker
} from "native-base";
import numeral from 'numeral';
import 'numeral/locales';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColorsScheme from "../../settings/ColorsScheme";
import Server from "../../settings/Server";
import moment from "moment/min/moment-with-locales";
// import moment from ''
import RenderIf from "../../components/RenderIf";
import { TextMask } from "react-native-masked-text";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Base from '../../components/Base';
import HeaderGoBack from '../../components/HeaderGoBack';
import { NavigationEvents } from 'react-navigation';
import SemInformacao from "../../components/SemInformacao";
import SpinnerDrawer from '../../components/Spinner';

export default class ResultCopartScreen extends Component{
  constructor(props){
    super(props);

    const mesinicio = this.props.navigation.getParam('mesInicio', '08');
    const anoinicio = this.props.navigation.getParam('anoInicio', '2020');
    const mesfim = this.props.navigation.getParam('mesFim', '08');
    const anofim = this.props.navigation.getParam('anoFim', '2020');
    const empresa = this.props.navigation.getParam('empresa', '000000');
    const tipo = this.props.navigation.getParam('tipo', 'Todos')
    this.state = {
      isloading: false,
      isFail: false,
      mesinicio: mesinicio,
      anoinicio: anoinicio,
      mesfim: mesfim,
      anofim: anofim,
      nome_empresa: '',
      empresa: empresa,
      tipo: tipo,
      user: {},
      data: [],
      data2: []
    }
  }

  componentDidMount() {
    this.doloading();
    // this.getAno()
  }

  doloading() {
    AsyncStorage.getItem('@usuario')
      .then(val => {
        this.setState({
          user: JSON.parse(val)
        }, () => {
          this._doloading();
          this.getNomeEmpresa();
          // this.getResult();
        });
      })
      .catch(err => {
        console.log(err);
      });

  }

  // _doloading(){
  //   this.setState({ isloading: true })
  //   const { user, mesinicio, anoinicio, mesfim, anofim, empresa } = this.state;

  //   const url = `${Server.API}coparticipacao/getCoparticipacao.asp?matricula=${user.matricula}&empresa=${empresa}&mesinicio=${mesinicio}/${anoinicio}&mesfim=${mesfim}/${anofim}`;
  //   console.log(url);

  //   fetch(url)
  //   .then(response => response.json())
  //   .then(res => {
  //     this.setState({ data: res, isloading: false, isFail: false })
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     this.setState({ isloading: false, isFail: true })
  //   })
  // }

  dataFinal(mes, ano){
    // let data = ""
    switch (mes) {
      case "1":
        return `31/${mes}/${ano}`;
      case "2":
        return `28/${mes}/${ano}`;
      case "3":
        return `31/${mes}/${ano}`;
      case "4":
        return `30/${mes}/${ano}`;
      case "5":
        return `31/${mes}/${ano}`;
      case "6":
        return `30/${mes}/${ano}`;
      case "7":
        return `31/${mes}/${ano}`;
      case "8":
        return `31/${mes}/${ano}`;
      case "9":
        return `30/${mes}/${ano}`;
      case "10":
        return `31/${mes}/${ano}`;
      case "11":
        return `30/${mes}/${ano}`;
      case "12":
        return `31/${mes}/${ano}`;
      default:
        return `30/${mes}/${ano}`
    }
  }

  onScreenFocus(){
    this.setState({
      isloading: true
    });
    this.doloading()
  }

  _doloading(){
    this.setState({ isloading: true })

    const { user, mesinicio, anoinicio, mesfim, anofim, empresa, tipo } = this.state;

    let url = "";

    if(empresa === "1000"){
      url = `${Server.API}coparticipacao/getCopartInd.asp?matricula=${user.matricula}&mesinicio=01/${mesinicio}/${anoinicio}&mesfim=${this.dataFinal(mesfim, anofim)}&tipo=${tipo}`;
    } else {
      url = `${Server.API}coparticipacao/getCoparticipacao.asp?matricula=${user.matricula}&empresa=${empresa}&mesinicio=${mesinicio}/${anoinicio}&mesfim=${mesfim}/${anofim}&tipo=${tipo}`;
    }
    console.log(url);

    fetch(url)
    .then(response => response.json())
    .then(res => {
      this.setState({ data: res, isloading: false, isFail: false })
    })
    .catch(err => {
      console.log(err);
      this.setState({ isloading: false, isFail: true })
    })
  }

  getNomeEmpresa(){
    // this.setState({ isloading: true })

    const { empresa } = this.state

    const url = `${Server.API}coparticipacao/getEmpresaById.asp?empresa=${empresa}`;

    fetch(url)
    .then(response => response.json())
    .then(res => {
      const { nome_empresa } = res

      this.setState({ nome_empresa })
    })
    .catch(err => {
      console.log(err)

      // this.setState({ isloading: false, isFail: true })
    })
  }

  printTipo(idtipo) {
    switch (idtipo) {
      case "1":
        return "CONSULTA";
      case "2":
        return "INTERNAÇÃO";
      case "4":
        return "EXAMES";
      case "6":
        return "PRESTAÇÃO DE SERVIÇO";
      case "7":
        return "PROCEDIMENTO";
      case "8":
        return "ORÇAMENTO ODONTOLÓGICO";
      case "21":
        return "PEC";
      default:
        return "";
    }
  }

  render(){
    numeral.locale('pt-br')
    console.log(this.state)
    const { data, nome_empresa, mesinicio, anoinicio, mesfim, anofim } = this.state

    const datainicio = `${mesinicio < 10 ? '0' : ''}${mesinicio}/${anoinicio}`
    const datafim = `${mesfim < 10 ? '0' : ''}${mesfim}/${anofim}`

    let soma_total = 0

    console.log(datainicio)
    console.log(datafim)

    return (
      <Root>
        <Container>
          <Base navigation={this.props.navigation}>
            <NavigationEvents onWillFocus={payload => this.onScreenFocus()} />

            <HeaderGoBack
              navigation={this.props.navigation}
              title={'Coparticipação'}
            />

            <Content style={{ marginBottom: 55 }}>
              <RenderIf condition={!this.state.isloading} else={
                <SpinnerDrawer
                  style={{ marginTop: 105 }}
                  text="Carregando..."
                  textColor={"#000000"}
                  spinColor={ColorsScheme.MAIN_COLOR}
                />
              }>
                <RenderIf condition={!this.state.isFail} else={
                  <View>
                    <SemInformacao
                      error={true}
                    // refreshing={this.state.isloading}
                    // onRefresh={this._doloading()}
                    />

                    <Button
                      block
                      rounded
                      style={{
                        marginTop: 55,
                        margin: 20,
                        backgroundColor: ColorsScheme.MAIN_COLOR
                      }}
                      onPress={() => {
                        this.doloading();
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF"
                        }}
                      >Tentar novamente</Text>
                    </Button>
                  </View>
                }>
                  <RenderIf condition={data.length > 0} else={
                    <SemInformacao
                      // refreshing={this.state.isloading}
                      // onRefresh={this._doloading()}
                    />
                  }>
                    <View style={{ margin: "4%", marginTop: 5 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          marginTop: 25,
                          // marginBottom: 23
                        }}
                      >RELATÓRIO DE GUIAS DE COPARTICIPAÇÃO COBRADAS EM NF</Text>

                      <Text
                        style={{
                          fontSize: 14,
                          // marginTop: 25,
                          marginBottom: 23
                        }}
                      >Período de {datainicio} a {datafim}</Text>

                      <Text
                        style={{
                          fontSize: 14,
                          // marginTop: 25,
                          marginBottom: 20
                        }}
                      >{nome_empresa}</Text>

                      {data.map((d, index) => {
                        let soma_cobranca = 0
                        const { procedimentos } = d
                        
                        return (
                          <View>
                            {/* <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "bold",
                                marginBottom: "2%",
                                marginTop: "5%"
                              }}
                            >
                              Número guia: {d.numero_guia}
                            </Text> */}

                            <Text
                              style={{
                                fontSize: 12,
                                marginTop: "5%",
                                marginBottom: "2%",
                                marginTop: "5%"
                              }}
                            >
                              <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                                Número guia:
                              </Text>{" "}{d.numero_guia}
                            </Text>

                            <Card>
                              {

                                procedimentos.map((item, index) => {
                                  soma_cobranca += parseFloat(item.total_cobranca.replace(',','.'))
                                  soma_total += parseFloat(item.total_cobranca.replace(',','.'))
                                  console.log("soma", soma_cobranca)
                                  return (

                                    <CardItem
                                      style={{ marginBottom: 0 }}
                                      bordered
                                      key={index}
                                    >
                                      <Body>



                                        <Text style={{
                                          fontSize: 14,
                                          //marginBottom: 10,
                                          fontWeight: 'bold',
                                          //alignSelf: "center"
                                        }}>
                                          {item.procedimento}
                                        </Text>

                                        <Text
                                          style={{
                                            fontSize: 12,
                                            //fontWeight: 'bold',
                                            //marginBottom: 15,
                                            //alignSelf: "center"
                                          }}
                                        >
                                          {item.benef}
                                        </Text>



                                        <Text style={{ fontSize: 12 }}>
                                          Matrícula: {item.matricula}
                                        </Text>

                                        <RenderIf condition={item.profissional_sol_nome != ""}>
                                          <Text style={{ fontSize: 12 }}>
                                            Solicitado por: {item.profissional_sol_nome}
                                          </Text>
                                        </RenderIf>

                                        <RenderIf condition={item.profissional_real_nome != ""}>
                                          <Text style={{ fontSize: 12 }}>
                                            Realizado por: {item.profissional_real_nome}
                                          </Text>
                                        </RenderIf>

                                        <Text style={{ fontSize: 12 }}>
                                          Código TISS: {item.cod_tiss}
                                        </Text>
                                        
                                        <Text style={{ fontSize: 12 }}>
                                          Tipo da guia: {this.printTipo(item.tipo_guia)}
                                        </Text>


                                        <Text style={{ fontSize: 12, marginTop: "2%" }}>
                                          <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                                            Total de cobrança pelo procedimento:
                                            </Text>{" "}{numeral(item.total_cobranca).format("$ 0,0.00")}
                                        </Text>

                                      </Body>
                                    </CardItem>
                                  )
                                })}
                              <CardItem
                                style={{ marginBottom: 0 }}
                                bordered
                                key={index}
                              >
                                <Text style={{ fontSize: 12, marginTop: "2%" }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                                    Total da guia:
                                  </Text>{" "}{numeral(soma_cobranca).format("$ 0,0.00")}
                                </Text>
                              </CardItem>
                            </Card>
                          </View>
                        )
                      })}

                      <Text
                        style={{
                          fontSize: 14,
                          marginTop: "5%",
                          marginBottom: "2%",
                          marginTop: "5%"
                        }}
                      >
                        <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                          Total no período:
                        </Text>{" "}{numeral(soma_total).format("$ 0,0.00")}
                      </Text>
                    </View>
                  </RenderIf>
                </RenderIf>
              </RenderIf>
            </Content>
          </Base>
        </Container>
      </Root>
    )
  }
}