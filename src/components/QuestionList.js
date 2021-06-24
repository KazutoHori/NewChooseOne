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
    const { questions } = this.props;
    this.setState({ page: value });
    this.setState({ quesOnPage: questions.slice(5*(value-1), 5*value) })
  }

  render() {
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


    
    return (
      <Fragment>
        {quesOnPage.map(question => (
          <Question question={question} />
        ))}
        <div class='pagination'>
          <ThemeProvider theme={theme}>
            <Pagination onChange={this.onPageChange} page={page} count={5} color='primary' renderItem={(item) => <PaginationItem style={{ outline: 'none' }} {...item} />} />
          </ThemeProvider>
        </div>
      </Fragment>
    );
  }
}

const styles = {
  onepost: {

  }
}