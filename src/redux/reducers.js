import * as actions from './actions';

function comments(state = [], action) {
    switch (action.type) {
        case actions.FETCHED_COMMENTS:
            return [
                ...action.result
            ];
        case actions.FETCHING_ERROR:
            return [];
        default:
            return state;
    }
}

function fetch(state = false, action) {
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

function add(state = false, action) {
    switch (action.type) {
        case actions.ADDING_COMMENT:
            return true;
        case actions.ADDED_COMMENT:
        case actions.ADDING_ERROR:    
            return false;
        default:
            return state;
    }
}

function fetchError(state = undefined, action) {
    switch (action.type) {
        case actions.FETCHING_ERROR: 
            return action.error;    
        default:
            return state;
    }
}

function addError(state = undefined, action) {
    switch (action.type) {
        case actions.ADDING_ERROR:    
            return action.error;
        default:
            return state;
    }
}

function commentApp(state = {}, action) {
    return {
        adding: add(state.adding, action),
        fetching: fetch(state.fetching, action),
        comments: comments(state.comments, action),
        fetchingError: fetchError(state.fetchingError, action),
        addingError: addError(state.addingError, action)
    };
}

export default commentApp;