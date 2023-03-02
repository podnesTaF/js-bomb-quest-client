import React, {useEffect} from 'react';
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
        <>
            <IonItem>
                <IonLabel style={{whiteSpace: "pre-wrap", opacity: 1}} color={correctAnswer ? correctAnswer === ownAnswer ? "success" : 'danger' : 'initial'}  position="floating">Your Answer</IonLabel>
                <IonInput disabled={!!correctAnswer} onIonChange={e => setOwnAnswer(e.target.value)} value={ownAnswer} placeholder="Enter your answer here"></IonInput>
            </IonItem>
            {correctAnswer &&  <IonItem><IonLabel style={{whiteSpace: "pre-wrap", opacity: 1}} color="success"  position="floating">Correct Answer:</IonLabel>
                <IonInput disabled={!!correctAnswer} value={correctAnswer} onIonChange={e => setOwnAnswer(e.target.value)} placeholder="Enter your answer here"></IonInput>
            </IonItem>}
        </>
    );
};

export default OwnAnswer;
