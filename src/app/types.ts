export type LoadingType = 'idle' | 'pending' | 'error' ;

export type Id = string | number | undefined; // TODO get rid of undefined ?

export type Password = {
    password: string;
}

export type UserCredentials = {
    name: string,
} & Password;

export type User = {
    id: Id,
    name: string,
    realName: string,
    registeredAt: Date | 0,
    posts: number,
    location: string,
    isBanned: boolean,
    isAdmin: boolean,
}

export type LastMessage = {
    dateTime: string,
    user: User
}

export type Forum = {
    id: Id,
    name: string,
    description: string,
    themeCount: number,
    postCount: number,
    lastMessage: LastMessage
}

export type ThreadItemType = {
    id: Id,
    author: User,
    title: string,
    postCount: number,
    viewCount: number,
    likes: Array<User>,
    dislikes: Array<User>,
    lastMessage: LastMessage
}

export type PostItemType = {
    id: Id,
    author: User,
    title: string,
    text: string,
    likes: Array<User>,
    dislikes: Array<User>,
    postedAt: Date | 0,
    editedAt: Date | 0
}