function comments(state = [], action) {
    switch (action.type) {
        case 'ADD_COMMENT':
            return [
                ...state,
                {
                    username: action.username,
                    email: action.email,
                    content: action.content,
                    id: action.id,
                    date: action.date
                }
            ];
        default:
            return state;
    }
}

function commentApp(state = {}, action) {
    return {
        comments: comments(state.comments, action)
    };
}

export default commentApp;