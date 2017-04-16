import React, { Component } from 'react';
import dateFormat from 'dateformat';

class Comment extends Component {

    render() {
        return (
            <div className='row'>
                <div className='col-xs-12'>
                    <div className='well well-sm'>
                        <p>{this.props.content}</p>
                        <footer>
                            <span>{this.props.username}</span>
                            {this.props.email &&
                                <span> (<a href={`mailto:${this.props.email}`}>email</a>)</span>
                            }
                            <span> on {dateFormat(this.props.date, 'mmmm dS, yyyy @ h:MM TT')}</span>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;