import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonHeader, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import ProductsScreen from './pages/ProductsScreen';
import UsersScreen from './pages/UsersScreen';
import CartsScreen from './pages/CartsScreen';
import { cart, list, people } from 'ionicons/icons';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Ionic: REST</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/products" component={ProductsScreen} exact={true} />
            <Route path="/user" component={UsersScreen} exact={true} />
            <Route path="/carts" component={CartsScreen} exact={true} />
            <Route path="/" render={() => <Redirect to="/products" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="products" href='/products'>
              <IonIcon icon={list} aria-hidden="true" />
              <IonLabel>Products</IonLabel>
            </IonTabButton>
            <IonTabButton tab="user" href='/user'>
              <IonIcon icon={people} aria-hidden="true" />
              <IonLabel>User</IonLabel>
            </IonTabButton>
            <IonTabButton tab="carts" href='/carts'>
              <IonIcon icon={cart} aria-hidden="true" />
              <IonLabel>Carts</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonContent>
  </IonApp>
);

export default App;
