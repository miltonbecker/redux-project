import * as actions from './actions';
import { combineReducers } from 'redux';

const comments = (state = [], action) => {
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
};

const fetching = (state = false, action) => {
    switch (action.type) {
        case actions.FETCHING_COMMENTS:
            return true;
        case actions.FETCHED_COMMENTS:
        case actions.FETCHING_ERROR:
            return false;
        default:
            return state;
    }
};

const fetchingError = (state = null, action) => {
    switch (action.type) {
        case actions.FETCHING_ERROR:
            return action.error;
        case actions.CLEAR_ERRORS:
            return null;
        default:
            return state;
    }
};

const addingError = (state = null, action) => {
    switch (action.type) {
        case actions.ADDING_ERROR:
            return action.error;
        case actions.CLEAR_ERRORS:
            return null;
        default:
            return state;
    }
};

const deletingError = (state = null, action) => {
    switch (action.type) {
        case actions.DELETING_ERROR:
            return action.error;
        case actions.CLEAR_ERRORS:
            return null;
        default:
            return state;
    }
};

const commentApp = combineReducers({
    fetching,
    comments,
    fetchingError,
    addingError,
    deletingError
});

export default commentApp;