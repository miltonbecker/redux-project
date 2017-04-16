import uuid from 'uuid/v4';

export function addComment({ username, email, content, date, id }) {
    return {
        type: 'ADD_COMMENT',
        username,
        email,
        content, 
        date: new Date().getTime(),
        id: uuid()
    }
}