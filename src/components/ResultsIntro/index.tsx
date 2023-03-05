import React from 'react';
import styles from './ResultsIntro.module.css';
import {IonHeader, IonSkeletonText, IonSpinner, IonText} from "@ionic/react";
import {countPercentage} from "../../utils/count";
import {useFetchQuestionsQuery} from "../../services/QuestionService";

interface ResultIntroProps {
    sectionName: string;
    results: any;
    moduleId: number;
}

const ResultsIntro: React.FC<ResultIntroProps> = ({sectionName, results, moduleId}) => {
    const {data, error, isLoading} = useFetchQuestionsQuery(moduleId)
   const [percentage, setPercentage] = React.useState<number>(0);

    React.useEffect(() => {
        if(data) {
            setPercentage(countPercentage(results, data?.data))
        }
    }, [data])

    const styleObj = {
        background: `linear-gradient(to right, white ${data ? percentage : 0}%, transparent 0) content-box`,
    }

    return (
        <div
            style={{backgroundColor: percentage ? percentage >= 50 ? '#3b99a2' : 'red' : 'lightgray'}}
            className={styles.intro}>
            <div style={{backgroundColor: percentage ? percentage >= 50 ? '#4EB1BA' : '#ff003b' : 'lightgray'}} className={styles.container}>
                <div className={styles.text}>
                    {data ? (
                        percentage < 50 ? (
                            <>
                                <IonText color="danger">
                                    <h2>Try again!</h2>
                                </IonText>
                                <p>You failed the section:</p>
                                <IonText color="light">
                                    <h1>{sectionName}</h1>
                                </IonText>
                                <p>
                                    your score is: {isLoading ? <IonSpinner color={'light'} name="crescent"></IonSpinner> : <IonText color="light">{percentage}%</IonText>}
                                </p>
                                <p>Score at least 50% to pass</p>
                            </>
                        ) : (
                            <>
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
                                    your score is: {isLoading ? <IonSpinner color={'light'} name="crescent"></IonSpinner> : <IonText color="light">{percentage}%</IonText>}
                                </p>
                            </>
                        )
                    ) : (
                       <>
                           <IonHeader className={styles.skeletonHeader}>
                               <IonSkeletonText animated={true}></IonSkeletonText>
                           </IonHeader>
                           <IonText className={styles.skeletonText} color="light">
                               <IonSkeletonText animated={true}></IonSkeletonText>
                           </IonText>
                           <div style={{width: '40%', height: 20}}>
                               <IonSkeletonText animated={true}></IonSkeletonText>
                           </div>
                           <IonText className={styles.skeletonText} color="light">
                               <IonSkeletonText animated={true}></IonSkeletonText>
                           </IonText>
                       </>
                    )}
                </div>
                <div className={styles.wrapper}>
                    <div style={styleObj}
                         className={styles.circle}>
                        <IonText color="dark">
                            <h1>{isLoading ?  <IonSpinner color={'light'} name="crescent"></IonSpinner> : ` ${percentage}`}%</h1>
                        </IonText>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsIntro;
