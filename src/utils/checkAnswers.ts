import {IAnswer} from "../models/IAnswer";
import {DraggableAnswer} from "../models/Results";
import multipleAnswer from "../components/MultipleAnswer";

export const checkSingleAnswer = (chosenAnswer?: IAnswer) => {
    return chosenAnswer?.attributes.isCorrect;
}

export const checkMultipleAnswers = (chosenAnswers?: IAnswer[]) => {
    if(chosenAnswers?.length === 0) return false;
    return chosenAnswers?.every(answer => answer.attributes.isCorrect);
}

export const checkOwnAnswer = (correctAnswer: string, ownAnswer?: string) => {
    return ownAnswer === correctAnswer;
}

export const checkOrder = (chosenAnswers?: IAnswer[]) => {
    return chosenAnswers?.every((answer, index) => answer.attributes.position === index);
}

export const checkDraggable = (emptyBoxes: string[], chosenAnswers?: DraggableAnswer[]) => {
   return chosenAnswers?.every((box, index) => {
       if(box.answers.length === 0 && !emptyBoxes.includes(box.name)) return false;
        return box.answers.every((answer, index) => answer.attributes.box === box.name)
    })
}