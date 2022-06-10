import {LastMessage, PostItemType, ThreadItemType, User} from "./types";

export const emptyUser: User = {
    id: '', isAdmin: false, isBanned: false, location: "", name: "", posts: 0, realName: "", registeredAt: ""
};

export const emptyLastMessage: LastMessage = {
    dateTime: "", user: emptyUser
};

export const emptyThread: ThreadItemType = {
    author: emptyUser,
    dislikes: [],
    forumId: '',
    id: '',
    lastMessage: emptyLastMessage,
    likes: [],
    postCount: 0,
    title: '',
    viewCount: 0
};

export const emptyPost: PostItemType = {
    author: emptyUser,
    dislikes: [],
    editedAt: "",
    id: '',
    likes: [],
    postedAt: "",
    text: ""
};

