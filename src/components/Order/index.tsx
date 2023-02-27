import {IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, ItemReorderEventDetail} from '@ionic/react';
import React from 'react';
import {IAnswer} from "../../models/IAnswer";

interface OrderProps {
    answers: IAnswer[];
}

const Order: React.FC<OrderProps> = ({answers}) => {

    function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
        console.log('Dragged from index', event.detail.from, 'to', event.detail.to, event.detail);
        event.detail.complete();
    }


    return (
        <IonList>
            <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
                {answers && answers.map((answer: IAnswer) => (
                    <IonReorder key={answer.id}>
                        <IonItem>
                            <IonLabel>
                                {answer.attributes.text}
                            </IonLabel>
                        </IonItem>
                    </IonReorder>
                ))}
            </IonReorderGroup>
        </IonList>
    );
};

export default Order;
