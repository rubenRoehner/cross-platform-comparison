import { IonItem, IonLabel } from "@ionic/react";

export interface SimpleListItemData { title: string }

const SimpleListItem: React.FC<SimpleListItemData> = ({ title }) => (
    <IonItem detail>
        <IonLabel>
            {title}
        </IonLabel>
    </IonItem>
);

export default SimpleListItem;