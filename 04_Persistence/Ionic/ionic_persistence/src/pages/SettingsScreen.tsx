import { IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonSelect, IonSelectOption, IonToggle } from "@ionic/react"
import { Preferences } from '@capacitor/preferences';
import { useEffect, useState } from "react";


const SettingsScreen: React.FC = () => {
    const [apperance, setApperance] = useState('default');
    const [username, setUsername] = useState('user');
    const [setting, setSetting] = useState(true);

    useEffect(() => {
        Preferences.get({ key: 'apperance' }).then((value) => {
            if (value && value.value) {
                console.log(value.value)
                setApperance(value.value);
            }
        });

        Preferences.get({ key: 'username' }).then((value) => {
            if (value && value.value) {
                console.log(value.value)
                setUsername(value.value);
            }
        });

        Preferences.get({ key: 'setting' }).then((value) => {
            if (value && value.value) {
                console.log(value.value)
                setSetting(value.value === "true")
            }
        });
    }, [])

    const handleApperanceChange = (event: any) => {
        const newApperance = event.target.value
        console.log("set ap" + newApperance)
        Preferences.set({ key: 'apperance', value: newApperance })
        setApperance(newApperance)
    };

    const handleUsernameChange = (event: any) => {
        const newUsername = event.target.value
        console.log("set name" + newUsername)
        Preferences.set({ key: 'username', value: newUsername });
        setUsername(newUsername)
    };

    const handleSettingChange = (event: any) => {
        const newSetting = !(event.target.checked)
        console.log("set setting" + newSetting)
        Preferences.set({ key: 'setting', value: newSetting.toString() })
        setSetting(newSetting)
    };


    return (
        <IonPage>
            <IonList>
                <IonListHeader>
                    <IonLabel>Settings</IonLabel>
                </IonListHeader>
                <IonItem>
                    <IonSelect value={apperance} onIonChange={handleApperanceChange}>
                        <IonSelectOption value="default">Default</IonSelectOption>
                        <IonSelectOption value="dark">Dark mode</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel>Some Setting</IonLabel>
                    <IonToggle checked={setting} onIonChange={handleSettingChange} />
                </IonItem>
                <IonItem>
                    <IonLabel>Enter username</IonLabel>
                    <IonInput value={username} onIonChange={handleUsernameChange} />
                </IonItem>
            </IonList>
        </IonPage>
    )
}

export default SettingsScreen