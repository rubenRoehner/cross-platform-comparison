import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonImg, IonList, IonPage } from "@ionic/react"
import { useEffect, useState } from "react"
import ErrorScreen from "../../components/ErrorScreen"
import LoadingScreen from "../../components/LoadingScreen"
import { Product } from "../../data/models/Product"
import { fetchAllProducts } from "../../data/services/ProductService"

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
        <IonPage>
            <IonContent>
                <IonList>
                    {products.map(product => {
                        return <ProductListItem product={product} />
                    })}
                </IonList>
            </IonContent>
        </IonPage>
    )
}

const ProductListItem = (props: { product: Product }) => {
    return (
        <IonCard>
            <IonImg src={props.product.image} style={productImageStyle} />
            <div style={{ height: "20px" }} />
            <IonCardContent>
                <IonCardTitle style={titleStyle}>{props.product.title}</IonCardTitle>
                <div style={{ height: "8px" }} />
                <IonCardSubtitle style={subtitleStyle}>{props.product.description}</IonCardSubtitle>
                <div style={{ height: "20px" }} />
                <div style={bottomSection}>
                    <p style={categoryLabelStyle}>{props.product.category}</p>
                    <IonChip color="primary">{props.product.price}€</IonChip>
                </div>
            </IonCardContent>
        </IonCard>
    )
}

const productImageStyle = {
    height: "150px"
}

const titleStyle = {
    fontSize: "16px"
}

const subtitleStyle = {
    lineClamp: 3,
    WebkitLineClamp: 3,
    textOverflow: "ellipsis",
    overflow: "hidden",
    lineHeight: "16px",
    maxHeight: "48px"
}

const bottomSection = {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "space-between"
}

const categoryLabelStyle = {
    textTransform: "uppercase" as "uppercase"
}

export default ProductsScreen