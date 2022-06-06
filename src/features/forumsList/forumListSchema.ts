export {};
//
// import {buildSchema, entity} from "ts-normalizr";
//
//
//
//             {
//                 id: 'id1',
//                 name: 'forum1',
//                 description: 'forum1 long description',
//                 themeCount: 10,
//                 postCount: 100,
//                 lastMessage: {
//                     dateTime: '2022-01-01T12:13:14', user: {id: '01', name: 'user1'}
//                 }
//             }
//
//
//
// {
// forums:['id1','id2','id3']
//
// }
//
//
//
// const list = [
//     {
//         id: 'id1',
//         name: 'forum1',
//         description: 'forum1 long description',
//         themeCount: 10,
//         postCount: 100,
//         lastMessage: {
//             dateTime: '2022-01-01T12:13:14', user: {id: '01', name: 'user1'}
//         }
//     }, {
//     id: 'id2',
//     name: 'forum2',
//     description: 'forum2 long description',
//     themeCount: 20,
//     postCount: 200,
//     lastMessage: {
//         dateTime: '2022-02-02T14:16:18', user: {id: '02', name: 'user2'}
//     }
// }, {
//     id: 'id3',
//     name: 'forum3',
//     description: 'forum3 long description',
//     themeCount: 30,
//     postCount: 300,
//     lastMessage: {
//         dateTime: '2022-03-03T15:17:19', user: {id: '03', name: 'user3'}
//     },
// }
// ]
//
// interface User {
//     id: string,
//     name: string
// }
//
// interface LastMessage {
//     dateTime: string,
//     user: User
// }
//
// interface Forum {
//     id: string,
//     name: string,
//     description: string,
//     themeCount: number,
//     postCount: number
//     lastMessage: LastMessage
// }
//
// const userSchema = buildSchema(
//     entity<User>().id('id').name('users')
// );
//
// // const lastMessageSchema = buildSchema(
// //     entity<LastMessage>().
// // )
//
//
// const forumSchema = buildSchema(
//     entity<Forum>().id('id').name('forums')
// );
//
// console.log(forumSchema.normalize(list));*/
