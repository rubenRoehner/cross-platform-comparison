import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import CustomPainter from '../components/CustomPainter';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Canvases</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color={"tertiary"} scrollY={false}>
        <CustomPainter />
      </IonContent>
    </IonPage>
  );
};

export default Home;
