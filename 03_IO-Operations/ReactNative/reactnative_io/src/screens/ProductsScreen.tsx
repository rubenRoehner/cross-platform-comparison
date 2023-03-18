import { useEffect, useState } from "react"
import ErrorScreen from "./ErrorScreen"
import LoadingScreen from "./LoadingScreen"
import { Card, Chip, FAB, Icon, Image } from "@rneui/themed"
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import { Product } from "../data/models/Product"
import { addNewProduct, deleteProduct, fetchAllProducts } from "../data/services/ProductService"
import CreatProductDialog from "../components/CreateProductDialog"
import Snackbar from "react-native-snackbar"

const ProductsScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [showCreateDialog, setCreatDialogVisible] = useState(false)

    const toggleCreateDialog = () => {
        setCreatDialogVisible(!showCreateDialog)
    }

    const uploadNewProduct = (product: Product) => {
        toggleCreateDialog()
        addNewProduct(product).then((result) => {
            if (result == null) {
                Snackbar.show({
                    text: "Failed to add product: " + product.title,
                    duration: Snackbar.LENGTH_LONG,
                })
            } else {
                Snackbar.show({
                    text: "Successfully added product: " + product.title,
                    duration: Snackbar.LENGTH_LONG,
                })
            }
        }, (reason) => {
            Snackbar.show({
                text: "Failed to add product: " + product.title,
                duration: Snackbar.LENGTH_LONG,
            })
            console.error("Failed to add product: " + reason)
        })
    }

    const onDeleteProduct = (product: Product) => {
        deleteProduct(product).then((result) => {
            if (result == null) {
                Snackbar.show({
                    text: "Failed to delete product: " + product.title,
                    duration: Snackbar.LENGTH_LONG,
                })
            } else {
                Snackbar.show({
                    text: "Successfully deleted product: " + product.title,
                    duration: Snackbar.LENGTH_LONG,
                })
            }
        }, (reason) => {
            Snackbar.show({
                text: "Failed to add product: " + product.title,
                duration: Snackbar.LENGTH_LONG,
            })
            console.error("Failed to delete product: " + reason)
        })
    }

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
        <>
            <FlatList
                data={products}
                renderItem={({ item }) => ProductListItem({ product: item, onDelete: () => { onDeleteProduct(item) } })} />
            <FAB style={styles.fabStyle} color="dodgerblue" onPress={toggleCreateDialog}><Icon name="add" color="white" /></FAB>
            <CreatProductDialog isVisible={showCreateDialog} dismissDialog={toggleCreateDialog} onCreateProduct={uploadNewProduct} />
        </>
    )
}

const ProductListItem = (props: { product: Product, onDelete(): void }) => {
    return (
        <Pressable onLongPress={props.onDelete}>
            <Card key={props.product.id} containerStyle={styles.cardStyle}>
                <Image source={{ uri: props.product.image }} style={styles.productImageStyle} resizeMode="contain" />
                <View style={{ height: 20 }} />
                <Text style={styles.titleStyle}>{props.product.title}</Text>
                <View style={{ height: 8 }} />
                <Text style={styles.subtitleStyle}>{props.product.description}</Text>
                <View style={{ height: 20 }} />
                <View style={styles.bottomSection}>
                    <Text style={styles.categoryLabelStyle}>{props.product.category}</Text>
                    <Chip color="dodgerblue"><Text>{props.product.price}€</Text></Chip>
                </View>
            </Card>
        </Pressable>
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
    },
    fabStyle: {
        position: 'absolute',
        bottom: 25,
        right: 25,
    }
});

export default ProductsScreen