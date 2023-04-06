import { IonContent, IonHeader, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ListItem from '../components/ListItem';
import './Home.css';
import mockData from '../data/MockData_1000.json'
import { Virtuoso } from 'react-virtuoso'

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
    const items = this.getItems(searchValue)
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Ionic: lists</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSearchbar value={searchValue} onIonChange={(event) => { this.updateSearch(event.target.value) }}></IonSearchbar>
          <IonContent>
            <Virtuoso
              style={{ height: '100%' }}
              totalCount={items.length}
              itemContent={(index) => {
                const item = items[index]
                return <ListItem title={item.title} description={item.description} price={item.price} material={item.material} />
              }}
            />
          </IonContent>
        </IonContent>
      </IonPage>
    );

  }
}
