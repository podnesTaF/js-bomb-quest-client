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

interface QuestionProps {
    module: IModule;
}

const Question: React.FC<QuestionProps> = ({module}) => {
    // const [questions, setQuestions] = useState<any>(null);
    const [activeSlide, setActiveSlide] = useState<number>(1);
    const [selection, setSelection] = useState<any>({})
    const [results, setResults] = useState<any[]>([]);
    const [sectionName, setSectionName] = useState<string>('');

    const {data, error, isLoading} = useFetchQuestionsQuery(module.id)

    const history = useHistory();

    useEffect(() => {
        if(results.length >= data?.data.length) {
            localStorage.setItem(`results-${module.id}`, JSON.stringify(results));
            history.push(`/modules/${module.id}/results`)
        }
    }, [results])

    const submitQuiz = () => {
        setResults([])
        data.data.forEach((question: IQuestion) => {
            switch (question.attributes.type) {
                case 'single':
                    if(question.attributes.answers.data.length === 1) {
                        setResults((prev: any[]) => {
                            prev.push({questionId: question.id, answer: selection[question.id], correct: checkOwnAnswer(selection[question.id], question.attributes.answers.data[0].attributes.text)})
                            return prev;
                        })
                    } else {
                        const selected = question.attributes.answers.data.filter((answer: any) => selection[question.id] === answer.id)[0];
                        setResults((prev: any[]) => {
                            prev.push({questionId: question.id, answer: selection[question.id], correct: checkSingleAnswer(selected)})
                            return prev;
                        })
                    }
                    break;
                case 'multiple':
                    const selected = question.attributes.answers.data.filter((answer: any) => selection[question.id].includes(answer.id));
                    setResults((prev: any[]) => {
                        prev.push({questionId: question.id, answer: selection[question.id], correct: checkMultipleAnswers(selected)})
                        return prev;
                    })
                    break;
                case 'order':
                    let answer: IAnswer[];
                    if(selection[question.id] && selection[question.id].length > 0) {
                        answer = selection[question.id];
                    } else {
                        answer = question.attributes.answers.data
                    }
                    const structuredAnswer = {questionId: question.id, answer, correct: checkOrder(selection[question.id])}
                    setResults((prev: any[]) => {
                        prev.push(structuredAnswer)
                        return prev;
                    })
                break;
                case 'dragable':
                    console.log('it works twice')
                    console.log('selections for drgs', selection[question.id])
                    const selectedAnswers = {questionId : question.id, answer: selection[question.id], correct: checkDraggable(selection[question.id])}
                    setResults((prev: any[]) => {
                        prev.push(selectedAnswers)
                        return prev;
                    })
                    break;
            }
        })
    }

    return (
        <>
           <div className='menu-wrapper'>
               <Breadcrumb />
           </div>
            <div>
                <h1>{module.attributes.name}</h1>
                {isLoading && <p>Loading...</p>}
                {data && data.data.map((question: IQuestion, i: number) => (
                    <QuestionItem hint={question.attributes.hint} setSelection={setSelection} submitQuiz={submitQuiz} maxLength={data.data.length} setActive={setActiveSlide} activeSlide={activeSlide} key={question.id} id={question.id} questionIdx={i + 1} title={question.attributes.title} type={question.attributes.type} snippet={question.attributes.snippet} boxes={question.attributes.boxes?.split(',')} />
                ))}
                {error && <p>error</p>}
            </div>
        </>
    );
};

export default Question;
