import React from "react"
import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const ErrorScreen: React.FC = () => {
    return (
        <View style={styles.containerStyle}>
            <Icon name="exclamation-circle" size={80} />
            <Text style={styles.textStyle}>Something went wrong!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    textStyle: {
        fontSize: 20,
        fontWeight: '600',
    },
});

export default ErrorScreen