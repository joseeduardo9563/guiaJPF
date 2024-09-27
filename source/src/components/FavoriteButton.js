import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Image,
    TouchableHighlight
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class FavoriteButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ativado: false,
            favoritos: []
        };
    }

    UNSAFE_componentWillMount()  {
        this._retrieveData();
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('Favoritos');

            if (value !== null) {
                let arr = JSON.parse(value);
                let achei = arr.find(
                    obj =>
                        (obj.tipo == 'P' &&
                            obj.profissional == this.props.data.profissional) ||
                        (obj.tipo == 'J' &&
                            obj.NOME == this.props.data.NOME &&
                            obj.ESPECIALIDADE ==
                                this.props.data.ESPECIALIDADE &&
                            obj.FONE_COML == this.props.data.FONE_COML)
                );
                this.setState({ favoritos: arr, ativado: achei });
            }
        } catch (error) {}
    };
    _storeData = async store => {
        try {
            await AsyncStorage.setItem('Favoritos', JSON.stringify(store));
        } catch (error) {
            // Error saving data
        }
    };
    _asyncSetState = async obj => {
        this.setState(obj);
    };

    salvardados() {
        this._asyncSetState({ ativado: !this.state.ativado }).then(() => {
            if (this.state.ativado) {
                this.state.favoritos.push(this.props.data);
                this._storeData(this.state.favoritos);
            }
            if (this.props.data.tipo == 'P' && !this.state.ativado) {
                let arr = this.state.favoritos.filter(
                    obj => obj.profissional != this.props.data.profissional
                );
                this._asyncSetState({ favoritos: arr }).then(() =>
                    this._storeData(arr)
                );
            }

            if (this.props.data.tipo == 'J' && !this.state.ativado) {
                let arr = this.state.favoritos.filter(
                    obj =>
                        obj.NOME != this.props.data.NOME &&
                        obj.ESPECIALIDADE != this.props.data.ESPECIALIDADE &&
                        obj.FONE_COML != this.props.data.FONE_COML
                );
                this._asyncSetState({ favoritos: arr }).then(() =>
                    this._storeData(arr)
                );
            }
        });
    }
    render() {
        return (
            <TouchableHighlight onPress={this.salvardados.bind(this)}>
                <Icon
                    name={'heart'}
                    solid={this.state.ativado}
                    style={{ fontSize: 20, color: '#000040' }}
                />
            </TouchableHighlight>
        );
    }
}
