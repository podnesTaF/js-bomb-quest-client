import {IonCheckbox, IonItem, IonLabel} from '@ionic/react';
import React, {useEffect} from 'react';
import {IAnswer} from "../../models/IAnswer";

interface MultipleAnswerProps {
    answers: IAnswer[];
    setSelection: Function
    questionId: number;
}

const MultipleAnswer: React.FC<MultipleAnswerProps> = ({answers, setSelection, questionId}) => {
    const [values, setValues] = React.useState<string[]>([]);


    useEffect(() => {
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
                    <IonCheckbox onIonChange={onChange} slot="start" value={answer.id}></IonCheckbox>
                    <IonLabel>{answer.attributes.text}</IonLabel>
                </IonItem>
            ))}
        </>
    );
};

export default MultipleAnswer;
