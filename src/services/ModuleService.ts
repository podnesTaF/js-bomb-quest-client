import {api} from "./api";
import {IModule} from "../models/IModule";

export const moduleService = api.injectEndpoints({
    endpoints: (build) => ({
        fetchModules: build.query<any, boolean>({
            query: () => ({
                url: '/modules',
            })
        })
    })
})

export const{
    useFetchModulesQuery
} = moduleService