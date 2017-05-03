import uuid from 'uuid/v4';

export const FETCHING_COMMENTS = 'FETCHING_COMMENTS';
export const FETCHED_COMMENTS = 'FETCHED_COMMENTS';
export const FETCHING_ERROR = 'FETCHING_ERROR';

export const ADDED_COMMENT = 'ADDED_COMMENT';
export const ADDING_ERROR = 'ADDING_ERROR';

export const DELETED_COMMENT = 'DELETED_COMMENT';
export const DELETING_ERROR = 'DELETING_ERROR';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const fetchingComments = () => ({
    type: FETCHING_COMMENTS
});

const fetchedComments = (json) => ({
    type: FETCHED_COMMENTS,
    result: json
});

const fetchingError = (err) => ({
    type: FETCHING_ERROR,
    error: err
});

const addedComment = (json) => ({
    type: ADDED_COMMENT,
    comment: json
});

const addingError = (err) => ({
    type: ADDING_ERROR,
    error: err
});

const deletedComment = (cid) => ({
    type: DELETED_COMMENT,
    id: cid
});

const deletingError = (err) => ({
    type: DELETING_ERROR,
    error: err
});

const clearErrors = () => ({
    type: CLEAR_ERRORS
});

export const fetchComments = () => (dispatch) => {
    dispatch(fetchingComments());

    return $.get('api/comments')
        .done((data) => {
            dispatch(fetchedComments(JSON.parse(data).reverse()));
        })
        .fail((jqObj, error, statusText) => {
            dispatch(fetchingError(statusText));
        });
};

export const addComment = (obj) => (dispatch) => {
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
};

export const deleteComment = (id) => (dispatch) => {
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