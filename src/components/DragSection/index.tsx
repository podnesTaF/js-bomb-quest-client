import React, {useEffect, useState} from 'react';
import styles from "./DragSection.module.css";
import {IAnswer} from "../../models/IAnswer";
import {DraggableAnswer} from "../../models/Results";
import DragBox from "../DragBox";
import DragAnswer from "../DragAnswer";

interface DragBoxesProps {
    boxNames: string[];
    setSelection?: Function;
    answers: IAnswer[];
    questionId: number;
    correctAnswer?: DraggableAnswer[];
    yourAnswer?: DraggableAnswer[];
}

const DragSection: React.FC<DragBoxesProps> = ({
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
                    <DragBox
                        box={box}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        handleAnswerClick={handleAnswerClick}
                        yourAnswer={yourAnswer}
                        answers={answers}
                        key={box.id}
                    />
                ))}
            </div>

            <div className={styles.answers}>
                {yourAnswer && (
                    <div className={styles.title}>
                        <h2>Correct answer</h2>
                    </div>
                )}
                {!correctAnswer && options && options.map((answer: IAnswer) => (
                    <DragAnswer
                        answer={answer}
                        handleDragStart={handleDragStart}
                        draggable={true}
                        key={answer.id}
                    />
                ))}
                {correctAnswer && correctAnswer.map((box: any, index: number) => (
                    <DragBox
                        box={box}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        handleAnswerClick={handleAnswerClick}
                        isResult={true}
                        key={box.id} />
                ))}
            </div>
        </div>
    );
};

export default DragSection;