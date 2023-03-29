import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const App = () => {

  const [isTextfieldFocused, setTextFieldFocused] = useState(false)
  const [textfieldHasError, setTextfieldHasError] = useState(false)
  const [placeholderVisible, setPlaceholderVisible] = useState(false)

  const getBorderColor = () => {
    if (textfieldHasError) {
      return "#ff3a30"
    } else if (isTextfieldFocused) {
      return "#4286f4"
    } else {
      return "#B3B3B3"
    }
  }

  const isValidEmail = (value: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return !reg.test(value)
  }

  const styles = StyleSheet.create({
    container: {
      padding: 24,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
      height: "100%"
    },

    styledImageContainer: {
      borderWidth: 2,
      borderColor: "#B3B3B3",
      borderRadius: 8,

      backgroundColor: "#F1F1F1",

      padding: 8
    },
    styledImage: {
      width: 300,
      height: 300
    },

    styledButton: {
      minWidth: 180,
      minHeight: 56,

      paddingVertical: 12,
      paddingHorizontal: 16,

      alignItems: 'center',
      justifyContent: 'center',

      borderRadius: 8,
      borderColor: "#4286f4",
      borderWidth: 2,
      elevation: 4
    },
    styledButtonText: {
      fontFamily: "Montserrat",
      fontWeight: "500",
      fontSize: 18,
      color: "white"
    },

    styledTextfield: {
      width: "100%",
      borderWidth: 2,
      borderColor: getBorderColor(),
      borderRadius: 6,

      paddingHorizontal: 16,
      paddingVertical: 12,

      fontSize: 16,
      fontFamily: "Montserrat",
      fontWeight: placeholderVisible ? "300" : "500",
      color: "#383838"
    },
    errorMessage: {
      color: "#ff3a30"
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient style={styles.styledButton} colors={["#373B44", "#4286f4"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <Text style={styles.styledButtonText}>Styled Button</Text>
      </LinearGradient>
      <View style={styles.styledImageContainer} >
        <Image style={styles.styledImage} source={require("./assets/images/RWU_Logo.png")} resizeMode="contain" blurRadius={2} />
      </View>
      <View style={{ width: screenWidth - 48 }}>
        <TextInput style={styles.styledTextfield} placeholder="Placeholder" onFocus={() => setTextFieldFocused(true)} onBlur={() => setTextFieldFocused(false)} onChangeText={(text) => { setPlaceholderVisible(text.length == 0); setTextfieldHasError(isValidEmail(text)); }} />
        {textfieldHasError && <Text style={{ color: "#ff3a30" }}>Error: Invalid email</Text>}
      </View>
    </SafeAreaView>
  );
};

export default App;
