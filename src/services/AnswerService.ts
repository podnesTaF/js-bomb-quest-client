import {api} from "./api";

export const answerService = api.injectEndpoints({
    endpoints: (build) => ({
        fetchAnswers: build.query({
            query: (id: number) => ({
                url: '/answers',
                params: {
                    "filters[question][id][$eq]": id,
                }
            })
        })
    })
})

export const{
    useFetchAnswersQuery,
} = answerService