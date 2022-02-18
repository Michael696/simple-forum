import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:1337/api/' }),
    endpoints: (build) => ({
        onlineUsers: build.query({
            query: () => ({
                url: 'online-users',
                method: 'POST',
                body: {}
            }),
        }),
    }),
});


