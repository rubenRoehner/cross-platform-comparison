import { IonItem, IonLabel } from "@ionic/react";

export type SimpleListItemProps = { title: string }

const SimpleListItem: React.FC<SimpleListItemProps> = ({ title }: SimpleListItemProps) => (
    <IonItem>
        <IonLabel>
            {title}
        </IonLabel>
    </IonItem>
);

export default SimpleListItem;