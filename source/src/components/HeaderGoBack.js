import React, { Component } from "react";
import {
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Text
} from "native-base";
import ColorsScheme from "../settings/ColorsScheme";
import RenderIf from "./RenderIf";

export default class HeaderGoBack extends Component {
    render() {
        return (
            <Header
                androidStatusBarColor={ColorsScheme.MAIN_COLOR}
                style={{ backgroundColor: ColorsScheme.MAIN_COLOR }}
            >
                <Left>
                    <RenderIf condition={!this.props.ishome}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name="arrow-back" style={{ color: "white" }} />
                        </Button>
                    </RenderIf>
                </Left>
                <Body style={{ flex: 3 }}>
                    <Title style={{ color: "white" }}>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}
