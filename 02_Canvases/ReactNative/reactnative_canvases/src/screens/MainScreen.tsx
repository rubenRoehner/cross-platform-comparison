import React from "react";
import { SafeAreaView } from "react-native";
import CustomPainter from "../components/CustomPainter";

export default class MainScreen extends React.Component {
    render(): React.ReactNode {
        return (
            <SafeAreaView>
                <CustomPainter />
            </SafeAreaView>
        )
    }
}