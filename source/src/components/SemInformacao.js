import React from "react";

import { View, Text, Button, Toast } from "native-base";

import { ScrollView, RefreshControl } from "react-native";

import ResponsiveImage from "react-native-responsive-image";

import RenderIf from "./RenderIf"

class SemInformacao extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  forceUpdateHandler(){
    this.forceUpdate();
  };

  noConnectionToast() {
    Toast.show({
      text: "Não foi possível reconectar, verifique sua conexão.",
      buttonText: "Ok"
    });
  }

  render() {
    return (
      <View style={this.props.style}>
        <View
          style={[
            {
              alignItems: "center",
              justifyContent: "center",
            }
          ]}
        >      
            <ResponsiveImage
              source={require("../assets/atencao.png")}
              initWidth="80"
              initHeight="80"
            />
            <RenderIf condition={!this.props.error}>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.props.refreshing}
                    onRefresh={this.props.onRefresh}
                  />
                }
              >
                <Text style={{ textAlign: "center", color: "#a0a0a0" }}>
                  Não há informação a ser exibida.
                </Text>
              </ScrollView>
            </RenderIf>
            <RenderIf condition={this.props.error}>
              <Text style={{ textAlign: "center", color: "#a0a0a0" }}>
                Ocorreu um problema durante o carregamento.
              </Text>
            </RenderIf>
        </View>
      </View>
    );
  }
}

export default SemInformacao;
