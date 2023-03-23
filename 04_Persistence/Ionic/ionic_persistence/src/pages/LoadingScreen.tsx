import { IonSpinner } from "@ionic/react"

const LoadingScreen: React.FC = () => {
    return (
        <div style={containerStyle}>
            <IonSpinner name="circular" style={spinnerStyle}></IonSpinner>
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

const spinnerStyle = {
    width: "50px",
    height: "50px"
}

export default LoadingScreen