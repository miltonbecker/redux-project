import $ from 'jquery';

export const FETCHING_COMMENTS = 'FETCHING_COMMENTS';
function fetchingComments() {
    return {
        type: FETCHING_COMMENTS
    }
}

export const FETCHED_COMMENTS = 'FETCHED_COMMENTS';
function fetchedComments(json) {
    return {
        type: FETCHED_COMMENTS,
        result: json
    }
}

export const FETCHING_ERROR = 'FETCHING_ERROR';
function fetchingError(err) {
    return {
        type: FETCHING_ERROR,
        error: err
    }
}

export const ADDING_COMMENT = 'ADDING_COMMENT';
function addingComment() {
    return {
        type: ADDING_COMMENT
    }
}

export const ADDED_COMMENT = 'ADDED_COMMENT';
function addedComment() {
    return {
        type: ADDED_COMMENT
    }
}

export const ADDING_ERROR = 'ADDING_ERROR';
function addingError(err) {
    return {
        type: ADDING_ERROR,
        error: err
    }
}

export function fetchComments() {

    return function (dispatch) {

        dispatch(fetchingComments());

        return $.get('api/comments')
            .done((data) => {
                dispatch(fetchedComments(JSON.parse(data)));
            })
            .fail((jqObj, error, statusText) => {
                dispatch(fetchingError(statusText));
            });
    }
}

export function addComment(json) {

    return function (dispatch) {

        dispatch(addingComment());

        return $.ajax('api/comments', {
            data: JSON.stringify(json),
            contentType: 'application/json',
            type: 'POST'
        })
            .done((data) => {
                dispatch(addedComment());
                dispatch(fetchComments());
            })
            .fail((jqObj, error, statusText) => {
                dispatch(addingError(statusText));
            });
    }
}