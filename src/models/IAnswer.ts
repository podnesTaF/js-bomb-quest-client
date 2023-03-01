export type IAnswer = {
    id: number;
    attributes: {
        text: string;
        isCorrect: boolean;
        position: number | null;
        box: string | null;
    }
}