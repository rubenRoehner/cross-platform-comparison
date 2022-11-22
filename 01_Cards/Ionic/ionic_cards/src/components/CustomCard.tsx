import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg } from "@ionic/react";
import CSS from "csstype"

export interface CustomCardData { title: string, subtitle: string, label: string, imgUrl: string }

const CustomCard: React.FC<CustomCardData> = ({ title, subtitle, label, imgUrl }) => (
    <IonCard style={cardStyle}>
        <IonImg src="assets/images/ionic_logo.png" style={cardImgStyle} />
        <IonCardHeader style={cardContentStyle}>
            <IonCardSubtitle style={subtitleStyle}>{subtitle}</IonCardSubtitle>
            <IonCardTitle>{title}</IonCardTitle>
            <p>{label}</p>
        </IonCardHeader>
    </IonCard >
);

const cardStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    aspectRatio: 2 / 3,
    margin: "10px"
}

const cardContentStyle: CSS.Properties = {
    padding: "16px"
}

const cardImgStyle: CSS.Properties = {
    flex: 1,
    objectFit: "scale-down"
}

const subtitleStyle: CSS.Properties = {
    lineClamp: 2,
    WebkitLineClamp: 2,
    textOverflow: "ellipsis",
    overflow: "hidden",
    lineHeight: "16px",
    maxHeight: "32px"
}

export default CustomCard;