import React, {useEffect} from 'react';
import ResultsIntro from "../../components/ResultsIntro";
import {countPercentage} from "../../utils/count";
import {useHistory, useParams} from "react-router";
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
    const [results, setResults] = React.useState<any[]>([]);
    const {data, error, isLoading} = useFetchQuestionsQuery(module.id)


    useEffect(() => {
        setResults(JSON.parse(localStorage.getItem(`results-${module.id}`) || '[]'));
    }, [])

    return (
      <div>
          <div>
              <Breadcrumb />
              <div className='stripe'></div>
          </div>
          {results.length > 0 && <ResultsIntro sectionName={module.attributes.name} percentage={countPercentage(results)} />}
          <div className='qa'>
              <h2>Questions and answers</h2>
              {isLoading && <p>Loading...</p>}
              {data?.data.map((question: IQuestion, i: number) => (
                  <QuestionItem hint={question.attributes.hint} maxLength={data.data.length} key={question.id} id={question.id} title={question.attributes.title} type={question.attributes.type} snippet={question.attributes.snippet} isFinished={true} answer={results[i]?.answer} correctAnswer={getCorrectAnswer(question)} />
              ))}
          </div>
      </div>
    );
};

export default ResultsPage;
