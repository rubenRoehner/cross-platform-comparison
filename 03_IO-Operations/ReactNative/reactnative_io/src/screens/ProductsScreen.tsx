import { useEffect, useState } from "react"
import ErrorScreen from "./ErrorScreen"
import LoadingScreen from "./LoadingScreen"
import { Card, Chip, Image, ListItem } from "@rneui/themed"
import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { Product } from "../data/models/Product"
import { fetchAllProducts } from "../data/services/ProductService"
import { CardTitle } from "@rneui/base/dist/Card/Card.Title"

const ProductsScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        setIsLoading(true)
        fetchAllProducts().then((result) => {
            if (result == null) {
                setHasError(true)
            } else {
                setProducts(result)
            }
            setIsLoading(false)
        })
    }, [])

    if (hasError) return <ErrorScreen />

    if (isLoading) return <LoadingScreen />

    return (
        <FlatList
            data={products}
            renderItem={({ item }) => ProductListItem({ product: item })}
        />
    )
}

const ProductListItem = (props: { product: Product }) => {
    return (
        <Card key={props.product.id} containerStyle={styles.cardStyle}>
            <Image source={{ uri: props.product.image }} style={styles.productImageStyle} resizeMode="contain" />
            <View style={{ height: 20 }} />
            <Text style={styles.titleStyle}>{props.product.title}</Text>
            <View style={{ height: 8 }} />
            <Text style={styles.subtitleStyle}>{props.product.description}</Text>
            <View style={{ height: 20 }} />
            <View style={styles.bottomSection}>
                <Text style={styles.categoryLabelStyle}>{props.product.category}</Text>
                <Chip><Text>{props.product.price}€</Text></Chip>
            </View>
        </Card>
    )
}
const styles = StyleSheet.create({
    productImageStyle: {
        height: 150,
    },
    titleStyle: {
        fontSize: 16
    },
    subtitleStyle: {
        lineClamp: 3,
        WebkitLineClamp: 3,
        textOverflow: "ellipsis",
        overflow: "hidden",
        lineHeight: 16,
        maxHeight: 48
    },
    bottomSection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    categoryLabelStyle: {
        textTransform: "uppercase"
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

export default ProductsScreen