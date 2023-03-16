import { IonContent, IonHeader, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ListItem from '../components/ListItem';
import './Home.css';
import mockData from '../data/MockData_1000.json'

export default class Home extends React.Component {
  state = {
    searchValue: ""
  }

  getItems(searchValue: string) {
    const items = mockData;
    return items.filter((itemData) => itemData.title.toLowerCase().includes(searchValue.toLowerCase()) || itemData.description.toLowerCase().includes(searchValue.toLowerCase()))
  }

  updateSearch = (newValue: (string | null | undefined)) => {
    if (newValue !== null && newValue !== undefined) {
      this.setState({ searchValue: newValue })
    }
  }

  render(): React.ReactNode {
    const { searchValue } = this.state
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Ionic test larger amounts of data</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSearchbar value={searchValue} onIonChange={(event) => { this.updateSearch(event.target.value) }}></IonSearchbar>
          <IonList>
            {this.getItems(searchValue).map((item, index) => {
              return <ListItem title={item.title + index} description={item.description} price={item.price} material={item.material} />
            })}
          </IonList>
        </IonContent>
      </IonPage>
    );

  }
}
