import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import ColorsScheme from '../../settings/ColorsScheme';
import Server from '../../settings/Server';
import Base from '../../components/Base';
import HeaderGoBack from '../../components/HeaderGoBack';
import {
    Container,
    Input,
    Item,
    Body,
    Label,
    Form,
    Content,
    Picker,
    Textarea,
    Text,
    Button,
    Toast,
    Spinner,
    H3
} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInputMask } from 'react-native-masked-text';
import axios from 'axios';

export default class ContatoScreens extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            telefone: '',
            cidade: '',
            UF: '',
            selectedSetor: '1',
            selectedPerfil: 'Visitante',
            selectedAssunto: 'Dúvida',
            mensagem: '',
            CPF: '',
            CNPJ: '',
            isDisable: false,
            isLoading: false,
        };
    }
    onValueChangeAssunto(value) {
        this.setState({
            selectedAssunto: value
        });
    }
    onValueChangePerfil(value) {
        this.setState({
            selectedPerfil: value
        });
    }
    onValueChangeSetor(value) {
        this.setState({
            selectedSetor: value
        });
    }
    enviarContato() {
        const st = this.state;
        const {
            nome,
            UF,
            email,
            mensagem,
            cidade,
            CPF,
            CNPJ,
            selectedAssunto,
            selectedPerfil,
            selectedSetor,
            telefone
        } = this.state
        if (
            st.nome != '' &&
            st.UF != '' &&
            st.email != '' &&
            st.mensagem != '' &&
            st.cidade != ''
        ) {
            Alert.alert(
                "Confirmar",
                "Deseja continuar com o envio?",
                [
                    {
                        text: "Cancelar",
                        onPress: () =>
                            console.log("Cancel Press"),
                        style: "cancel"

                    },
                    {
                        text: "OK",
                        onPress: () => {


                            this.setState({ isLoading: true });
                            let obj = {
                                oauthtoken: "kYXbW>c&qt*wVd))/H9pa#oHc<E<",
                                nome: nome,
                                emailBene: email,
                                // email: "jose.eduardo@adaptweb.com.br",
                                email: "extremamedic@extremamedic.com",
                                // email: selectedSetor === 1 ? "ouvidoria@odontobase.com.br" :
                                //     selectedSetor === 2 ? "corretoras@odontobase.com.br" : "atendimento@odontobase.com.br",
                                cidade: cidade,
                                uf: UF,
                                perfil: selectedPerfil,
                                cpf: CPF,
                                cnpj: CNPJ,
                                mensagem: mensagem,
                                assunto: selectedAssunto,
                                telefone: telefone,
                                nome_setor: selectedSetor === 1 ? "Ouvidoria" : "Comercial"
                            }

                            axios
                                .post(`http://awapp.net.br/extremamedic/MailerApi/sendTeste.php`, obj)
                                .then(res => {
                                    console.log(res);
                                    this.setState({ isLoading: false });
                                    Alert.alert(
                                        "Exito!",
                                        "Enviado com sucesso",
                                        [
                                            {
                                                text: "OK",
                                                onPress: () => {
                                                    this.props.navigation.navigate('Carteirinha')
                                                }
                                            }
                                        ]
                                    )
                                })
                                .catch(err => {
                                    console.log(err)
                                    this.setState({ isLoading: false })
                                    Toast.show({
                                        text: 'Algo deu errado',
                                        buttonText: 'Okay',
                                        type: 'danger',
                                        duration: 3000
                                    });
                                    setTimeout(() => this.setState({ isDisable: true }), 3000);
                                })
                        }
                    }
                ]
            )
            // this.setState({ isLoading: true });
            // let url =
            //     Server.API +
            //     `contato/sendEmail.asp?nome=${st.nome}&email=${
            //         st.email
            //     }&cidade=${st.cidade}&uf=${st.UF}&idsetor=${
            //         st.selectedSetor
            //     }&perfil=${st.selectedPerfil}&cpf=${st.CPF}&cnpj=${
            //         st.CNPJ
            //     }&mensagem=${st.mensagem}&assunto=${
            //         st.selectedAssunto
            //     }&telefone=${st.telefone}`;
            // fetch(url)
            //     .then(response => response.json())
            //     .then(responseJson => {
            //         /*Toast.show({
            //             text: 'Enviado',
            //             buttonText: 'Okay',
            //             type: 'success',
            //             duration: 3000
            //         });*/
            //         console.log("Entrou: ",responseJson);
            //         Alert.alert(
            //             "Confirmar",
            //             "Deseja continuar com o envio?",
            //             [
            //                 {
            //                     text: "Cancelar",
            //                     onPress: () => 
            //                         console.log("Cancel Press"),
            //                     style: "cancel"
                                
            //                 },
            //                 {
            //                     text: "OK",
            //                     onPress: () => {
            //                         Alert.alert(
            //                             "Exito!",
            //                             "Enviado com sucesso",
            //                             [
            //                                 {
            //                                     text: "OK",
            //                                     onPress: () => {
            //                                         this.props.navigation.navigate('Carteirinha')
            //                                     }
                                                
            //                                 }
            //                             ]
            //                         )
            //                     }
            //                 }
            //             ]
            //         )
            //     })
            //     .catch(err => {
            //         console.log(err.response);
            //         Toast.show({
            //             text: 'Algo deu errado',
            //             buttonText: 'Okay',
            //             type: 'danger',
            //             duration: 3000
            //         });
            //         setTimeout(() => this.setState({ isDisable: true }), 3000);
            //     });
        } else {
            Toast.show({
                text: 'Tem campos obrigatórios não preenchidos',
                buttonText: 'Okay',
                type: 'danger',
                duration: 3000
            });
        }
    }

    renderLoading(){
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                //alignItems: 'stretch',
            }}>
                <Spinner size={150} 
                    color={ColorsScheme.MAIN_COLOR}
                    Container={{Content: 'center'}}
                />
    
            </View>
        )
        
    }
    render() {
        console.log(this.state);
        const { mensagem } = this.state;
        const maxLength = 2000
        return (
            <Base navigation={this.props.navigation}>
                <HeaderGoBack
                    navigation={this.props.navigation}
                    title={'Fale Conosco'}
                />
                <Content style={{ backgroundColor: '#f8f8f8' }}>
                    {/* <View style={{ margin: 20 }}>
                        <H3
                            style={{
                                fontWeight: 'bold',
                                color: ColorsScheme.ASENT_COLOR
                            }}
                        >
                            BUSCA ISOLADA
                        </H3>
                        <Text style={{ fontSize: 12 }}>
                            Selecione abaixo o tipo de busca que deseja realizar
                        </Text>
                    </View> */}
                    <Form
                        style={{
                            marginBottom: 85,
                            backgroundColor: '#fff',
                            padding: 10,
                            paddingRight: 20
                        }}
                    >
                        <Item stackedLabel style={{ backgroundColor: '#fff' }}>
                            <Label>Nome:*</Label>
                            <Input
                                value={this.state.nome}
                                onChangeText={val =>
                                    this.setState({ nome: val })
                                }
                                style={{
                                    color: "#000000"
                                }}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>E-mail:*</Label>
                            <Input
                                value={this.state.email}
                                onChangeText={val =>
                                    this.setState({ email: val })
                                }
                                autoCapitalize={"none"}
                                style={{
                                    color: "#000000"
                                }}
                            />
                        </Item>
                        <Item
                            stackedLabel
                            onPress={() =>
                                this._myTextInputMask.getElement().focus()
                            }
                        >
                            <Label>Telefone:</Label>
                            <TextInputMask
                                ref={ref => (this._myTextInputMask = ref)}
                                type={'cel-phone'}
                                value={this.state.telefone}
                                onChangeText={val =>
                                    this.setState({ telefone: val })
                                }
                                style={{
                                    color: "#000000"
                                }}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Cidade:*</Label>
                            <Input
                                value={this.state.cidade}
                                onChangeText={val =>
                                    this.setState({ cidade: val })
                                }
                                style={{
                                    color: "#000000"
                                }}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>UF:*</Label>
                            <Input
                                value={this.state.UF}
                                onChangeText={val => this.setState({ UF: val })}
                                style={{
                                    color: "#000000"
                                }}
                            />
                        </Item>

                        <Item stackedLabel>
                            <Label>Setor:</Label>
                            <Form style={{ width: '100%' }}>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Select your SIM"
                                    iosIcon={<FontAwesome5 name="angle-down" />}
                                    style={{ width: undefined, color: '#000000' }}
                                    selectedValue={this.state.selectedSetor}
                                    onValueChange={this.onValueChangeSetor.bind(
                                        this
                                    )}
                                >
                                    <Picker.Item label="Ouvidoria" value="1" />
                                    <Picker.Item label="Comercial" value="2" />
                                </Picker>
                            </Form>
                        </Item>

                        <Item stackedLabel>
                            <Label>Perfil:</Label>
                            <Form style={{ width: '100%' }}>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Select your SIM"
                                    iosIcon={<FontAwesome5 name="angle-down" />}
                                    style={{ width: undefined, color: "#000000" }}
                                    selectedValue={this.state.selectedPerfil}
                                    onValueChange={this.onValueChangePerfil.bind(
                                        this
                                    )}
                                >
                                    <Picker.Item
                                        label="Visitante"
                                        value="Visitante"
                                    />
                                    <Picker.Item
                                        label="Cliente"
                                        value="Cliente"
                                    />
                                    <Picker.Item
                                        label="Empresa Cliente"
                                        value="Empresa Cliente"
                                    />
                                    <Picker.Item
                                        label="Prestador"
                                        value="Prestador"
                                    />
                                    <Picker.Item
                                        label="Colaborador"
                                        value="Colaborador"
                                    />
                                </Picker>
                            </Form>
                        </Item>
                        {this.state.selectedSetor == '1' &&
                        (this.state.selectedPerfil == 'Cliente' ||
                            this.state.selectedPerfil == 'Empresa Cliente' ||
                            this.state.selectedPerfil == 'Colaborador') ? (
                            <Item stackedLabel>
                                <Label>CPF:</Label>
                                <Input
                                    value={this.state.CPF}
                                    onChangeText={val =>
                                        this.setState({ CPF: val })
                                    }
                                    style={{
                                        color: "#000000"
                                    }}
                                />
                            </Item>
                        ) : null}
                        {this.state.selectedSetor == '1' &&
                        (this.state.selectedPerfil == 'Prestador' ||
                            this.state.selectedPerfil == 'Empresa Cliente') ? (
                            <Item stackedLabel>
                                <Label>CNPJ:</Label>
                                <Input
                                    value={this.state.CNPJ}
                                    onChangeText={val =>
                                        this.setState({ CNPJ: val })
                                    }
                                    style={{
                                        color: "#000000"
                                    }}
                                />
                            </Item>
                        ) : null}
                        <Item stackedLabel>
                            <Label>Assunto*</Label>
                            <Form style={{ width: '100%' }}>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Select your SIM"
                                    iosIcon={<FontAwesome5 name="angle-down" />}
                                    style={{ width: undefined, color: "#000000" }}
                                    selectedValue={this.state.selectedAssunto}
                                    onValueChange={this.onValueChangeAssunto.bind(
                                        this
                                    )}
                                >
                                    <Picker.Item
                                        label="Compra"
                                        value="Compra"
                                    />
                                    <Picker.Item
                                        label="Dúvida"
                                        value="Dúvida"
                                    />
                                    <Picker.Item
                                        label="Elogio"
                                        value="Elogio"
                                    />
                                    <Picker.Item
                                        label="Prestação de Serviços"
                                        value="Prestação de Serviços"
                                    />
                                    <Picker.Item
                                        label="Reclamação"
                                        value="Reclamação"
                                    />
                                    <Picker.Item
                                        label="Solicitação"
                                        value="Solicitação"
                                    />
                                    <Picker.Item
                                        label="Credenciamento"
                                        value="Credenciamento"
                                    />
                                </Picker>
                            </Form>
                        </Item>
                        <Item stackedLabel>
                            <Label>Mensagem:</Label>
                            <Form style={{ width: '100%' }}>
                                <Textarea
                                    rowSpan={4}
                                    maxLength={maxLength}
                                    bordered
                                    value={this.state.mensagem}
                                    onChangeText={val =>
                                        this.setState({ mensagem: val })
                                    }
                                />
                            </Form>
                        </Item>
                        <Text
                            style={{
                                marginLeft: "5%",
                                fontSize: 12
                            }}
                        >
                            {`${mensagem.length}/${maxLength}`}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingTop: 50
                            }}
                        >
                            <Button
                                onPress={
                                    this.enviarContato.bind(this)
                                }
                                disabled={this.state.isDisable}
                                style={{
                                    right: 0,
                                    position: 'absolute',
                                    width: 110,
                                    top: 10,
                                    backgroundColor: ColorsScheme.ASENT_COLOR
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        width: '100%'
                                    }}
                                >
                                    Enviar
                                </Text>
                            </Button>
                        </View>
                    </Form>
                </Content>
            </Base>
        );
    }
}
