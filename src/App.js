import React, { Component } from 'react';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';

export class App extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <CommentForm />
        <CommentList />
      </div>
    );
  }
}