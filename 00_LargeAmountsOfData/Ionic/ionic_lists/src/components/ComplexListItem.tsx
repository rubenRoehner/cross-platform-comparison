import { IonChip, IonItem, IonLabel } from "@ionic/react";

export interface ComplexListItemData { title: string, description: string, price: string, material: string }

const ComplexListItem: React.FC<ComplexListItemData> = (itemData) => (
    <IonItem>
        <IonLabel text-wrap>
            <h1>{itemData.title}</h1>
            <h3>{itemData.material.toUpperCase()}</h3>
            <p>{itemData.description}</p>
        </IonLabel>
        <IonChip color="primary">{itemData.price} $</IonChip>
    </IonItem>
);

export default ComplexListItem;