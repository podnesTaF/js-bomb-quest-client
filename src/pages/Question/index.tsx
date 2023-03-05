import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../components/Breadcrumb";
import QuestionItem from "../../components/QuestionItem";
import {IQuestion} from "../../models/IQuestion";
import {useHistory} from "react-router";
import {useFetchQuestionsQuery} from "../../services/QuestionService";
import {IModule} from "../../models/IModule";
import {IonProgressBar} from "@ionic/react";

import './Question.css'
import {addAnswers} from "../../utils/addAnswers";

interface QuestionProps {
    module: IModule;
}

const Question: React.FC<QuestionProps> = ({module}) => {
    const [activeSlide, setActiveSlide] = useState<number>(1);
    const [selection, setSelection] = useState<any>({})
    const [results, setResults] = useState<any>({});
    const [progress, setProgress] = useState<number>(0);

    const {data, error, isLoading} = useFetchQuestionsQuery(module.id)

    const history = useHistory();

    useEffect(() => {
        const length = data?.data.length;
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
                    [question.id] :{answer: null, points: 0}
                }))
                return;
            }
            addAnswers(question, selection, setResults)
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
            <div className='menu'>
                <Breadcrumb items={[module.attributes.name]} moduleId={module.id}/>
            </div>
            <div>
                <h1 className='module-title'>{module.attributes.name}</h1>
                {isLoading && (
                    <IonProgressBar type="indeterminate"></IonProgressBar>
                )}
                {data && (
                    <IonProgressBar value={progress}></IonProgressBar>
                )}
                <div className='main'>
                    {data && data.data.map((question: IQuestion, i: number) => (
                        <QuestionItem setResults={setResults} hint={question.attributes.hint} setSelection={setSelection} submitQuiz={submitQuiz}
                                      maxLength={data.data.length} setActive={setActiveSlide} activeSlide={activeSlide}
                                      key={question.id} id={question.id} questionIdx={i + 1}
                                      title={question.attributes.title} type={question.attributes.type}
                                      snippet={question.attributes.snippet} boxes={question.attributes.boxes?.split(',')}/>
                    ))}
                </div>
                {error && <p>error</p>}
            </div>
        </>
    );
};

export default Question;
