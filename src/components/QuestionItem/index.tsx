import React, {useEffect} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './QuestionItem.module.css'
import {IonButton, IonCheckbox, IonItem, IonLabel, IonRadio, IonRadioGroup} from "@ionic/react";
import axios from "axios";
import SingleAnswer from "../SingleAnswer";
import MultipleAnswer from "../MultipleAnswer";
import question from "../../pages/Question";
import Order from "../Order";


interface QuestionItemProps {
    title: string;
    snippet: string | null;
    type: string;
    activeSlide: number;
    setActive: Function;
    maxLength: number;
    id: number;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ maxLength,activeSlide, setActive, snippet,type,title, id}) => {

    const [answers, setAnswers] = React.useState<any[]>([]);


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
            console.log('submit')
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
                    {type === 'single' && <SingleAnswer answers={answers} />}
                    {type === 'multiple' && <MultipleAnswer answers={answers} />}
                    {type === 'order' && <Order answers={answers} />}
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
