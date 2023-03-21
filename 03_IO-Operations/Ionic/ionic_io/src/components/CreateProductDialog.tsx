import { IonButton, IonInput, IonModal, IonRow } from "@ionic/react"
import { forwardRef, useState } from "react";
import { Product } from "../data/models/Product";

import "./CreateProductDialog.css"

const CreateProductDialog = forwardRef<HTMLIonModalElement, { onCancel(): void, onCreateProduct(product: Product): void }>((props, dialogRef) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

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

    const onCancel = () => {
        props.onCancel()
    }

    const onCreate = () => {
        const id = 21 + Math.floor(Math.random() * 50);
        const category = "default"
        const image = "none"
        const product = {
            id, title, description, price, category, image
        }
        props.onCreateProduct(product);
    }

    return (
        <IonModal id="modalDialog" ref={dialogRef}>
            <div style={{ margin: 10 }}>
                <IonInput placeholder="title" value={title} onIonChange={(element) => { onChangeTitle(element.target.value) }} />
                <IonInput placeholder="description" value={description} onIonChange={(element) => { onChangeDescription(element.target.value) }} />
                <IonInput placeholder="price" type="number" value={price} onIonChange={(element) => { onChangePrice(element.target.value) }} />
                <IonRow>
                    <IonButton onClick={onCancel}>cancel</IonButton>
                    <IonButton onClick={onCreate}>create</IonButton>
                </IonRow>
            </div>
        </IonModal>
    )
})

export default CreateProductDialog