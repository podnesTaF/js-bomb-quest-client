import {IonApp, IonProgressBar, IonRouterOutlet, IonSplitPane, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Page from './pages/Page';
import React, {useEffect} from "react";

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
import Question from "./pages/Question";
import ResultsPage from "./pages/Results";
import {useFetchModulesQuery} from "./services/ModuleService";

setupIonicReact();

const App: React.FC = () => {
    const {data: data, error, isLoading} = useFetchModulesQuery(true)

  return (
    <IonApp style={{overflow: 'auto', justifyContent: 'start'}}>
      <IonReactRouter>
          {isLoading && (
               <IonProgressBar type="indeterminate"></IonProgressBar>
          )}
          {data?.data && (
              <Route path="/" exact={true}>
                  <Page modules={data.data} />
              </Route>
              )}
          {data?.data.map((module: any) => (
              <React.Fragment key={module.id}>
                  <Route path={`/modules/${module.id}`} exact={true}>
                      <Question module={module} />
                  </Route>
                  <Route path={`/modules/${module.id}/results`} exact={true}>
                      <ResultsPage module={module} />
                  </Route>
              </React.Fragment>
          ))}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
