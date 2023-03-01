import {IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, ItemReorderEventDetail} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import {IAnswer} from "../../models/IAnswer";

interface OrderProps {
    answers: IAnswer[];
    setSelection?: Function;
    correctAnswer?: any;
    selectedAnswer?: any;
    questionId: number;
}

const Order: React.FC<OrderProps> = ({answers, setSelection, questionId, selectedAnswer, correctAnswer}) => {
    const [anrws, setAnrws] = useState<IAnswer[]>([]);

    useEffect(() => {
        setAnrws(selectedAnswer || [...answers]);
    }, [answers]);

    function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
        if(!setSelection) return;
        setAnrws(prev => event.detail.complete(prev));
        setSelection((prev: any) => ({...prev, [questionId]: anrws}))
    }


    return (
        <IonList>
            <IonReorderGroup disabled={!!selectedAnswer} onIonItemReorder={(e) => handleReorder(e)}>
                {anrws && anrws.map((answer: IAnswer, i) => {
                    let isCorrect = null;
                    if(answer.attributes.position === i) {
                        isCorrect = true;
                    } else {
                        isCorrect = false;
                    }
                    return (
                        <IonReorder key={answer.id}>
                            <IonItem color={selectedAnswer ? isCorrect ? 'success' : 'danger': "initial"}>
                                <IonLabel>
                                    {answer.attributes.text}
                                </IonLabel>
                            </IonItem>
                        </IonReorder>
                    )
                })}
            </IonReorderGroup>
        </IonList>
    );
};

export default Order;
