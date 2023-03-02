import React, {useEffect, useState} from 'react';
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumb";
import QuestionItem from "../../components/QuestionItem";
import {IQuestion} from "../../models/IQuestion";
import {
    checkDraggable,
    checkMultipleAnswers,
    checkOrder,
    checkOwnAnswer,
    checkSingleAnswer
} from "../../utils/checkAnswers";
import ResultsIntro from "../../components/ResultsIntro";
import {countPercentage} from "../../utils/count";
import {useHistory} from "react-router";
import {useFetchQuestionsQuery} from "../../services/QuestionService";
import {IModule} from "../../models/IModule";
import {IAnswer} from "../../models/IAnswer";
import {getCorrectAnswer} from "../../utils/getAnswer";
import {IonProgressBar} from "@ionic/react";

interface QuestionProps {
    module: IModule;
}

const Question: React.FC<QuestionProps> = ({module}) => {
    // const [questions, setQuestions] = useState<any>(null);
    const [activeSlide, setActiveSlide] = useState<number>(1);
    const [selection, setSelection] = useState<any>({})
    const [results, setResults] = useState<any>({});
    const [progress, setProgress] = useState<number>(0);

    const {data, error, isLoading} = useFetchQuestionsQuery(module.id)

    const history = useHistory();

    useEffect(() => {
        // if ()
        const length = data?.data.length;
        console.log(length, 'progress')
        if(!length) {
            setResults(1/10)
            return
        };
        setProgress((activeSlide - 1) / length);
    }, [activeSlide]);

    const submitQuiz = () => {
        data.data.forEach((question: IQuestion) => {
            if (!selection[question.id]) {
                setResults((prev: any) => ({
                    ...prev,
                    [question.id] :{answer: null, correct: false}
                }))
                return;
            }
            switch (question.attributes.type) {
                case 'single':
                    if (question.attributes.answers.data.length === 1) {
                        setResults((prev: any) => ({
                            ...prev,
                            [question.id]:{
                            answer: selection[question.id],
                                correct: checkOwnAnswer(selection[question.id], question.attributes.answers.data[0].attributes.text)
                        }
                        }))
                    } else {
                        const selected = question.attributes.answers.data.filter((answer: any) => selection[question.id] === answer.id)[0];
                        setResults((prev: any[]) => ({
                            ...prev, [question.id]: {
                                answer: selection[question.id],
                                    correct: checkSingleAnswer(selected)
                            }
                        }))
                    }
                    break;
                case 'multiple':
                    const selected = question.attributes.answers.data.filter((answer: any) => selection[question.id].includes(answer.id));
                    setResults((prev: any[]) => ({
                        ...prev,
                            [question.id]: {
                            answer: selection[question.id],
                            correct: checkMultipleAnswers(selected)
                            },
                    }))
                    break;
                case 'order':
                    let answer: IAnswer[];
                    if (selection[question.id] && selection[question.id].length > 0) {
                        answer = selection[question.id];
                    } else {
                        answer = question.attributes.answers.data
                    }
                    const structuredAnswer = {
                        answer,
                        correct: checkOrder(selection[question.id])
                    }
                    setResults((prev: any[]) => ({
                        ...prev, [question.id]: structuredAnswer
                    }))
                    break;
                case 'dragable':
                    let emptyBoxes = getCorrectAnswer(question) as any[];
                    emptyBoxes = emptyBoxes.filter((box: any) => box.answers.length === 0).map((box: any) => box.name);
                    console.log('emptyBoxes2', emptyBoxes)
                    const selectedAnswers = {
                        answer: selection[question.id],
                        correct: checkDraggable(emptyBoxes, selection[question.id])
                    }
                    setResults((prev: any[]) => ({
                        ...prev,
                        [question.id]: selectedAnswers
                    }))
                    break;
            }
        })
    }

    useEffect(() => {
        if (Object.keys(results).length >= data?.data.length) {
            console.log('result', results)
            localStorage.setItem(`results-${module.id}`, JSON.stringify(results));
            history.push(`/modules/${module.id}/results`)
        }
    }, [results, submitQuiz])

    return (
        <>
            <div className='menu-wrapper'>
                <Breadcrumb items={[module.attributes.name]} moduleId={module.id}/>
            </div>
            <div>
                <h1>{module.attributes.name}</h1>
                {isLoading && (
                    <IonProgressBar type="indeterminate"></IonProgressBar>
                )}
                {data && (
                    <IonProgressBar value={progress}></IonProgressBar>
                )}
                {data && data.data.map((question: IQuestion, i: number) => (
                    <QuestionItem setResults={setResults} hint={question.attributes.hint} setSelection={setSelection} submitQuiz={submitQuiz}
                                  maxLength={data.data.length} setActive={setActiveSlide} activeSlide={activeSlide}
                                  key={question.id} id={question.id} questionIdx={i + 1}
                                  title={question.attributes.title} type={question.attributes.type}
                                  snippet={question.attributes.snippet} boxes={question.attributes.boxes?.split(',')}/>
                ))}
                {error && <p>error</p>}
            </div>
        </>
    );
};

export default Question;
