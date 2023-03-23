import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonHeader, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { SQLiteHook, useSQLite } from 'react-sqlite-hook';

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
import { list, settings } from 'ionicons/icons';
import SettingsScreen from './pages/SettingsScreen';
import TodosScreen from './pages/TodosScreen';
import { useState } from 'react';

interface JsonListenerInterface {
  jsonListeners: boolean,
  setJsonListeners: React.Dispatch<React.SetStateAction<boolean>>,
}
interface existingConnInterface {
  existConn: boolean,
  setExistConn: React.Dispatch<React.SetStateAction<boolean>>,
}
// Singleton SQLite Hook
export let sqlite: SQLiteHook;
// Existing Connections Store
export let existingConn: existingConnInterface;
// Is Json Listeners used
export let isJsonListeners: JsonListenerInterface;

setupIonicReact();

const App: React.FC = () => {
  const [existConn, setExistConn] = useState(false);
  existingConn = { existConn: existConn, setExistConn: setExistConn };

  sqlite = useSQLite();
  console.log(`$$$ in App sqlite.isAvailable  ${sqlite.isAvailable} $$$`);

  return (<IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Ionic persistence test</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/todos" component={TodosScreen} exact={true} />
            <Route path="/settings" component={SettingsScreen} exact={true} />
            <Route path="/" render={() => <Redirect to="/todos" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="todos" href='/todos'>
              <IonIcon icon={list} aria-hidden="true" />
              <IonLabel>Todos</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href='/settings'>
              <IonIcon icon={settings} aria-hidden="true" />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonContent>
  </IonApp>
  );
}

export default App;
