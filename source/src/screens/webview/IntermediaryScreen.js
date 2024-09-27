import React, { Component } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import ColorsScheme from '../../settings/ColorsScheme';
import Base from '../../components/Base';
import {
    Spinner,
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

export default class IntermediaryScreen extends Component {
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
            url: 'https://www.extremamedic.com'
        };
    }
    getdata() {
        const title = this.props.navigation.getParam('title', '');
        const url = this.props.navigation.getParam('url', '');
        this.setState({ title: title, url: url });
        this.props.navigation.navigate('WebView', {
            title: title,
            url: url
        });
    }

    render() {
        return (
            <Base navigation={this.props.navigation}>
                <HeaderGoBack
                    navigation={this.props.navigation}
                    title={this.state.title}
                />
                <Spinner />
            </Base>
        );
    }
}
