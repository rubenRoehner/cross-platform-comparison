import { IonIcon } from "@ionic/react"
import { alertCircleOutline } from 'ionicons/icons';


const ErrorScreen: React.FC = () => {
    return (
        <div style={containerStyle}>
            <IonIcon icon={alertCircleOutline} style={iconStyle} />
            <p style={textStyle}>Something went wrong!</p>
        </div>
    )
}

const containerStyle = {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column" as "column"
}

const iconStyle = {
    fontSize: "80px"
}

const textStyle = {
    fontSize: "20px",
    fontWeight: "600"
}

export default ErrorScreen