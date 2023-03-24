import AsyncStorage from "@react-native-async-storage/async-storage";
import { Switch, Text } from "@rneui/themed"
import { useState, useEffect } from "react";
import { SafeAreaView, View, StyleSheet, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const SettingsScreen: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [appearance, setAppearance] = useState(appearanceItems[0].value);
    const [username, setUsername] = useState("username");
    const [setting, setSetting] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem(appearanceKey)
            .then((value) => {
                if (value !== null) {
                    setAppearance(value);
                }
            })
            .catch((error) => console.error(error));
        AsyncStorage.getItem(usernameKey)
            .then((value) => {
                if (value !== null) {
                    setUsername(value);
                }
            })
            .catch((error) => console.error(error));
        AsyncStorage.getItem(settingKey)
            .then((value) => {
                if (value !== null) {
                    setSetting(JSON.parse(value));
                }
            })
            .catch((error) => console.error(error));
    }, []);

    const appearanceChanged = async (value: string) => {
        try {
            await AsyncStorage.setItem(appearanceKey, value).then(() => {
                setAppearance(value)
            })
        } catch (error) {
            console.error(error);
        }
    };

    const settingChanged = async (value: boolean) => {
        try {
            await AsyncStorage.setItem(appearanceKey, JSON.stringify(value)).then(() => {
                setSetting(value)
            })
        } catch (error) {
            console.error(error);
        }
    };

    const usernameChanged = async (value: string) => {
        try {
            await AsyncStorage.setItem(usernameKey, value).then(() => {
                setUsername(value)
            })
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.setting}>
                <Text style={styles.settingTitle}>Username</Text>
                <TextInput value={username} onChangeText={usernameChanged} />
            </View>
            <View style={styles.setting}>
                <Text style={styles.settingTitle}>Dark Mode</Text>
                <Switch value={setting} onValueChange={settingChanged} />
            </View>
            <View style={styles.setting}>
                <Text style={styles.settingTitle}>Appearance</Text>
                <DropDownPicker
                    containerStyle={{ width: 200 }}
                    open={open}
                    value={appearance}
                    items={appearanceItems}
                    setOpen={setOpen}
                    setValue={setAppearance}
                    onChangeValue={(value) => { if (value != null) appearanceChanged(value) }}
                />
            </View>
        </SafeAreaView>
    );
};

const appearanceItems = [
    { label: "Default", value: "defalut" },
    { label: "Dark Mode", value: "dark" },
]

const appearanceKey = 'appearance'
const usernameKey = 'username'
const settingKey = 'setting'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    setting: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'space-between'
    },
    settingTitle: {
        fontSize: 18,
        marginRight: 10,
    },
});

export default SettingsScreen