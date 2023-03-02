import React, {useEffect} from 'react';
import ResultsIntro from "../../components/ResultsIntro";
import {countPercentage} from "../../utils/count";
import Breadcrumb from "../../components/Breadcrumb";
import {IModule} from "../../models/IModule";
import {useFetchQuestionsQuery} from "../../services/QuestionService";
import {IQuestion} from "../../models/IQuestion";
import QuestionItem from "../../components/QuestionItem";
import {getCorrectAnswer} from "../../utils/getAnswer";

interface ResultsPageProps {
    module: IModule;
}

const ResultsPage: React.FC<ResultsPageProps> = ({module}) => {
    const [results, setResults] = React.useState<any>({});
    const {data, error, isLoading} = useFetchQuestionsQuery(module.id)


    useEffect(() => {
        setResults(JSON.parse(localStorage.getItem(`results-${module.id}`) || '{}'));
    }, [])


    return (
        <div>
            <div>
                <Breadcrumb items={[module.attributes.name, 'results']} moduleId={module.id}/>
                <div className='stripe'></div>
            </div>
            {Object.keys(results).length > 0 &&
                <ResultsIntro sectionName={module.attributes.name} percentage={countPercentage(results)}/>}
            <div className='qa'>
                <h2>Questions and answers</h2>
                {isLoading && <p>Loading...</p>}
                {Object.keys(results).length > 0 && data?.data.map((question: IQuestion, i: number) => (
                    <QuestionItem hint={question.attributes.hint} maxLength={data.data.length} key={question.id}
                                  id={question.id} title={question.attributes.title} type={question.attributes.type}
                                  snippet={question.attributes.snippet} isFinished={true} answer={results[question.id].answer}
                                  correctAnswer={getCorrectAnswer(question)}
                                  boxes={question.attributes.boxes?.split(',')}
                                  isCorrect={results[question.id].correct}
                                  questionIdx={i + 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default ResultsPage;