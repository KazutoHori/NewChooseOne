import React, { Fragment } from 'react';

import Question from './Question';

export default function QuestionList (props) {

  const questions = props.questions;

  if(questions === null || questions.length === 0){
    const skeletons = new Array(10).fill('skeleton');
    return (
      <Fragment>
        {skeletons.map(skeleton => (
          <Question the_question={skeleton} />
        ))}
      </Fragment>
    )
  }
  return (
    <Fragment>
      {questions.map(question => (
        <Question the_question={question} />
      ))}
    </Fragment>
  );
}