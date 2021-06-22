import React, { Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Question from './Question';
import Pagination from './Pagination.js';


export default class QuestionList extends React.Component {

  render() {
    const { questions } = this.props;
    
    return (
      <Fragment>
        {questions.map(question => (
          <Question question={question} />
        ))}

        <Pagination questions={questions} />
      </Fragment>
    );
  }
}

const styles = {
  onepost: {

  }
}