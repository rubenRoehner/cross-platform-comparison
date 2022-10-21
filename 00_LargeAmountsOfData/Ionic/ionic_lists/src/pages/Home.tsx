import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ComplexListItem from '../components/ComplexListItem';
import SimpleListItem from '../components/SimpleListItem';
import './Home.css';

const itemCount = 100;
const showSimpleItems = false;

function getItems(n: number) {
  const items = [];
  for (let i = 1; i <= n; i++) {
    items.push({ title: 'Item no.' + i, paragraph: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.' });
  }
  return items;
}

const Home: React.FC = () => {
  var items = getItems(itemCount)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic test larger amounts of data</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {items.map(item => {
            if (showSimpleItems) {
              return <SimpleListItem title={item.title} />
            } else {
              return <ComplexListItem title={item.title} paragraph={item.paragraph} />
            }
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
