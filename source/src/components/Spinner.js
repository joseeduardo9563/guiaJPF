import React, { Component } from "react";

import { StyleSheet, View, Platform } from "react-native";

import { Text, Spinner } from "native-base";

import ColorsScheme from '../settings/ColorsScheme';

class SpinnerDrawer extends Component {
  render() {
    return (
      <View style={[styles.centerElement, this.props.style || {}]}>
        <View style={styles.directionVertical}>
          <Spinner
            color={this.props.spinColor}
            size={this.props.size ? this.props.size : (Platform.OS == "ios" ? 0 : 80)}
          />
          <Text style={{ color: this.props.textColor, textAlign: "center" }}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerElement: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  directionVertical: {
    flexDirection: "column"
  }
});

export default SpinnerDrawer;