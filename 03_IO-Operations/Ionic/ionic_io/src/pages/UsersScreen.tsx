import { IonCard, IonCardContent, IonContent, IonList, IonPage } from "@ionic/react"
import { useEffect, useState } from "react"
import ErrorScreen from "./ErrorScreen"
import LoadingScreen from "./LoadingScreen"
import { User } from "../data/models/User"
import { fetchAllUser } from "../data/services/UserService"

const UsersScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        setIsLoading(true)
        fetchAllUser().then((result) => {
            if (result == null) {
                setHasError(true)
            } else {
                setUsers(result)
            }
            setIsLoading(false)
        })
    }, [])

    if (hasError) return <ErrorScreen />

    if (isLoading) return <LoadingScreen />

    return (
        <IonPage>
            <IonContent>
                <IonList>
                    {users.map(user => {
                        return <UserListItem user={user} />
                    })}
                </IonList>
            </IonContent>
        </IonPage>
    )
}

const UserListItem = (props: { user: User }) => {
    return (
        <IonCard>
            <IonCardContent>
                <p style={titleTextStyle}>{props.user.username}</p>
                <div style={{ height: "8px" }} />
                <UserListItemRow label="firstname" value={props.user.name.firstname} />
                <UserListItemRow label="lastname" value={props.user.name.lastname} />
                <div style={{ height: "8px" }} />
                <UserListItemRow label="email" value={props.user.email} />
                <UserListItemRow label="phone" value={props.user.phone} />
                <div style={{ height: "8px" }} />
                <UserListItemRow label="street" value={props.user.address.street + props.user.address.number} />
                <UserListItemRow label="city" value={props.user.address.city + props.user.address.zipcode} />
            </IonCardContent>
        </IonCard>
    )
}

const UserListItemRow = (props: { label: string, value: string }) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <p style={labelTextStyle}>{props.label}</p>
            <p style={valueTextStyle}>{props.value}</p>
        </div>
    )
}

const titleTextStyle = {
    fontSize: "16px",
    fontWeight: 600,
    color: "black"
}

const labelTextStyle = {
    flex: 1,
    fontSize: "12px",
    fontWeight: 300,
    color: "grey",
    textTransform: "uppercase" as "uppercase"
}

const valueTextStyle = {
    flex: 2,
    color: "black",
    fontSize: "14px"
}

export default UsersScreen
