import { useEffect, useState } from "react"
import ErrorScreen from "./ErrorScreen"
import LoadingScreen from "./LoadingScreen"
import { Card } from "@rneui/themed"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { fetchAllUser } from "../data/services/UserService"
import { User } from "../data/models/User"

const UserScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [user, setUser] = useState<User[]>([])

    useEffect(() => {
        setIsLoading(true)
        fetchAllUser().then((result) => {
            if (result == null) {
                setHasError(true)
            } else {
                setUser(result)
            }
            setIsLoading(false)
        })
    }, [])

    if (hasError) return <ErrorScreen />

    if (isLoading) return <LoadingScreen />

    return (
        <FlatList
            data={user}
            renderItem={({ item }) => UserListItem({ user: item })}
        />
    )
}

const UserListItem = (props: { user: User }) => {
    return (
        <Card key={props.user.id} containerStyle={styles.cardStyle}>
            <Text style={styles.titleTextStyle}>{props.user.username}</Text>
            <View style={{ height: 8 }} />
            <UserListItemRow label="firstname" value={props.user.name.firstname} />
            <UserListItemRow label="lastname" value={props.user.name.lastname} />
            <View style={{ height: 8 }} />
            <UserListItemRow label="email" value={props.user.email} />
            <UserListItemRow label="phone" value={props.user.phone} />
            <View style={{ height: 8 }} />
            <UserListItemRow label="street" value={props.user.address.street + props.user.address.number} />
            <UserListItemRow label="city" value={props.user.address.city + props.user.address.zipcode} />
        </Card>
    )
}

const UserListItemRow = (props: { label: string, value: string }) => {
    return (
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.labelTextStyle}>{props.label}</Text>
            <Text style={styles.valueTextStyle}>{props.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleTextStyle: {
        fontSize: 16,
        fontWeight: "600",
        color: "black"
    },
    labelTextStyle: {
        flex: 1,
        fontSize: 12,
        fontWeight: "300",
        color: "grey",
        textTransform: "uppercase"
    },
    valueTextStyle: {
        flex: 2,
        color: "black",
        fontSize: 14
    },
    cardStyle: {
        borderWidth: 0,
        borderRadius: 6,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    }
});

export default UserScreen