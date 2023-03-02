import React from 'react';
import {IModule} from "../../models/IModule";
import styles from './ModuleItem.module.css';
import {IonButton} from "@ionic/react";
import {defineColor} from "../../utils/count";
import {NavLink} from "react-router-dom";

interface ModuleItemProps {
    module: IModule;
}

const ModuleItem: React.FC<ModuleItemProps> = ({module}) => {
    const isFinished = localStorage.getItem('results-' + module.id);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <h3>{module.attributes.name}</h3>
                    <h4>Complexity</h4>
                </div>
                <div className={styles.btns}>
                    {isFinished && <NavLink to={'/modules/' + module.id + '/results'}>
                         <IonButton fill={'outline'} color={'dark'}>
                            Last Results
                        </IonButton>
                    </NavLink>}
                    <NavLink to={'/modules/' + module.id}>
                        <IonButton fill={'outline'} color={'success'}>
                            Start Quiz
                        </IonButton>
                    </NavLink>
                </div>
            </div>
            <div className={styles.rate}>
                <div className={styles.progress}>
                    <div className={styles.progressInner} style={{width: module.attributes.complexity + '%', backgroundColor: defineColor(module.attributes.complexity)}} />
                </div>
            </div>
        </div>
    );
};

export default ModuleItem;
