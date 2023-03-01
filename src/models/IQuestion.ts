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
        boxes: string | null;
        snippet: string | null;
    }
}