import React from 'react';
import {IAnswer} from "../../models/IAnswer";
import styles from "../QuestionItem/QuestionItem.module.css";
import {IonItem, IonLabel, IonRadio, IonRadioGroup} from "@ionic/react";

interface SingleAnswerProps {
    answers: IAnswer[];
}

const SingleAnswer: React.FC<SingleAnswerProps> = ({answers}) => {
    return (
        <IonRadioGroup value='answer'>
            {answers && answers.map((answer: any) => (
                <IonItem key={answer.id}>
                    <IonLabel>{answer.attributes.text}</IonLabel>
                    <IonRadio slot='start' value={answer.id}></IonRadio>
                </IonItem>
            ))}
        </IonRadioGroup>
    );
};

export default SingleAnswer;
