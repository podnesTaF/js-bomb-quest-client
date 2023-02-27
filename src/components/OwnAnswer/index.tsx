import React, {useEffect} from 'react';
import {IAnswer} from "../../models/IAnswer";
import {IonInput, IonItem, IonLabel} from "@ionic/react";

interface OwnAnswerProps {
    setSelection: Function;
    questionId: number;
}

const OwnAnswer: React.FC<OwnAnswerProps> = ({questionId, setSelection}) => {
    const [ownAnswer, setOwnAnswer] = React.useState<string | number | null | undefined>('');

    useEffect(() => {
        setSelection((prev: any) => ({...prev, [questionId]: ownAnswer}))
    }, [ownAnswer]);


    return (
        <IonItem>
            <IonLabel position="floating">Your Answer</IonLabel>
            <IonInput onIonChange={e => setOwnAnswer(e.target.value)} value={ownAnswer} placeholder="Enter your answer here"></IonInput>
        </IonItem>
    );
};

export default OwnAnswer;
