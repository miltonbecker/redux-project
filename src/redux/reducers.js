import * as actions from './actions';

function comments(state = [], action) {
    switch (action.type) {
        case actions.FETCHED_COMMENTS:
            return [
                ...action.result
            ];
        case actions.ADDED_COMMENT:
            return [
                action.comment,
                ...state
            ];
        case actions.DELETED_COMMENT:
            let index = state.findIndex((comment) => comment.id == action.id || comment.key == action.id);
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];
        default:
            return state;
    }
}

function fetching(state = false, action) {
    switch (action.type) {
        case actions.FETCHING_COMMENTS:
            return true;
        case actions.FETCHED_COMMENTS:
        case actions.FETCHING_ERROR:
            return false;
        default:
            return state;
    }
}

function fetchingError(state = undefined, action) {
    switch (action.type) {
        case actions.FETCHING_ERROR:
            return action.error;
        case actions.CLEAR_ERRORS:
            return undefined;
        default:
            return state;
    }
}

function addingError(state = undefined, action) {
    switch (action.type) {
        case actions.ADDING_ERROR:
            return action.error;
        case actions.CLEAR_ERRORS:
            return undefined;
        default:
            return state;
    }
}

function deletingError(state = undefined, action) {
    switch (action.type) {
        case actions.DELETING_ERROR:
            return action.error;
        case actions.CLEAR_ERRORS:
            return undefined;
        default:
            return state;
    }
}

function commentApp(state = {}, action) {
    return {
        fetching: fetching(state.fetching, action),
        comments: comments(state.comments, action),
        fetchingError: fetchingError(state.fetchingError, action),
        addingError: addingError(state.addingError, action),
        deletingError: deletingError(state.deletingError, action)
    };
}

export default commentApp;