import React, {useEffect, useState} from 'react';
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumb";
import QuestionItem from "../../components/QuestionItem";

const Question = () => {
    const [questions, setQuestions] = useState<any>(null);
    const [activeSlide, setActiveSlide] = useState<number>(1);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const {data} = await axios.get('http://localhost:1337/api/modules/1?populate=questions');
                setQuestions(data.data.attributes.questions.data);

            } catch (e) {
                console.error(e);
            }
        }

        fetchQuestions();
    }, [])



    return (
        <div>
           <div className='menu-wrapper'>
               <Breadcrumb />
           </div>
            <div>
                <h1>JS promises</h1>

                {questions && questions.map((question: any) => (
                    <QuestionItem maxLength={questions.length} setActive={setActiveSlide} activeSlide={activeSlide} key={question.id} id={question.id} title={question.attributes.title} type={question.attributes.type} snippet={question.attributes.snippet} />
                ))}
            </div>
        </div>
    );
};

export default Question;
