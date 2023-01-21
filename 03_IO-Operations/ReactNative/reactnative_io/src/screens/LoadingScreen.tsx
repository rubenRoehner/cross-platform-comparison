import { ActivityIndicator, StyleSheet, View } from "react-native"

const LoadingScreen: React.FC = () => {
    return (
        <View style={styles.containerStyle}>
            <ActivityIndicator size="large" />
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
    }
});

export default LoadingScreen