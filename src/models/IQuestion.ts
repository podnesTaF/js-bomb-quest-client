import {IAnswer} from "./IAnswer";

export type IQuestion = {
    id: number;
    attributes: {
        title: string;
        type: "multiple" | "single" | "dragable" | "order";
        answers: {
            data: IAnswer[]
        };
        hint: string;
        snippet: string | null;
    }
}