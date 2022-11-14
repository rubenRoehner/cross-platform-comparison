import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonImg } from "@ionic/react";
import CSS from "csstype"

export interface CustomCardData { title: string, subtitle: string, label: string, imgUrl: string }

const CustomCard: React.FC<CustomCardData> = ({ title, subtitle, label, imgUrl }) => (
    <IonCard style={cardStyle}>
        <img src="assets/images/ionic_logo.png" style={cardImgStyle} />
        <div style={cardContentStyle}>
            <p>{title}</p>
            <p style={subtitleStyle}>{subtitle}</p>
            <p>{label}</p>
        </div>
    </IonCard >
);

const cardStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    aspectRatio: 2 / 3,
    margin: 0,
    maxHeight: "100%"
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