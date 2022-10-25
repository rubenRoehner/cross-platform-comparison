import { IonItem, IonLabel } from "@ionic/react";
import { ListItemData } from "./SimpleListItem";

const ComplexListItem: React.FC<ListItemData> = (props: ListItemData) => (
    <IonItem detail>
        <IonLabel text-wrap>
            <h2>{props.title}</h2>
            <p>{props.paragraph}</p>
        </IonLabel>
    </IonItem>
);

export default ComplexListItem;