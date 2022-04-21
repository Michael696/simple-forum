export type LoadingType = 'idle' | 'pending' | 'error' ;

export type Id = string | number | undefined; // TODO get rid of undefined

export interface User {
    id: Id,
    name: string
}

export interface LastMessage {
    dateTime: string,
    user: User
}

export interface Forum {
    id: Id,
    name: string,
    description: string,
    themeCount: number,
    postCount: number
    lastMessage: LastMessage
}

export interface ThreadItemType {
    id:Id
    author: User,
    title: string,
    themeCount: number,
    postCount: number,
    lastMessage: LastMessage
}