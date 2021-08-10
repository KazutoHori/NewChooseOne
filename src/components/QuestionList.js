import React, { useState, Fragment } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Question from './Question';

export default function QuestionList (props) {

  const questions = props.questions;
  const smallDisplay = useMediaQuery('(max-width:500px)');

  const [page, setPage] = useState(1);

  const theme = createMuiTheme({
      palette: {
        primary: {
          main: 'rgb(3, 122, 255)',
        },
        secondary: {
          main: '#f50057',
        },
        green: {
          main: 'rgb(40, 168, 69)',
        }
      },
    });

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

const styles = {
  paginationPos: {
    display: 'flex',
    width: 'auto',
    borderRadius: 15,
    justifyContent: 'center',
  },
  pagination: {
    padding: '5px 0px',
    filter: 'drop-shadow(0 0 5 rgba(160, 160, 160, 0.7))',
    borderTop: '1px solid rgba(160, 160, 160, 0.7)',
    borderBottom: '1px solid rgba(160, 160, 160, 0.7)',
  }
}