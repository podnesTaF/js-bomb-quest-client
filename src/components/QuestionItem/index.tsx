import React, {useEffect, useState} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './QuestionItem.module.css'
import {IonButton, IonCheckbox, IonItem, IonLabel, IonRadio, IonRadioGroup} from "@ionic/react";
import axios from "axios";
import SingleAnswer from "../SingleAnswer";
import MultipleAnswer from "../MultipleAnswer";
import question from "../../pages/Question";
import Order from "../Order";
import {IAnswer} from "../../models/IAnswer";
import OwnAnswer from "../OwnAnswer";


interface QuestionItemProps {
    title: string;
    snippet: string | null;
    type: string;
    activeSlide: number;
    setActive: Function;
    maxLength: number;
    id: number;
    setSelection: Function;
    submitQuiz: Function;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ maxLength,activeSlide, setActive, snippet,type,title, id, setSelection, submitQuiz}) => {

    const [answers, setAnswers] = useState<IAnswer[]>([]);


    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const {data} = await axios.get(`http://localhost:1337/api/answers?filters[question][id][$eq]=${id}`);
                setAnswers(data.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchAnswers()
    }, [activeSlide])

    const next = () => {
        if(maxLength > activeSlide) {
            setActive((prevState: number) => prevState + 1);
        } else {
            submitQuiz();
        }
    }

    const prev = () => {
        if(activeSlide > 1) {
            setActive((prevState: number) => prevState - 1);
        }
    }

    return (
        <div className={styles.wrapper} style={{display: activeSlide === id ? "block" : "none"}}>
            <h2>Question {`${id}/${maxLength}`}</h2>
            <div className={styles.content}>
                <h1>{title}</h1>
                {snippet && <SyntaxHighlighter language='javascript' style={docco}>
                    {snippet}
                </SyntaxHighlighter>}
                <div className={styles.answers}>
                    {type === 'single' && answers.length === 1 && <OwnAnswer setSelection={setSelection} questionId={id} />}
                    {type === 'single' && answers.length !== 1 && <SingleAnswer questionId={id} setSelection={setSelection} answers={answers} />}
                    {type === 'multiple' && <MultipleAnswer questionId={id} setSelection={setSelection} answers={answers} />}
                    {type === 'order' && <Order questionId={id} setSelection={setSelection} answers={answers} />}
                </div>
                <div className={styles.actions}>
                    <IonButton disabled={activeSlide <= 1} onClick={prev} fill={'outline'}>Previous</IonButton>
                    <IonButton disabled={activeSlide > maxLength} onClick={next}>{activeSlide === maxLength ? 'submit' : 'Next'}</IonButton>
                </div>
            </div>
        </div>
    );
};

export default QuestionItem;
