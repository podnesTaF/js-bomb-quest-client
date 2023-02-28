import {IAnswer} from "../models/IAnswer";

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