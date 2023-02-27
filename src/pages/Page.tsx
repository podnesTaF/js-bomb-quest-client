import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useParams } from 'react-router';
import './Page.css';
import React from "react";
import Levels from "../components/Levels";

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <div className='intro'>
        <IonText color="primary">
          <h1>Welcome to js - react master Questions</h1>
        </IonText>
        <p>
          You can start from what you want, but to get the most form the test start with first module and so on
        </p>
      </div>
      <div>
        <Levels />
      </div>
    </IonPage>
  );
};

export default Page;
