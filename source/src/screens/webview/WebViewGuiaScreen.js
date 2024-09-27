import React, { Component } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
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
    Text
} from 'native-base';
import HeaderGoBack from '../../components/HeaderGoBack';
import { WebView } from 'react-native-webview';

export default class WebViewGuiaScreen extends Component {
    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener(
            'didFocus',
            payload => {
                this.getdata();
            }
        );

        this.state = {
            title: '',
            url: 'https://www.jornalpf.com.br/'
        };
    }
    getdata() {
        const title = this.props.navigation.getParam('title', '');
        const url = this.props.navigation.getParam('url', '');
        this.setState({ title: title, url: url });
    }

    render() {
        return (
            <Base navigation={this.props.navigation}>
                <HeaderGoBack
                    navigation={this.props.navigation}
                    title={this.state.title}
                    ishome
                />
                <WebView
                    source={{ uri: this.state.url }}
                    renderLoading
                    style={{ marginBottom: 55, flex: 1 }}
                />

            </Base>
        );
    }
}
