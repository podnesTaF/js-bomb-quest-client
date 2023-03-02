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
            <div className={styles.container}>
                <div className={styles.text}>
                    <IonText color="success">
                        <h2>Congratulations!</h2>
                    </IonText>
                    <p>
                        You passed section:
                    </p>
                    <IonText color="light">
                        <h1>{sectionName}</h1>
                    </IonText>
                    <p>
                        your score is: <IonText color="light">{percentage}%</IonText>
                    </p>
                </div>
                <div className={styles.wrapper}>
                    <div style={{background: `linear-gradient(to right, white ${percentage}%, transparent 0) content-box`}}
                         className={styles.circle}>
                        <IonText color="dark">
                            <h2>{percentage}%</h2>
                        </IonText>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsIntro;
