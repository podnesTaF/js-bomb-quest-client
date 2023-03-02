import React from 'react';
import styles from "./DragBox.module.css";
import {IonCardHeader, IonCardTitle} from "@ionic/react";
import clsx from "clsx";
import {IAnswer} from "../../models/IAnswer";
import {DraggableAnswer} from "../../models/Results";
import DragAnswer from "../DragAnswer";

interface DragBoxesProps {
    box: DraggableAnswer;
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>, box: any) => void;
    handleAnswerClick: (answer: IAnswer) => void;
    yourAnswer?: DraggableAnswer[];
    answers?: IAnswer[];
    isResult?: boolean;

}

const DragBox: React.FC<DragBoxesProps> = ({box, handleDragOver, handleDrop, handleAnswerClick, yourAnswer, answers, isResult}) => {
    return (
        <div className={styles.box} key={box.id}>
            <IonCardHeader>
                <IonCardTitle>{box.name}</IonCardTitle>
            </IonCardHeader>
            <div onDragOver={handleDragOver}
                 onDrop={e => handleDrop(e, box)}
                 className={clsx(styles.area, box.answers.length > 0 && styles.fit, yourAnswer && answers?.some(answer => answer.attributes.box === box.name) ? styles.correct : yourAnswer ? styles.wrong : '', isResult && styles.correct)}>
                {box.answers.length > 0
                    ? box.answers.map((answer: IAnswer) => (
                        <DragAnswer
                            key={answer.id}
                            answer={answer}
                            yourAnswer={yourAnswer}
                            box={box}
                            handleAnswerClick={handleAnswerClick}
                            isResult={isResult}
                            answerInBox={true}
                        />
                    )) : <p>Drop here</p>
                }
            </div>
        </div>
    );
};

export default DragBox;