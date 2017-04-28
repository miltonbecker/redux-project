import uuid from 'uuid/v4';

export const FETCHING_COMMENTS = 'FETCHING_COMMENTS';
export const FETCHED_COMMENTS = 'FETCHED_COMMENTS';
export const FETCHING_ERROR = 'FETCHING_ERROR';

export const ADDED_COMMENT = 'ADDED_COMMENT';
export const ADDING_ERROR = 'ADDING_ERROR';

export const DELETED_COMMENT = 'DELETED_COMMENT';
export const DELETING_ERROR = 'DELETING_ERROR';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';

function fetchingComments() {
    return {
        type: FETCHING_COMMENTS
    }
}

function fetchedComments(json) {
    return {
        type: FETCHED_COMMENTS,
        result: json
    }
}

function fetchingError(err) {
    return {
        type: FETCHING_ERROR,
        error: err
    }
}

function addedComment(json) {
    return {
        type: ADDED_COMMENT,
        comment: json
    }
}

function addingError(err) {
    return {
        type: ADDING_ERROR,
        error: err
    }
}

function deletedComment(cid) {
    return {
        type: DELETED_COMMENT,
        id: cid
    }
}

function deletingError(err) {
    return {
        type: DELETING_ERROR,
        error: err
    }
}

function clearErrors() {
    return {
        type: CLEAR_ERRORS
    }
}

export function fetchComments() {

    return function (dispatch) {

        dispatch(fetchingComments());

        return $.get('api/comments')
            .done((data) => {
                dispatch(fetchedComments(JSON.parse(data).reverse()));
            })
            .fail((jqObj, error, statusText) => {
                dispatch(fetchingError(statusText));
            });
    }
}

export function addComment(obj) {

    return function (dispatch) {

        dispatch(clearErrors());

        let softKey = uuid();
        let tempComment = Object.assign({}, obj, { key: softKey });

        dispatch(addedComment(tempComment));

        return $.ajax('api/comments', {
            data: JSON.stringify(obj),
            contentType: 'application/json',
            type: 'POST'
        })
            .done((data) => {
                dispatch(fetchComments());
            })
            .fail((jqObj, error, statusText) => {
                dispatch(deletedComment(softKey));
                dispatch(addingError(statusText));
            });
    }
}

export function deleteComment(id) {

    return function (dispatch) {

        dispatch(clearErrors());

        dispatch(deletedComment(id));

        return $.ajax(`api/comments/${id}`, {
            type: 'DELETE'
        })
            .fail((jqObj, error, statusText) => {
                dispatch(deletingError(statusText));
                dispatch(fetchComments());
            });
    }
}