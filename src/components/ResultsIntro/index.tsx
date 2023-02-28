import React from 'react';
import styles from './ResultsIntro.module.css';
import {IonText} from "@ionic/react";

interface ResultIntroProps {
    sectionName: string;
    percentage: number;
}

const ResultsIntro: React.FC<ResultIntroProps> = ({sectionName, percentage}) => {
    return (
        <div className={styles.intro}>
            <div className={styles.text}>
                <IonText color="secondary">
                    <h2>Congratulations!</h2>
                </IonText>
                <p>
                    You passed section:
                </p>
                <IonText color="primary">
                    <h1>{sectionName}</h1>
                </IonText>
                <p>
                    your score is: <IonText color="success">{percentage}%</IonText>
                </p>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.circle}>
                    <IonText color="secondary">
                        <h2>{percentage}%</h2>
                    </IonText>
                </div>
            </div>
        </div>
    );
};

export default ResultsIntro;
