import React from 'react';
import {IonBreadcrumb, IonBreadcrumbs} from "@ionic/react";

const Breadcrumb = () => {
    return (
        <IonBreadcrumbs>
            <IonBreadcrumb href="/">Home</IonBreadcrumb>
            <IonBreadcrumb href="/js-promises">JS promises</IonBreadcrumb>
        </IonBreadcrumbs>
    );
};

export default Breadcrumb;
