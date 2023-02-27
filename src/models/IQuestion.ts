import {IAnswer} from "./IAnswer";

export type IQuestion = {
    id: number;
    attributes: {
        title: string;
        type: "multiple" | "single" | "dragable" | "order";
        answers: IAnswer[];
        hint: string;
        snippet: string | null;
    }
}