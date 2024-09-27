import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import LoadingScreen from './src/screens/login/LoadingScreen';
import SelectScreen from './src/screens/login/SelectScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import SelectIsoladaScreen from './src/screens/isolada/SelectIsoladaScreen';
import EscolhaIsoladaScreen from './src/screens/isolada/EscolhaIsoladaScreen';
import ResultadoBuscaScreen from './src/screens/resultado/ResultadoBuscaScreen';
import ResultadoDetalhesScreen from './src/screens/resultado/ResultadoDetalhesScreen';
import SelectCombinadaScreeen from './src/screens/combinada/SelectCombinadaScreeen';
import ContatoScreens from './src/screens/contato/ContatoScreens';
import WebViewScreen from './src/screens/webview/WebViewScreen';
import IntermediaryScreen from './src/screens/webview/IntermediaryScreen';
import LoginScreen from './src/screens/login/LoginScreen';
import PerfilScreen from './src/screens/login/PerfilScreen';
import RecuperarSenhaScreen from './src/screens/login/RecuperarSenhaScreen';
import AboutScreen from './src/screens/About/AboutScreen'
import PrimeiroAcessoScreen from './src/screens/primeiroAcesso/PrimeiroAcessoScreen';
import PrimeiroAcesso_doisScreen from './src/screens/primeiroAcesso/primeiroAcesso_doisScreen';
import FinanceiroScreen from './src/screens/finaceiro/FinanceiroScreen';
import AlterarSenhaScreen from './src/screens/trocarSenha/AlterarSenhaScreen';
import AlterarSenha_DoisScreen from './src/screens/trocarSenha/AlterarSenha_DoisScreen';
import ContratoScreen from './src/screens/finaceiro/ContratoScreen';
import UtilizacoesScreen from './src/screens/finaceiro/UtilizacoesScreen';
import Utilizacoes2Screen from './src/screens/finaceiro/Utilizacoes2Screen';
import CarteirinhaScreen from './src/screens/carteirinha/CarteirinhaScreen';
import Carteirinha_2Screen from './src/screens/carteirinha/Carteirinha_2Screen';
import ConfirmaScreen from './src/screens/primeiroAcesso/ConfirmaScreen';
import SenhaScreen from './src/screens/primeiroAcesso/SenhaScreen';
import Confirma_notFoundScreen from './src/screens/primeiroAcesso/Confirma_notFoundScreen';
import CoparticipacaoScreen from './src/screens/coparticipacao/CoparticipacaoScreen';
import ResultCopartScreen from './src/screens/coparticipacao/ResultCopartScreen';
import TermosScreen from './src/screens/termos/TermosScreen';
import WebViewGuiaScreen from './src/screens/webview/WebViewGuiaScreen';

const AppNavigator = createStackNavigator(
    {
        Loading: { screen: LoadingScreen },
        SelectIsolada: { screen: SelectIsoladaScreen },
        Perfil: { screen: PerfilScreen },
        Login: { screen: LoginScreen },
        Home: { screen: HomeScreen },
        Intermediary: { screen: IntermediaryScreen },
        Select: { screen: SelectScreen },
        Contato: { screen: ContatoScreens },
        WebView: { screen: WebViewScreen },
        EscolhaIsolada: { screen: EscolhaIsoladaScreen },
        ResultadoBusca: { screen: ResultadoBuscaScreen },
        ResultadoDetalhes: { screen: ResultadoDetalhesScreen },
        SelectCombinada: { screen: SelectCombinadaScreeen },
        RecuperarSenha:{ screen: RecuperarSenhaScreen},
        About: {screen: AboutScreen},
        PrimeiroAcesso: {screen: PrimeiroAcessoScreen},
        Senha: { screen: SenhaScreen },
        PrimeiroAcesso_dois: { screen: PrimeiroAcesso_doisScreen},
        Financeiro: { screen: FinanceiroScreen},
        AlterarSenha: {screen : AlterarSenhaScreen},
        AlterarSenhaDois: {screen: AlterarSenha_DoisScreen},
        Contrato: { screen: ContratoScreen },
        Utilizacoes: { screen: UtilizacoesScreen },
        Utilizacoes2: { screen: Utilizacoes2Screen },
        Carteirinha: { screen: CarteirinhaScreen },
        Carteirinha_2: { screen: Carteirinha_2Screen },
        Confirma: { screen: ConfirmaScreen },
        Confirma_notFound: { screen: Confirma_notFoundScreen },
        Coparticipacao: { screen: CoparticipacaoScreen },
        ResultCopart: { screen: ResultCopartScreen },
        Termos: { screen: TermosScreen },
        WebViewGuia: { screen: WebViewGuiaScreen },
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        }
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    constructor(prop) {
        super(prop);
    }

    render() {
        return <AppContainer />;
    }
}
