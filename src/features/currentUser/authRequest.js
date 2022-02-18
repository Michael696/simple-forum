import request from '../../app/backend';

export function auth({username, password}) {
    return request.post('/api/auth', {username, password})
        .catch(e => {
            if (e.response) {
                return {auth: false, message: e.response.data}
            } else if (e.request) {
                return {auth: false, message: e.request.body}
            } else {
                return {auth: false, message: e.message}
            }
        })
}