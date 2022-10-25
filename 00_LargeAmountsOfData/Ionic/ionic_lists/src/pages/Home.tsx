import { IonContent, IonHeader, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ComplexListItem from '../components/ComplexListItem';
import SimpleListItem, { ListItemData } from '../components/SimpleListItem';
import './Home.css';

const itemCount = 100;
const showSimpleItems = false;


export default class Home extends React.Component {
  state = {
    searchValue: ""
  }

  getItems(n: number, searchValue: string) {
    const items = [];
    for (let i = 1; i <= n; i++) {
      items.push({ title: 'Item no.' + i, paragraph: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.', index: i });
    }
    return items.filter((itemData: ListItemData) => itemData.title.toLowerCase().includes(searchValue.toLowerCase()) || itemData.paragraph.toLowerCase().includes(searchValue.toLowerCase()))
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
            {this.getItems(itemCount, searchValue).map(item => {
              if (showSimpleItems) {
                return <SimpleListItem title={item.title} paragraph={item.paragraph} index={item.index} />
              } else {
                return <ComplexListItem title={item.title} paragraph={item.paragraph} index={item.index} />
              }
            })}
          </IonList>
        </IonContent>
      </IonPage>
    );

  }
}
