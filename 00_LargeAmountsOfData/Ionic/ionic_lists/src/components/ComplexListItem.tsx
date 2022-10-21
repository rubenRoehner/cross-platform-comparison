import { IonItem, IonLabel } from "@ionic/react";

export type ComplexListItemProps = { title: string, paragraph: string }

const ComplexListItem: React.FC<ComplexListItemProps> = (props: ComplexListItemProps) => (
    <IonItem detail>
        <IonLabel text-wrap>
            <h2>{props.title}</h2>
            <p>{props.paragraph}</p>
        </IonLabel>
    </IonItem>
);

export default ComplexListItem;