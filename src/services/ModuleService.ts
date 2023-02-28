import {api} from "./api";

export const moduleService = api.injectEndpoints({
    endpoints: (build) => ({
        fetchModules: build.query({
            query: () => ({
                url: '/modules',
            })
        })
    })
})

export const{
    useFetchModulesQuery
} = moduleService