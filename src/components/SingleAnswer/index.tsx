import React, {useEffect, useRef} from 'react';
import {IAnswer} from "../../models/IAnswer";
import styles from "../QuestionItem/QuestionItem.module.css";
import {IonItem, IonLabel, IonRadio, IonRadioGroup} from "@ionic/react";

interface SingleAnswerProps {
    answers: IAnswer[];
    setSelection?: Function;
    questionId: number;
    userAnswer?: any;
    correctAnswer?: any;
}

const SingleAnswer: React.FC<SingleAnswerProps> = ({answers, setSelection, questionId, userAnswer, correctAnswer}) => {
    const [yourAnswer, setYourAnswer] = React.useState<any>(userAnswer || null);

    useEffect(() => {
        if(!setSelection) return;
        setSelection((prev: any) => ({...prev, [questionId]: yourAnswer}))
    }, [yourAnswer])

    const onChange = (e: any) => {
        setYourAnswer(e.detail.value)
    }

    return (
        <IonRadioGroup onIonChange={onChange} value={yourAnswer}>
            {answers && answers.map((answer: any) => (
                <IonItem className={answer.id === correctAnswer ? styles.correct : ''} key={answer.id}>
                    <IonLabel>{answer.attributes.text}</IonLabel>
                    <IonRadio disabled={!!userAnswer} slot='start' value={answer.id}></IonRadio>
                </IonItem>
            ))}
        </IonRadioGroup>
    );
};

export default SingleAnswer;
