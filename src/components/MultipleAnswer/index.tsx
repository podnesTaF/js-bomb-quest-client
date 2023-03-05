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
        } else {
            setValues(prev => prev.filter(v => v !== e.detail.value))
        }
    }

    const defineLabel = (id: number) => {
        const isYourAnswer = userAnswer?.includes(id);
        const isCorrectAnswer = correctAnswer.includes(id);
        const isYourCorrect = isYourAnswer && isCorrectAnswer;
        if(isYourCorrect) {
            return ' - correct answer (your)'
        } else if(isCorrectAnswer) {
            return ' - correct answer'
        } else if(isYourAnswer) {
            return ' - your answer'
        }
    }

    return (
        <>
            {answers && answers.map((answer: IAnswer) => (
                <IonItem key={answer.id}>
                    {!userAnswer ? (
                       <>
                           <IonCheckbox onIonChange={onChange}
                                        slot="start" value={answer.id}></IonCheckbox>
                           <IonLabel style={{whiteSpace: "pre-wrap", opacity: 1}}>{answer.attributes.text}</IonLabel>
                       </>
                            ) : (

                            <>
                                <IonCheckbox
                                    disabled={true}
                                    style={{opacity: 1}}
                                    color={correctAnswer?.includes(answer.id) ? 'success' : 'danger'}
                                    slot="start" value={answer.id} checked={userAnswer?.includes(answer.id) || correctAnswer.includes(answer.id)}>
                                </IonCheckbox>
                                <IonLabel style={{whiteSpace: "pre-wrap", opacity: 1}}>
                                    {answer.attributes.text} <span style={{color: 'gray'}}>{defineLabel(answer.id)}</span>
                                </IonLabel>
                            </>
                        )}
                    </IonItem>
            ))}
        </>
    );
};

export default MultipleAnswer;
