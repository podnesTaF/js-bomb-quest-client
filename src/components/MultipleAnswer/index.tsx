import {IonCheckbox, IonItem, IonLabel} from '@ionic/react';
import React, {useEffect} from 'react';
import {IAnswer} from "../../models/IAnswer";

interface MultipleAnswerProps {
    answers: IAnswer[];
    setSelection?: Function;
    userAnswer?: any;
    correctAnswer?: any;
    questionId: number;
}

const MultipleAnswer: React.FC<MultipleAnswerProps> = ({answers, setSelection, questionId, userAnswer, correctAnswer}) => {
    const [values, setValues] = React.useState<string[]>([]);


    useEffect(() => {
        if(!setSelection) return;
        setSelection((prev: any) => ({...prev, [questionId]: values}))
    }, [values]);


    const onChange = (e: any) => {
        if(e.detail.checked) {
            setValues(prev => [...prev, e.detail.value]);
        }
    }

    useEffect(() => {

    }, [])

    return (
        <>
            {answers && answers.map((answer: IAnswer) => (
                <IonItem key={answer.id}>
                    {!userAnswer ? (
                    <IonCheckbox onIonChange={onChange}
                                 slot="start" value={answer.id}></IonCheckbox>
                        ) : (
                        <IonCheckbox
                            disabled={true}
                            color={correctAnswer?.includes(answer.id) ? 'success' : 'danger'}
                                     slot="start" value={answer.id} checked={userAnswer?.includes(answer.id)}></IonCheckbox>
                    )}
                    <IonLabel>{answer.attributes.text}</IonLabel>
                </IonItem>
            ))}
        </>
    );
};

export default MultipleAnswer;
