export type LoadingType = 'idle' | 'pending' | 'error' ;

export type Id = string | number | undefined; // TODO get rid of undefined

export type LikeDislike = 'like' | 'dislike' | false;

export interface User {
    id: Id,
    name: string,
    registeredAt: Date,
    posts: number,
    location: string,
    isBanned?: boolean,
    isAdmin?: boolean,
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
    id: Id
    author: User,
    title: string,
    postCount: number,
    viewCount: number,
    likes: number,
    dislikes: number,
    isLiked: LikeDislike,
    lastMessage: LastMessage
}

export interface PostItemType {
    id: Id
    author: User,
    title: string,
    text: string,
    likes: number,
    dislikes: number,
    isLiked: LikeDislike,
    postedAt: Date,
    editedAt: Date
}