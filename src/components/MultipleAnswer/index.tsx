import {IonCheckbox, IonItem, IonLabel} from '@ionic/react';
import React from 'react';
import {IAnswer} from "../../models/IAnswer";

interface MultipleAnswerProps {
    answers: IAnswer[];
}

const MultipleAnswer: React.FC<MultipleAnswerProps> = ({answers}) => {
    return (
        <>
            {answers && answers.map((answer: IAnswer) => (
                <IonItem key={answer.id}>
                    <IonCheckbox slot="start" value={answer.id}></IonCheckbox>
                    <IonLabel>{answer.attributes.text}</IonLabel>
                </IonItem>
            ))}
        </>
    );
};

export default MultipleAnswer;
