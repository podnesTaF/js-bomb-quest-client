import React, {useEffect, useRef, useState} from 'react';
import styles from "./DragBoxes.module.css";
import {IonCardHeader, IonCardTitle} from "@ionic/react";
import {IAnswer} from "../../models/IAnswer";
import {docco} from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import clsx from "clsx";
import {DraggableAnswer} from "../../models/Results";

interface DragBoxesProps {
    boxNames: string[];
    setSelection?: Function;
    answers: IAnswer[];
    questionId: number;
    correctAnswer?: DraggableAnswer[];
    yourAnswer?: DraggableAnswer[];
}

const DragBoxes: React.FC<DragBoxesProps> = ({
                                                 boxNames,
                                                 questionId,
                                                 setSelection,
                                                 answers,
                                                 yourAnswer,
                                                 correctAnswer
                                             }) => {

    const [boxes, setBoxes] = useState<DraggableAnswer[]>(yourAnswer || boxNames.map((box: string, index: number) => ({
        id: index,
        name: box,
        answers: []
    })));
    const [options, setOptions] = useState<IAnswer[]>(answers);


    useEffect(() => {
        if (setSelection) {
            setSelection((prev: any) => ({...prev, [questionId]: boxes}))
        }
    }, [boxes]);


    function handleDragStart(e: React.DragEvent<HTMLDivElement>, answer: IAnswer) {
        e.dataTransfer.setData("answerId", answer.id + '');
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>, box: any) {
        const answerId = e.dataTransfer.getData("answerId");
        const answer = options.find(a => a.id === parseInt(answerId))!;
        const updatedAnswers = options.filter(a => a.id !== answer.id);
        const updatedBox = {...box, answers: [...box.answers, answer]};
        const updatedBoxes = boxes!.map(b => (b.id === box.id ? updatedBox : b));
        setOptions(updatedAnswers);
        setBoxes(updatedBoxes);
    }

    function handleAnswerClick(answer: IAnswer) {
        if (!setSelection) return;
        const updatedAnswers = [...options, answer];
        const updatedBoxId = boxes!.findIndex(b => b.answers.includes(answer));
        const updatedBox = {
            ...boxes![updatedBoxId],
            answers: boxes![updatedBoxId].answers.filter(a => a.id !== answer.id)
        };
        const updatedBoxes = [...boxes!];
        updatedBoxes.splice(updatedBoxId, 1, updatedBox);
        setOptions(updatedAnswers);
        setBoxes(updatedBoxes);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.boxesContainer}>
                {yourAnswer && (
                    <div className={styles.title}>
                        <h2>Your answer</h2>
                    </div>
                )}
                {boxes && boxes?.map((box: any, index: number) => (
                    <div className={styles.box} key={box.id}>
                        <IonCardHeader>
                            <IonCardTitle>{box.name}</IonCardTitle>
                        </IonCardHeader>
                        <div onDragOver={handleDragOver}
                             onDrop={e => handleDrop(e, box)}
                             className={clsx(styles.area, box.answers.length > 0 && styles.fit, yourAnswer && answers.some(answer => answer.attributes.box === box.name) ? styles.correct : yourAnswer ? styles.wrong : '')}>
                            {box.answers.length > 0
                                ? box.answers.map((answer: IAnswer) => (
                                    <div key={answer.id}
                                         className={clsx(styles.answer, styles.answerInBox, yourAnswer && answer.attributes.box === box.name ? styles.correct : yourAnswer ? styles.wrong : '')}
                                         onClick={() => handleAnswerClick(answer)}>
                                        <SyntaxHighlighter language='javascript' style={docco}>
                                            {answer.attributes.text}
                                        </SyntaxHighlighter>
                                    </div>
                                )) : <p>Drop here</p>
                            }
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.answers}>
                {yourAnswer && (
                    <div className={styles.title}>
                        <h2>Correct answer</h2>
                    </div>
                )}
                {!correctAnswer && options && options.map((answer: IAnswer) => (
                    <div draggable="true"
                         onDragStart={e => handleDragStart(e, answer)} className={styles.answer} key={answer.id}>
                        <SyntaxHighlighter language='javascript' style={docco}>
                            {answer.attributes.text}
                        </SyntaxHighlighter>
                    </div>
                ))}
                {correctAnswer && correctAnswer.map((box: any, index: number) => (
                    <div className={styles.box} key={box.id}>
                        <IonCardHeader>
                            <IonCardTitle>{box.name}</IonCardTitle>
                        </IonCardHeader>
                        <div onDragOver={handleDragOver}
                             onDrop={e => handleDrop(e, box)}
                             className={clsx(styles.area, box.answers.length > 0 && styles.fit, styles.correct)}>
                            {box.answers.length > 0
                                ? box.answers.map((answer: IAnswer) => (
                                    <div key={answer.id}
                                         className={clsx(styles.answer, styles.answerInBox, styles.correct)}
                                         onClick={() => handleAnswerClick(answer)}>
                                        <SyntaxHighlighter language='javascript' style={docco}>
                                            {answer.attributes.text}
                                        </SyntaxHighlighter>
                                    </div>
                                )) : <p>Drop here</p>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DragBoxes;