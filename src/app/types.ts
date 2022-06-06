export type LoadingType = 'idle' | 'pending' | 'error' ;

export type Id = string | number;

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
    registeredAt: string,
    posts: number,
    location: string,
    isBanned: boolean,
    isAdmin: boolean,
}

export type CurrentUserType = {
    data: User,
    isAuthPending: LoadingType,
    error: string,
}

export type LastMessage = {
    dateTime: string,
    user: User
}

export type ForumItemType = {
    id: Id,
    name: string,
    description: string,
    themeCount: number,
    postCount: number,
    lastMessage: LastMessage
}

// TODO introduce errors in other types (storage slices)
// TODO think about global network-error handling strategy

export type ForumsStateType = {
    list: Array<ForumItemType>,
    lastFetch: string,
    lastError: string,
    isLoading: LoadingType
}

export type ThreadsStateType = {
    list: Array<ThreadItemType>,
    forumId: Id,
    lastFetch: string,
    lastError: string,
    isLoading: LoadingType
}

export type ThreadItemType = {
    id: Id,
    forumId: Id,
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
    text: string,
    likes: Array<User>,
    dislikes: Array<User>,
    postedAt: string,
    editedAt: string
}

export type PostItemStateType = Omit<PostItemType, 'likes' | 'dislikes'>;

export type PostStateType = { // TODO type naming!
    entries: { items: Array<PostItemStateType>, likes: { [k: string]: Array<User> }, dislikes: { [k: string]: Array<User> } },
    threadId: Id,
    lastFetch: string,
    totalCount: number,
    perPageCount: number,
    firstPostIdx: number,
    lastPostIdx: number,
    isLoading: LoadingType
}
