import {IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, ItemReorderEventDetail} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import {IAnswer} from "../../models/IAnswer";

interface OrderProps {
    answers: IAnswer[];
    setSelection: Function;
    questionId: number;
}

const Order: React.FC<OrderProps> = ({answers, setSelection, questionId}) => {
    const [anrws, setAnrws] = useState<IAnswer[]>([]);

    useEffect(() => {
        setAnrws(answers);
    }, [answers]);


    function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
        setAnrws(prev => event.detail.complete(prev));
        setSelection((prev: any) => ({...prev, [questionId]: anrws}))
    }


    return (
        <IonList>
            <IonReorderGroup disabled={false} onIonItemReorder={(e) => handleReorder(e)}>
                {anrws && anrws.map((answer: IAnswer, i) => {
                    let isCorrect = null;
                    if(answer.attributes.position === i) {
                        isCorrect = true;
                    } else {
                        isCorrect = false;
                    }
                    return (
                        <IonReorder key={answer.id}>
                            <IonItem color={isCorrect ? 'success' : "danger"}>
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
