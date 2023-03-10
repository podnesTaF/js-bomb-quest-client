import {IQuestion} from "./IQuestion";

export interface IModule {
    id: number;
    attributes: {
        name: string;
        isDone: boolean;
        questions: {
            data: IQuestion[]
        };
        complexity: number;
    }
}