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
  Platform,
  ToastAndroid
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColorsScheme from "../../settings/ColorsScheme";
import Server from "../../settings/Server";
import moment from "moment/min/moment-with-locales";
import RenderIf from "../../components/RenderIf";
import { TextMask } from "react-native-masked-text";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Base from '../../components/Base';
import HeaderGoBack from '../../components/HeaderGoBack';
import { NavigationEvents } from 'react-navigation';
import SemInformacao from "../../components/SemInformacao";
import SpinnerDrawer from '../../components/Spinner';

export default class CoparticipacaoScreen extends Component {
  constructor(props) {
    super(props);

    const meses = [
      {
        value: 1,
        mes: 'Janeiro'
      },
      {
        value: 2,
        mes: 'Fevereiro'
      },
      {
        value: 3,
        mes: 'Março'
      },
      {
        value: 4,
        mes: 'Abril'
      },
      {
        value: 5,
        mes: 'Maio'
      },
      {
        value: 6,
        mes: 'Junho'
      },
      {
        value: 7,
        mes: 'Julho'
      },
      {
        value: 8,
        mes: 'Agosto'
      },
      {
        value: 9,
        mes: 'Setembro'
      },
      {
        value: 10,
        mes: 'Outubro'
      },
      {
        value: 11,
        mes: 'Novembro'
      },
      {
        value: 12,
        mes: 'Dezembro'
      },
    ];

    const anoAtual = moment().format('YYYY');
    // console.log(anoAtual)

    let anoMinimo = anoAtual - 20;

    let arr = [];

    let obj = {}
     
    for(let i = anoAtual; i >= anoMinimo; i--){
      // console.log(i)
      obj = {
        ano: `${i}`,
        value: i
      }

      arr.push(obj)
    }

    this.state = {
      user: {},
      isloading: false,
      isFail: false,
      selectMesInicio: 'key0',
      selectMesFim: 'key0',
      mesesInicio: [],
      mesesFim: [],
      selectAnoInicio: 'key0',
      selectAnoFim: 'key0',
      anos: [],
      empresas: [],
      tipos: [],
      selectEmpresa: 'key0',
      selectTipo: 'key0',
      buttonDisable: true
    }
  }

  UNSAFE_componentWillMount() {

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
          // this.getAno();
          this.getEmpresa();
        });
        //this.getReceitas();
      })
      .catch(err => {
        console.log(err);
      });
  }

  getAno() {
    // this.setState({ isloading: true })

    const { user, selectEmpresa } = this.state;
    if (selectEmpresa != 'key0') {
      if (user.matricula) {
        let url = ""
        if(selectEmpresa === "1000"){
          url = `${Server.API}coparticipacao/getAnosInd.asp?matricula=${user.matricula}`;
        } else {
          url = `${Server.API}coparticipacao/getAnosCopart.asp?matricula=${user.matricula}&empresa=${selectEmpresa}`;
        }

        console.log(url);

        fetch(url)
          .then(response => response.json())
          .then(res => {
            if(res.length != 0){
              this.setState({ isloading: false, isFail: false, anos: res })
            } else {
              Platform.OS === "ios" ?
                Toast.show({
                  text: 'Não foi encontrado dados de coparticipação para essa empresa.',
                  buttonText: 'Ok',
                  type: "danger",
                  duration: 3000
                }) :
                ToastAndroid.show('Não foi encontrado dados de coparticipação para essa empresa.', 3000);
            }
          })
          .catch(err => {
            console.log(err)
            this.setState({ isloading: false, isFail: true })
          })
      }
    }
  }

  getMesesInicio() {
    // this.setState({ isloading: true })

    const { user, selectAnoInicio, selectEmpresa } = this.state;
    if (selectEmpresa != 'key0' && selectAnoInicio != 'key0') {
      if (user.matricula) {
        let url = "";

        if (selectEmpresa === "1000") {
          url = `${Server.API}coparticipacao/getMesesInd.asp?matricula=${user.matricula}&ano=${selectAnoInicio}`;
        } else {
          url = `${Server.API}coparticipacao/getMesesCopart.asp?matricula=${user.matricula}&empresa=${selectEmpresa}&ano=${selectAnoInicio}`;
        }
        console.log(url);

        fetch(url)
          .then(response => response.json())
          .then(res => {
            this.setState({ isloading: false, isFail: false, mesesInicio: res })
          })
          .catch(err => {
            console.log(err)
            this.setState({ isloading: false, isFail: true })
          })
      }
    }
  }

  getMesesFim() {
    // this.setState({ isloading: true })

    const { user, selectAnoFim, selectEmpresa } = this.state;
    if (selectAnoFim != 'key0' && selectEmpresa != 'key0') {
      if (user.matricula) {
        let url = "";
        if(selectEmpresa === "1000"){
          url = `${Server.API}coparticipacao/getMesesInd.asp?matricula=${user.matricula}&ano=${selectAnoFim}`;
        } else {
          url = `${Server.API}coparticipacao/getMesesCopart.asp?matricula=${user.matricula}&empresa=${selectEmpresa}&ano=${selectAnoFim}`;
        }

        console.log(url);

        fetch(url)
          .then(response => response.json())
          .then(res => {
            this.setState({ isloading: false, isFail: false, mesesFim: res })
          })
          .catch(err => {
            console.log(err)
            this.setState({ isloading: false, isFail: true })
          })
      }
    }
  }

  getTipoGuia() {
    const { user, selectEmpresa, selectMesInicio, selectAnoInicio, selectMesFim, selectAnoFim } = this.state;

    let url = ""

    let di = +new Date(`01/${selectMesInicio}/${selectAnoInicio}`);
    let df = +new Date(`01/${selectMesFim}/${selectAnoFim}`);

    if (di <= df) {
      if (selectEmpresa === "1000") {
        url = `${Server.API}coparticipacao/getTipoGuia.asp?matricula=${user.matricula}`;
      } else {
        url = `${Server.API}coparticipacao/getTipoGuiaEmp2.asp?matricula=${user.matricula}&empresa=${selectEmpresa}&mesinicio=${selectMesInicio}/${selectAnoInicio}&mesfim=${selectMesFim}/${selectAnoFim}`;

      }


      fetch(url)
        .then(response => response.json())
        .then(res => {
          const tipos = res;

          this.setState({ tipos })
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      Platform.OS === "ios" ?
        Toast.show({
          text: 'O período final não pode ser menor que o inicial.',
          buttonText: 'Ok',
          type: "danger",
          duration: 3000
        }) :
        ToastAndroid.show('O período final não pode ser menor que o inicial.', 3000);
    }
  }

  onSubmit(){
    const { selectAnoInicio, selectAnoFim, selectMesInicio, selectMesFim, selectEmpresa, selectTipo } = this.state
    if (selectEmpresa != 'key0') {
      if (selectMesInicio != 'key0' && selectAnoInicio != 'key0') {
        if (selectMesFim != 'key0' && selectAnoFim != 'key0') {
          if (selectTipo != 'key0') {
            let di = +new Date(`01/${selectMesInicio}/${selectAnoInicio}`);
            let df = +new Date(`01/${selectMesFim}/${selectAnoFim}`);

            console.log()
            if (di <= df) {
              this.props.navigation.navigate('ResultCopart', {
                empresa: selectEmpresa,
                mesInicio: selectMesInicio,
                anoInicio: selectAnoInicio,
                mesFim: selectMesFim,
                anoFim: selectAnoFim,
                tipo: selectTipo
              })
            } else {
              Platform.OS === "ios" ?
                Toast.show({
                  text: 'O período final não pode ser menor que o inicial.',
                  buttonText: 'Ok',
                  type: "danger",
                  duration: 3000
                }) :
                ToastAndroid.show('O período final não pode ser menor que o inicial.', 3000);
            }
          } else {
            Platform.OS === "ios" ?
              Toast.show({
                text: 'Informe o tipo da guia.',
                buttonText: 'Ok',
                type: "danger",
                duration: 3000
              }) :
              ToastAndroid.show('Informe o tipo da guia.', 3000);
          }
        } else {
          Platform.OS === "ios" ?
            Toast.show({
              text: 'Informe o período final para a busca.',
              buttonText: 'Ok',
              type: "danger",
              duration: 3000
            }) :
            ToastAndroid.show('Informe o período final para a busca.', 3000);
        }
      } else {
        Platform.OS === "ios" ?
          Toast.show({
            text: 'Informe o período inicial para a busca.',
            buttonText: 'Ok',
            type: "danger",
            duration: 3000
          }) :
          ToastAndroid.show('Informe o período inicial para a busca.', 3000);
      }
    } else {
      Platform.OS === "ios" ?
        Toast.show({
          text: 'Informe a empresa para continuar a busca.',
          buttonText: 'Ok',
          type: "danger",
          duration: 3000
        }) :
        ToastAndroid.show('Informe a empresa para continuar a busca.', 3000);
    }
  }

  onScreenFocus(){
    this.setState({
      isloading: true,
      selectMesInicio: 'key0',
      selectMesFim: 'key0',
      tipos: [],
      selectTipo: 'key0',
      mesesInicio: [],
      mesesFim: [],
      selectAnoInicio: 'key0',
      selectAnoFim: 'key0',
      anos: [],
      empresas: [],
      selectEmpresa: 'key0',
      buttonDisable: true
    });
    this.doloading()
  }

  

  getEmpresa(){
    this.setState({ isloading: true })
    const { user } = this.state

    const url = `${Server.API}coparticipacao/getEmpresaCopart.asp?matricula=${user.matricula}`;
    console.log(url)

    fetch(url)
    .then(response => response.json())
    .then(res => {
      this.setState({ isloading: false, isFail: false, empresas: res })
    })
    .catch(err => {
      console.log(err)
      this.setState({ isloading: false, isFail: true })
    })
  }

  render() {
    const { mesesInicio, mesesFim, anos, empresas, tipos } = this.state
    
    console.log(this.state)

    return (
      <Root>
        <Container>
          <Base navigation={this.props.navigation}>
            <NavigationEvents onWillFocus={payload => this.onScreenFocus()} />
            <HeaderGoBack
              navigation={this.props.navigation}
              title={'Coparticipação'}
            />

            {/* <Content style={{ marginBottom: 55 }}>
              <Text>Teste</Text>
            </Content> */}
            <Content style={{ marginBottom: 55 }}>
              <View
                style={{
                  flex: 1,
                  margin: "4%",
                  // margin: 15,
                  padding: 10
                }}
              >
                <RenderIf condition={!this.state.isloading} else={
                  <SpinnerDrawer
                    style={{ marginTop: 105 }}
                    text="Carregando..."
                    textColor={"#000000"}
                    spinColor={ColorsScheme.MAIN_COLOR}
                  />
                }>
                  <RenderIf condition={!this.state.isFail} else={
                    <SemInformacao
                      error={true}
                    />
                  }>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold'
                      }}
                    >
                      Informe os dados abaixo para posseguir
                    </Text>
                    
                    
                    <RenderIf condition={empresas.length > 0}>
                      <Text
                        style={{
                          fontSize: 12,
                          marginTop: "5%"
                        }}
                      >
                        Selecione a empresa
                      </Text>

                      <Picker
                        note
                        mode="dropdown"
                        style={{ width: "100%", color: 'black' }}
                        selectedValue={this.state.selectEmpresa}
                        onValueChange={(val) => this.setState({ 
                          selectEmpresa: val,
                          buttonDisable: true 
                        }, () => {
                          this.getAno()
                        })}
                        placeholder={"Selecione..."}
                        placeholderStyle={{ color: "#F8F8F8" }}
                      >
                        <Picker.Item
                          style={{ fontSize: 12, color: ColorsScheme.LIGHT_GRAY }}
                          label="Selecione..."
                          value="key0"
                        />

                        {empresas.map((item, index) => {
                          console.log("item", item)
                          return (
                            <Picker.Item
                              key={index}
                              style={{ fontsize: 12 }}
                              label={item.nome_empresa}
                              value={item.cod_empresa}
                            />
                          )
                        })}
                      </Picker>
                    </RenderIf>

                    <RenderIf condition={anos.length != 0}>
                      <Text
                        style={{
                          fontSize: 12,
                        }}
                      >
                        Período inicial
                      </Text>

                      <Picker
                        note
                        mode="dropdown"
                        style={{ width: "100%", color: 'black' }}
                        selectedValue={this.state.selectAnoInicio}
                        onValueChange={(val) => this.setState({ 
                          selectAnoInicio: val,
                          mesesInicio: [],
                          mesesFim: [],
                          tipos: [],
                          selectTipo: 'key0',
                          selectMesFim: 'key0',
                          selectMesInicio: 'key0',
                          selectAnoFim: 'key0',
                          buttonDisable: true 
                        }, () => {
                          this.getMesesInicio()
                        })}
                        placeholder={"Selecione o ano..."}
                        placeholderStyle={{ color: "#F8F8F8" }}
                      >
                        <Picker.Item
                          style={{ fontSize: 12 }}
                          label="Selecione o ano..."
                          value="key0"
                        />

                        {anos.map((item, index) => {
                          console.log("item", item)
                          return (
                            <Picker.Item
                              key={index}
                              style={{ fontsize: 12 }}
                              label={item.ano}
                              value={item.value}
                            />
                          )
                        })}
                      </Picker>
                    </RenderIf>
                    

                    <RenderIf condition={mesesInicio.length != 0}>
                      <Picker
                        note
                        mode="dropdown"
                        style={{ width: "100%", color: 'black' }}
                        selectedValue={this.state.selectMesInicio}
                        onValueChange={(val) => this.setState({ 
                          selectMesInicio: val,
                          mesesFim: [],
                          tipos: [],
                          selectTipo: 'key0',
                          selectMesFim: 'key0', 
                          selectAnoFim: 'key0',
                          buttonDisable: true 
                        })}
                        placeholder={"Selecione o mês..."}
                        placeholderStyle={{ color: "#F8F8F8" }}
                      >
                        <Picker.Item
                          style={{ fontSize: 12 }}
                          label="Selecione o mês..."
                          value="key0"
                        />

                        {mesesInicio.map((item, index) => {
                          return (
                            <Picker.Item
                              key={index}
                              style={{ fontsize: 12 }}
                              label={item.mes}
                              value={item.value}
                            />
                          )
                        })}
                      </Picker>
                    </RenderIf>

                    <RenderIf condition={this.state.selectAnoInicio != 'key0' && this.state.selectMesInicio != 'key0'}>
                      <Text
                        style={{
                          fontSize: 12,
                        }}
                      >
                        Período final
                      </Text>

                      <Picker
                        note
                        mode="dropdown"
                        style={{ width: "100%", color: 'black' }}
                        selectedValue={this.state.selectAnoFim}
                        onValueChange={(val) => this.setState({ 
                          selectAnoFim: val, 
                          mesesFim: [],
                          tipos: [],
                          selectTipo: 'key0',
                          selectMesFim: 'key0',
                          buttonDisable: true 
                        }, () => {
                          this.getMesesFim()
                        })}
                        placeholder={"Selecione o ano..."}
                        placeholderStyle={{ color: "#F8F8F8" }}
                      >
                        <Picker.Item
                          style={{ fontSize: 12 }}
                          label="Selecione o ano..."
                          value="key0"
                        />

                        {anos.map((item, index) => {
                          console.log("item", item)
                          return (
                            <Picker.Item
                              key={index}
                              style={{ fontsize: 12 }}
                              label={item.ano}
                              value={item.value}
                            />
                          )
                        })}
                      </Picker>
                    </RenderIf>

                    <RenderIf condition={mesesFim.length != 0}>
                      <Picker
                        note
                        mode="dropdown"
                        style={{ width: "100%", color: 'black' }}
                        selectedValue={this.state.selectMesFim}
                        onValueChange={(val) => this.setState({ 
                          selectMesFim: val,
                          tipos: [],
                          selectTipo: 'key0',
                          buttonDisable: true
                        }, () => {
                          this.getTipoGuia()
                        })}
                        placeholder={"Selecione o mês..."}
                        placeholderStyle={{ color: "#F8F8F8" }}
                      >
                        <Picker.Item
                          style={{ fontSize: 12 }}
                          label="Selecione o mês..."
                          value="key0"
                        />

                        {mesesFim.map((item, index) => {
                          return (
                            <Picker.Item
                              key={index}
                              style={{ fontsize: 12 }}
                              label={item.mes}
                              value={item.value}
                            />
                          )
                        })}
                      </Picker>
                    </RenderIf>

                    <RenderIf condition={tipos.length != 0}>
                      <Text
                        style={{
                          fontSize: 12,
                        }}
                      >
                        Tipo de guia
                      </Text>
                      
                      <Picker
                        note
                        mode="dropdown"
                        style={{ width: "100%", color: 'black' }}
                        selectedValue={this.state.selectTipo}
                        onValueChange={(val) => this.setState({ selectTipo: val, buttonDisable: false })}
                        placeholder={"Selecione o tipo de guia..."}
                        placeholderStyle={{ color: "#F8F8F8" }}
                      >
                        <Picker.Item
                          style={{ fontSize: 12 }}
                          label="Selecione o tipo de guia..."
                          value="key0"
                        />

                        <Picker.Item
                          style={{ fontSize: 12 }}
                          label="Todos"
                          value="Todos"
                        />

                        {tipos.map((item, index) => {
                          return (
                            <Picker.Item
                              key={index}
                              style={{ fontsize: 12 }}
                              label={item.tipo_guia}
                              value={item.value}
                            />
                          )
                        })}
                      </Picker>
                    </RenderIf>
                    

                    <View
                      style={{
                        marginTop: "10%",
                        alignItems: "center"
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor: !this.state.buttonDisable ? ColorsScheme.MAIN_COLOR : "#a3a3a3"
                        }}
                        disabled={this.state.buttonDisable}
                        onPress={() => this.onSubmit()}
                      >
                        <Text>Buscar</Text>
                      </Button>
                    </View>
                  </RenderIf>
                </RenderIf>
              </View>
            </Content>
          </Base>
        </Container>
      </Root>
    )
  }
}