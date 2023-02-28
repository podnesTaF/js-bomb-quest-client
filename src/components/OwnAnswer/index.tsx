import React, {useEffect} from 'react';
import {IAnswer} from "../../models/IAnswer";
import {IonInput, IonItem, IonLabel} from "@ionic/react";

interface OwnAnswerProps {
    setSelection?: Function;
    questionId: number;
    value?: any;
    correctAnswer?: any;
}

const OwnAnswer: React.FC<OwnAnswerProps> = ({questionId, setSelection, value, correctAnswer}) => {
    const [ownAnswer, setOwnAnswer] = React.useState<any>(value || '')

    useEffect(() => {
        if(!setSelection) return;
        setSelection((prev: any) => ({...prev, [questionId]: ownAnswer}))
    }, [ownAnswer]);


    return (
        <IonItem>
            <IonLabel position="floating">Your Answer</IonLabel>
            <IonInput color={correctAnswer === ownAnswer ? "success" : !correctAnswer ? 'initial' : 'danger'} onIonChange={e => setOwnAnswer(e.target.value)} value={ownAnswer} placeholder="Enter your answer here"></IonInput>
        </IonItem>
    );
};

export default OwnAnswer;
