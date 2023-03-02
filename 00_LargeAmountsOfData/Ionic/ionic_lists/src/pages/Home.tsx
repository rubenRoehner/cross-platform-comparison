import { IonContent, IonHeader, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ComplexListItem from '../components/ComplexListItem';
import SimpleListItem from '../components/SimpleListItem';
import './Home.css';
import mockData from '../data/MockData_1000.json'

const showSimpleItems = false;


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
            {this.getItems(searchValue).map(item => {
              if (showSimpleItems) {
                return <SimpleListItem title={item.title} />
              } else {
                return <ComplexListItem title={item.title} description={item.description} price={item.price} material={item.material} />
              }
            })}
          </IonList>
        </IonContent>
      </IonPage>
    );

  }
}
