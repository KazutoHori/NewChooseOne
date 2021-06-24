import React, { Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Pagination, PaginationItem } from '@material-ui/lab';

import Question from './Question';

export default class QuestionList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      page: 1,
      quesOnPage: [],
    }
  }

  onPageChange = (event, value) => {
    this.setState({ page: value });
    window.scrollTo(0, 0);
  }

  render() {
    const { questions } = this.props;
    const { page, quesOnPage } = this.state;
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

    const howManyPages = Math.ceil(questions.length/10);
    
    if(questions === null || questions.length === 0) return null;
    return (
      <Fragment>
        {questions.slice(10*(page-1), 10*page).map(question => (
          <Question question={question} />
        ))}
        <div style={styles.paginationPos}>
          <ThemeProvider theme={theme}>
            {howManyPages !== 1 && <Pagination size={'medium'} style={styles.pagination} onChange={this.onPageChange} page={page} count={howManyPages} color='primary' renderItem={(item) => <PaginationItem style={{ outline: 'none' }} {...item} />} />}
          </ThemeProvider>
        </div>
      </Fragment>
    );
  }
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