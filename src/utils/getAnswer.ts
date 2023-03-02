import {IQuestion} from "../models/IQuestion";

export const getCorrectAnswer = (question: IQuestion) => {
    if(question.attributes.type === 'single' && question.attributes.answers.data.length > 1) {
        return question.attributes.answers.data.find(answer => answer.attributes.isCorrect)!.id;
    } else if(question.attributes.type === 'multiple') {
        return question.attributes.answers.data.filter(answer => answer.attributes.isCorrect).map(answer => answer.id);
    } else if(question.attributes.type === 'single') {
        return question.attributes.answers.data[0].attributes.text;
    } else if(question.attributes.type === 'order') {
        return question.attributes.answers.data.map(answer => answer.attributes.position);
    } else if(question.attributes.type === 'dragable') {
        const boxes = question.attributes.boxes!.trim().split(',');
        const c = boxes.map((box, i) => ({id: i, name: box, answers: question.attributes.answers.data.filter(answer => answer.attributes.box === box)}));
        return c;
    }
}