import React, { Component } from 'react';
import { addComment } from '../redux/actions';
import { connect } from 'react-redux';
import EmailValidator from 'email-validator';

class CommentForm extends Component {

    render() {
        return (
            <div className='row'>
                <div className='col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3'>
                    <h3>Add your comment</h3>
                    <form id='comment-form' onSubmit={(event) => {
                        event.preventDefault();
                        this.submitCb(this.username, this.email, this.content);
                    }}>
                        <input type='text' placeholder='Username' className='form-control' ref={node => { this.username = node }} />
                        <input type='text' placeholder='E-mail (optional)' className='form-control' ref={node => { this.email = node }} />
                        <textarea rows='5' placeholder='Comment' className='form-control' ref={node => { this.content = node }} />
                        <button type='submit' className='btn btn-primary'>Submit</button>
                       
                        {this.props.addingError &&
                            <div className="alert alert-danger" role="alert">
                                Oops, there was an error submitting your comment to the server.
                            </div>
                        }
                    </form>
                </div>
            </div>
        );
    }

    submitCb(inputUsername, inputEmail, inputContent) {
        const username = inputUsername.value.trim();
        const email = inputEmail.value.trim();
        const content = inputContent.value.trim();

        if (!username || !content) {
            alert('Please, make sure you\'ve fulfilled the username and comment fields.');
            return;
        }

        if (email && !EmailValidator.validate(email)) {
            alert('Nope, that\'s an invalid email, sir.');
            return;
        }

        this.props.dispatch(addComment({ username, email, content }));

        this.clearFields(inputUsername, inputEmail, inputContent);
    }

    clearFields(inputUsername, inputEmail, inputContent) {
        inputUsername.value = '';
        inputEmail.value = '';
        inputContent.value = '';

        //placeholder fix
        inputEmail.focus();
        inputUsername.focus();
    }
}

const mapStateToProps = (state) => {
    return {
        addingError: state.addingError
    };
}

export default connect(mapStateToProps)(CommentForm);