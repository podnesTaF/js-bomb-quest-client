import React, {useEffect, useState} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './QuestionItem.module.css'
import {IonButton, IonIcon, IonItem, IonSpinner, useIonAlert} from "@ionic/react";
import {helpCircle} from 'ionicons/icons';
import SingleAnswer from "../SingleAnswer";
import MultipleAnswer from "../MultipleAnswer";
import Order from "../Order";
import OwnAnswer from "../OwnAnswer";
import {useFetchAnswersQuery} from "../../services/AnswerService";
import clsx from "clsx";
import DragSection from "../DragSection";
import {defineOutOf} from "../../utils/count";


interface QuestionItemProps {
    title: string;
    snippet: string | null;
    type: string;
    activeSlide?: number;
    setActive?: Function;
    maxLength: number;
    id: number;
    setSelection?: Function;
    submitQuiz?: Function;
    isFinished?: boolean;
    answer?: any;
    correctAnswer?: any;
    hint: string;
    points?: number;
    boxes?: string[]
    questionIdx: number
    setResults?: Function
}

const QuestionItem: React.FC<QuestionItemProps> = ({
                                                       setResults,
                                                       maxLength,
                                                       activeSlide,
                                                       setActive,
                                                       snippet,
                                                       type,
                                                       title,
                                                       id,
                                                       setSelection,
                                                       submitQuiz,
                                                       isFinished,
                                                       answer,
                                                       correctAnswer,
                                                       hint,
                                                       points,
                                                       boxes,
                                                       questionIdx
                                                   }) => {


    const [hintAlert] = useIonAlert();
    const [status, setStatus] = useState<string>('4EB1BA')
    const {data, error, isLoading} = useFetchAnswersQuery(id);

    const next = () => {
        if (!activeSlide || !setActive || !submitQuiz || !setResults) return
        if (maxLength > activeSlide) {
            setActive((prevState: number) => prevState + 1);
        } else {
            submitQuiz();
        }
    }

    const prev = () => {
        if (!activeSlide || !setActive) return
        if (activeSlide > 1) {
            setActive((prevState: number) => prevState - 1);
        }
    }

    const alertHint = () => hintAlert({
        header: 'Hint!',
        message: hint,
        cssClass: 'hint-alert',
        buttons: [{text: 'Thanks!', cssClass: 'hint-alert-button'}]
    })

    const defineClass = () => {
            if(isFinished && data) {
                const percentage = points! / defineOutOf(data.data, type);
                if (percentage === 1) {
                    setStatus('#2dd36f')
                } else if (percentage > 0) {
                    setStatus('orange')
                } else {
                    setStatus('#eb445a')
                }
            }
        }

    useEffect(() => {
        defineClass();
    }, [isFinished, points, data])



    return (
        <div className={styles.wrapper} style={{display: activeSlide === questionIdx || isFinished ? "block" : "none"}}>
            <div className={styles.heading}>
                <h2>Question {`${questionIdx}/${maxLength}`}</h2>
                {data && isFinished && <h2 className={styles.points}>{points} / {defineOutOf(data.data, type)}</h2>}
            </div>
            <div className={clsx(styles.content, status)}>
                <div style={{backgroundColor: status}} className={clsx(styles.header, status)}>
                    <h1>{title}</h1>
                    <div className={styles.hint}>
                        <IonButton onClick={alertHint} color={'light'} fill={'clear'}>
                            <IonIcon icon={helpCircle} slot="icon-only" size={'large'}></IonIcon>
                        </IonButton>
                    </div>
                </div>
                {snippet && <div className={styles.snippetWrapper}>
                    <SyntaxHighlighter className={styles.snippet} language='javascript' style={docco}>
                        {snippet}
                    </SyntaxHighlighter>
                </div>}
                <div className={styles.answers}>
                    {isLoading && <IonItem>
                        <IonSpinner name="crescent"></IonSpinner>
                    </IonItem>}
                    {error && <div>Error</div>}
                    {data && (
                        <>
                            {type === 'single'
                                && data.data.length === 1
                                && <OwnAnswer
                                    setSelection={setSelection}
                                    questionId={id}
                                    value={answer}
                                    correctAnswer={correctAnswer}/>}
                            {type === 'single'
                                && data.data.length !== 1
                                && <SingleAnswer
                                    questionId={id}
                                    setSelection={setSelection}
                                    answers={data.data}

                                    correctAnswer={correctAnswer}
                                    userAnswer={answer}/>}
                            {type === 'multiple'
                                && <MultipleAnswer
                                    questionId={id}
                                    setSelection={setSelection}
                                    answers={data.data}
                                    userAnswer={answer}
                                    correctAnswer={correctAnswer}/>}
                            {type === 'order'
                                &&
                                <Order
                                    questionId={id}
                                    setSelection={setSelection}
                                    correctAnswer={correctAnswer}

                                    selectedAnswer={answer}
                                    answers={data.data}/>}
                            {type === 'dragable'
                                && boxes
                                && <DragSection
                                    boxNames={boxes}
                                    answers={data.data}
                                    setSelection={setSelection}
                                    questionId={id}
                                    correctAnswer={correctAnswer}
                                    yourAnswer={answer}/>}
                        </>
                    )}
                </div>
                {!isFinished
                    && activeSlide
                    && <div className={styles.actions}>
                        <IonButton disabled={activeSlide <= 1} onClick={prev} fill={'outline'}>Previous</IonButton>
                        <IonButton
                            disabled={activeSlide > maxLength}
                            onClick={next}>
                            {activeSlide === maxLength ? 'submit' : 'Next'}
                        </IonButton>
                    </div>}
            </div>
        </div>
    );
};

export default QuestionItem;
