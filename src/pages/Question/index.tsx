import React, {useEffect, useState} from 'react';
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumb";
import QuestionItem from "../../components/QuestionItem";
import {IQuestion} from "../../models/IQuestion";
import {checkMultipleAnswers, checkOrder, checkOwnAnswer, checkSingleAnswer} from "../../utils/checkAnswers";

const Question = () => {
    const [questions, setQuestions] = useState<any>(null);
    const [activeSlide, setActiveSlide] = useState<number>(1);
    const [selection, setSelection] = useState<any>({})
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        console.log(results)
    }, []);


    const submitQuiz = () => {
        questions.forEach((question: IQuestion) => {
            // if(!selection[question.id]) {
            //     return;
            // }
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
                    const structuredAnswer = {questionId: question.id, answer: selection[question.id], correct: checkOrder(selection[question.id])}
                    setResults((prev: any) => {
                        prev.push(structuredAnswer)
                        return prev;
                    })
                break;
            }
        })
        console.log(selection)
    }

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const {data} = await axios.get('http://localhost:1337/api/modules/1?populate=questions.answers');
                setQuestions(data.data.attributes.questions.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchQuestions();
    }, [])



    return (
        <>
           <div className='menu-wrapper'>
               <Breadcrumb />
           </div>
            <div>
                <h1>JS promises</h1>

                {questions && questions.map((question: any) => (
                    <QuestionItem setSelection={setSelection} submitQuiz={submitQuiz} maxLength={questions.length} setActive={setActiveSlide} activeSlide={activeSlide} key={question.id} id={question.id} title={question.attributes.title} type={question.attributes.type} snippet={question.attributes.snippet} />
                ))}
            </div>
        </>
    );
};

export default Question;
