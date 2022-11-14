import { IonCol, IonGrid, IonRow } from "@ionic/react";
import CustomCard, { CustomCardData } from "./CustomCard";

export interface GridViewItemData { items: CustomCardData[] }

const GridView: React.FC<GridViewItemData> = ({ items }) => (
    <div>
        <IonGrid>
            <IonRow>
                {
                    items.map((value, index) => (
                        <IonCol size='6'>
                            <CustomCard title={value.title} subtitle={value.subtitle} label={value.label} imgUrl={value.imgUrl} />
                        </IonCol>
                    ))
                }</IonRow>
        </IonGrid>
    </div>
);

export default GridView;