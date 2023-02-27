import React, {useEffect} from 'react';
import {IAnswer} from "../../models/IAnswer";
import styles from "../QuestionItem/QuestionItem.module.css";
import {IonItem, IonLabel, IonRadio, IonRadioGroup} from "@ionic/react";

interface SingleAnswerProps {
    answers: IAnswer[];
    setSelection: Function;
    questionId: number;
}

const SingleAnswer: React.FC<SingleAnswerProps> = ({answers, setSelection, questionId}) => {
    const [yourAnswer, setYourAnswer] = React.useState<number>();

    useEffect(() => {
        setSelection((prev: any) => ({...prev, [questionId]: yourAnswer}))
    }, [yourAnswer])

    const onChange = (e: any) => {
        setYourAnswer(e.detail.value)
    }

    return (
        <IonRadioGroup onIonChange={onChange} value={yourAnswer}>
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
