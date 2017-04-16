import React, { Component } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import { fetchComments } from '../redux/actions';

class CommentList extends Component {

    render() {
        return (
            <div className='row'>
                <div className='col-md-6 col-md-offset-2'>
                    <h2>Comments</h2>
                    {this.props.fetching &&
                        <p>Getting comments...</p>}
                    {!this.props.fetching &&
                        this.props.comments.map(comment => (
                            <Comment key={comment.id} username={comment.username} email={comment.email} date={comment.date} content={comment.content} />
                        ))}
                    {this.props.fetchingError &&
                        <p>Problem getting comments: {this.props.fetchingError}</p>}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.dispatch(fetchComments());
    }

}

const mapStateToProps = (state) => {
    return {
        fetching: state.fetching,
        comments: state.comments,
        fetchingError: state.fetchingError
    };
}

export default connect(mapStateToProps)(CommentList);