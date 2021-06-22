import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuestionList from '../components/QuestionList.js';


export default class Top extends Component {
  render() {
    return (
      <Fragment>
        <div className="main_list" style={styles.main_list}>
          <QuestionList questions={[]} />
        </div>
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
