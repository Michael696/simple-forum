import {CaseReducer} from "@reduxjs/toolkit/dist/createReducer";

export type LoadingType = 'idle' | 'pending' | 'error' ;

export interface User {
    id: string,
    name: string
}

export interface LastMessage {
    dateTime: string,
    user: User
}

export interface Forum {
    id: string,
    name: string,
    description: string,
    themeCount: number,
    postCount: number
    lastMessage: LastMessage
}
