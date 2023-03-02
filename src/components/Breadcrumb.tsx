import React from 'react';
import {IonBreadcrumb, IonBreadcrumbs} from "@ionic/react";
import {NavLink} from "react-router-dom";

const Breadcrumb: React.FC<{items?: string[], moduleId?: number}> = ({items, moduleId}) => {
    return (
        <IonBreadcrumbs>
            <IonBreadcrumb className='menu-item' href="/">/ modules</IonBreadcrumb>
            {items?.length && <NavLink style={{textDecoration: 'none'}} to={'/modules/' + moduleId}>
                <IonBreadcrumb className='menu-item'>{items[0]}</IonBreadcrumb>
            </NavLink>}
            {items && items.length > 1 &&
                <NavLink style={{textDecoration: 'none'}} to={'/modules/' + moduleId + '/results'}>
                    <IonBreadcrumb  className='menu-item'>{items[1]}</IonBreadcrumb>
                </NavLink>
            }
        </IonBreadcrumbs>
    );
};

export default Breadcrumb;
