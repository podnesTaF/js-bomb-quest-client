import {IAnswer} from "../models/IAnswer";
import {DraggableAnswer} from "../models/Results";

export const checkSingleAnswer = (chosenAnswer: IAnswer) => {
    return chosenAnswer.attributes.isCorrect;
}

export const checkMultipleAnswers = (chosenAnswers: IAnswer[]) => {
    return chosenAnswers.every(answer => answer.attributes.isCorrect);
}

export const checkOwnAnswer = (ownAnswer: string, correctAnswer: string) => {
    return ownAnswer === correctAnswer;
}

export const checkOrder = (chosenAnswers: IAnswer[]) => {
    console.log(chosenAnswers)
    return chosenAnswers.every((answer, index) => answer.attributes.position === index);
}

export const checkDraggable = (chosenAnswers?: DraggableAnswer[]) => {
   return chosenAnswers?.every((box, index) => {
        return box.answers.every((answer, index) => answer.attributes.box === box.name)
    })
}