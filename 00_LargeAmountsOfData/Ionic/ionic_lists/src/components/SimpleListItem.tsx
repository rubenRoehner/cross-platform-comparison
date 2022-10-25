import { IonItem, IonLabel } from "@ionic/react";

export interface ListItemData { title: string, paragraph: string, index: number }

const SimpleListItem: React.FC<ListItemData> = ({ title }: ListItemData) => (
    <IonItem>
        <IonLabel>
            {title}
        </IonLabel>
    </IonItem>
);

export default SimpleListItem;