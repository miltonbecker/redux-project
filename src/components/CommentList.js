import React, { Component } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';

class CommentList extends Component {

    render() {
        return (
            <div className='row'>
                <div className='col-md-6 col-md-offset-2'>
                    <h2>Comments</h2>
                    {this.props.comments.map(comment => (
                        <Comment key={comment.id} username={comment.username} email={comment.email} date={comment.date} content={comment.content} />
                    ))}
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    };
}

export default connect(mapStateToProps)(CommentList);