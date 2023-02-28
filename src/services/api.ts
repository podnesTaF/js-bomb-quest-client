import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api'
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })


export const api = createApi({
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Questions', 'Answers', 'Modules'],
    endpoints: () => ({}),
})