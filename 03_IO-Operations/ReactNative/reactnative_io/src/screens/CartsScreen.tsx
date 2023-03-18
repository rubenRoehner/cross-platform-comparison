import { useEffect, useState } from "react"
import ErrorScreen from "./ErrorScreen"
import LoadingScreen from "./LoadingScreen"
import { Cart } from "../data/models/Cart"
import { fetchAllCarts } from "../data/services/CartService"
import { ListItem } from "@rneui/themed"
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content"
import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList } from "react-native"
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title"
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle"

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
        <FlatList
            data={carts}
            renderItem={({ item }) => cartListItem(item)}
        />
    )
}

const cartListItem = (cart: Cart) => {
    const key = 0.5 * (cart.id + cart.userId) * (cart.id + cart.userId + 1) + cart.userId
    return (
        <ListItem key={key}>
            <ListItemContent>
                <ListItemTitle>{cart.date}</ListItemTitle>
                <ListItemSubtitle>{cart.products.length} Products</ListItemSubtitle>
            </ListItemContent>
        </ListItem>
    )
}

export default CartsScreen