import { IonChip, IonItem, IonLabel } from "@ionic/react";

export interface ListItemData { title: string, description: string, price: string, material: string }

const ListItem: React.FC<ListItemData> = (itemData) => (
    <IonItem>
        <IonLabel text-wrap>
            <h1>{itemData.title}</h1>
            <h3>{itemData.material.toUpperCase()}</h3>
            <p>{itemData.description}</p>
        </IonLabel>
        <IonChip color="primary">{itemData.price} $</IonChip>
    </IonItem>
);

export default ListItem;