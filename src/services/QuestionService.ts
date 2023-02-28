import {api} from "./api";

export const questionApi = api.injectEndpoints({
    endpoints: (build) => ({
        fetchQuestions: build.query({
            query: (id: number) => ({
                url: '/questions',
                params: {
                    populate: 'answers',
                    "filters[module][id][$eq]": id,
                }
            })
        })
    })
})

export const{
    useFetchQuestionsQuery,
} = questionApi