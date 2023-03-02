import React from 'react';
import clsx from "clsx";
import styles from "./DragAnswer.module.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import {docco} from "react-syntax-highlighter/dist/esm/styles/hljs";
import {IAnswer} from "../../models/IAnswer";
import {DraggableAnswer} from "../../models/Results";

interface DragAnswerProps {
    answer: IAnswer;
    box?: DraggableAnswer;
    handleAnswerClick?: (answer: IAnswer) => void;
    handleDragStart?: (e: React.DragEvent<HTMLDivElement>, answer: IAnswer) => void;
    yourAnswer?: DraggableAnswer[];
    isResult?: boolean;
    answerInBox?: boolean
    draggable?: boolean
}

const DragAnswer: React.FC<DragAnswerProps> = ({yourAnswer, answer, handleAnswerClick,box, isResult, answerInBox, handleDragStart, draggable}) => {
    return (
        <div
            className={clsx(styles.answer,
                answerInBox && styles.answerInBox,
                yourAnswer && answer.attributes.box === box?.name
                    ? styles.correct
                    : yourAnswer
                        ? styles.wrong
                        :
                        '',
                isResult && styles.correct)}
            onClick={() => handleAnswerClick && handleAnswerClick(answer)}
            draggable={draggable}
            onDragStart={e => handleDragStart && handleDragStart(e, answer)}
        >
            <SyntaxHighlighter language='javascript' style={docco}>
                {answer.attributes.text}
            </SyntaxHighlighter>
        </div>
    );
};

export default DragAnswer;

