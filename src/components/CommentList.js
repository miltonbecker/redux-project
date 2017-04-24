import React, { Component } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import { fetchComments, deleteComment } from '../redux/actions';

class CommentList extends Component {

    render() {
        return (
            <div className='row'>
                <div className='col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3'>
                    <h2>Comments</h2>
                    {this.props.fetchingError &&
                        <div className="alert alert-danger" role="alert">
                            There was an error getting the comments from the server.<br />
                            Try refreshing the page.
                        </div>
                    }

                    {this.props.deletingError &&
                        <div className="alert alert-danger" role="alert">
                            Oops, there was an error deleting the comment from the server.
                        </div>
                    }

                    {this.props.fetching &&
                        <p>Getting comments...</p>}

                    {!this.props.fetching &&
                        this.props.comments.map((comment) => (
                            <Comment {...comment}
                                key={comment.id || comment.key}
                                onDelete={() => { this.props.onDelete(comment.id) }} />
                        ))
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.getComments();
    }

}

const mapStateToProps = (state) => {
    return {
        fetching: state.fetching,
        comments: state.comments,
        fetchingError: state.fetchingError,
        deletingError: state.deletingError
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (id) => {
            if (!confirm('Are you sure you want to delete the comment?')) {
                return;
            }
            dispatch(deleteComment(id));
        },
        getComments: () => {
            dispatch(fetchComments());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);