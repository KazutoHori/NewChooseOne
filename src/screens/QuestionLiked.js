import React, { Component, Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuestionList from '../components/QuestionList.js';


export default class QuestionLiked extends Component {
  render() {
    return (
      <Fragment>
        <h3 className='cali'>Questions You Liked</h3>
        <QuestionList questions={[]} />
      </Fragment>
    )
  }
}

const styles = {
  main_list: {
    width: 630,
    height: 'auto',
  },
}
