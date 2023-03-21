import { IonContent, IonItem, IonLabel, IonList, IonPage } from "@ionic/react"
import { useEffect, useState } from "react"
import ErrorScreen from "./ErrorScreen"
import LoadingScreen from "./LoadingScreen"
import { Cart } from "../data/models/Cart"
import { fetchAllCarts } from "../data/services/CartService"

const CartsScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [carts, setCarts] = useState<Cart[]>([])

    useEffect(() => {
        setIsLoading(true)
        fetchAllCarts().then((result) => {
            if (result == null) {
                setHasError(true)
            } else {
                setCarts(result)
            }
            setIsLoading(false)
        })
    }, [])

    if (hasError) return <ErrorScreen />

    if (isLoading) return <LoadingScreen />

    return (
        <IonPage>
            <IonList>
                {carts.map(cart => {
                    return cartListItem(cart)
                })}
            </IonList>
        </IonPage>
    )
}

const cartListItem = (cart: Cart) => {
    return (
        <IonItem>
            <IonContent>
                <IonLabel>
                    <h2>{cart.date}</h2>
                    <p>{cart.products.length} Products</p>
                </IonLabel>
            </IonContent>
        </IonItem>
    )
}

export default CartsScreen