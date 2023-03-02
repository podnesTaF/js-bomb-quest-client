import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://js-bomb-quest-server.up.railway.app/api'
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })


export const api = createApi({
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Questions', 'Answers', 'Modules'],
    endpoints: () => ({}),
})