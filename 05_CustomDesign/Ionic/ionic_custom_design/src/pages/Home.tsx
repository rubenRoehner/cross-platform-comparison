import { IonPage } from '@ionic/react';
import './Home.css'

const Home: React.FC = () => {
  return (
    <IonPage>
      <div className="contentStyle">
        <button className="styledButton">Styled Button</button>
        <img src="assets/images/RWU_Logo.png" className="styledImage" />
        <div>
          <input className="styledTextfield" placeholder="Placeholder" type="email" required></input>
          <span>Error: invalid input</span>
        </div>
      </div>
    </IonPage>
  );
};

export default Home;
