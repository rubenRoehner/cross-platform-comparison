import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonFab, IonFabButton, IonIcon, IonImg, IonInput, IonList, IonModal, IonPage, IonRow, useIonToast } from "@ionic/react"
import { useEffect, useRef, useState } from "react"
import ErrorScreen from "./ErrorScreen"
import LoadingScreen from "./LoadingScreen"
import { Product } from "../data/models/Product"
import { addNewProduct, deleteProduct, fetchAllProducts } from "../data/services/ProductService"
import { add } from 'ionicons/icons';
import { useLongPress } from 'react-use';
import React from "react"

import "../components/CreateProductDialog.css"

const ProductsScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [products, setProducts] = useState<Product[]>([])

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const modal = useRef<HTMLIonModalElement>(null);

    const [present] = useIonToast()

    function dismissDialog() {
        modal.current?.dismiss();
    }

    function presentDialog() {
        console.log(modal.current)
        modal.current?.present();
    }

    const presentToast = (message: string) => {
        present({
            message: message,
            duration: 1500,
            position: 'bottom'
        });
    };

    const onChangeTitle = (value: string | number | null | undefined) => {
        if (typeof value === "string") {
            setTitle(value)
        }
    }

    const onChangeDescription = (value: string | number | null | undefined) => {
        if (typeof value === "string") {
            setDescription(value)
        }
    }

    const onChangePrice = (value: string | number | null | undefined) => {
        if (typeof value === "number") {
            setPrice(value)
        }
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

    const onCreate = () => {
        dismissDialog()
        const id = 21 + Math.floor(Math.random() * 50);
        const category = "default"
        const image = "none"
        const product = {
            id, title, description, price, category, image
        }
        addNewProduct(product).then((result) => {
            if (result == null) {
                presentToast("Failed to add product: " + product.title)
            } else {
                presentToast("Successfully added product: " + product.title)
            }
        }, (reason) => {
            presentToast("Failed to add product: " + product.title)
            console.error("Failed to add product: " + reason)
        })
    }

    const onDelete = (product: Product) => {
        deleteProduct(product).then((result) => {
            if (result == null) {
                presentToast("Failed to delete product: " + product.title)
            } else {
                presentToast("Successfully deleted product: " + product.title)
            }
        }, (reason) => {
            presentToast("Failed to delete product: " + product.title)
            console.error("Failed to delete product: " + reason)
        })

    }

    if (hasError) return <ErrorScreen />

    if (isLoading) return <LoadingScreen />

    return (
        <IonPage>
            <IonContent>
                <IonList>
                    {products.map(product => {
                        return <ProductListItem product={product} onLongPress={onDelete} />
                    })}
                </IonList>
                <IonFab onClick={presentDialog} style={{ position: 'absolute', right: 25, bottom: 25 }}>
                    <IonFabButton>
                        <IonIcon icon={add} color="white" size="24" />
                    </IonFabButton>
                </IonFab>
                <IonModal id="modalDialog" ref={modal}>
                    <div style={{ margin: 10 }}>
                        <IonInput placeholder="title" value={title} onIonChange={(element) => { onChangeTitle(element.target.value) }} />
                        <IonInput placeholder="description" value={description} onIonChange={(element) => { onChangeDescription(element.target.value) }} />
                        <IonInput placeholder="price" type="number" value={price} onIonChange={(element) => { onChangePrice(element.target.value) }} />
                        <IonRow>
                            <IonButton onClick={dismissDialog}>cancel</IonButton>
                            <IonButton onClick={onCreate}>create</IonButton>
                        </IonRow>
                    </div>
                </IonModal>
            </IonContent>
        </IonPage >
    )
}

const ProductListItem = (props: { product: Product, onLongPress(product: Product): void }) => {
    const onLongPress = () => {
        props.onLongPress(props.product)
    };

    const defaultOptions = {
        isPreventDefault: true,
        delay: 300,
    };
    const longPressEvent = useLongPress(onLongPress, defaultOptions);

    return (
        <IonCard className="productCard" {...longPressEvent}>
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