import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, createStyles } from '@material-ui/core';

import Home from './screens/Home';
import About from './screens/About';
import Contact from './screens/Contact';
import QuestionCreate from './screens/QuestionCreate';
import QuestionLiked from './screens/QuestionLiked';
import QuestionAsked from './screens/QuestionAsked';
import QuestionVoted from './screens/QuestionVoted';
import QuestionCategory from './screens/QuestionCategory';
import QuestionSearch from './screens/QuestionSearch';

import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';

export default function App (props) {
  
  const { uid } = props;
  const styles = useStyles();
  const smallDisplay = useMediaQuery('(max-width:500px)');

  return (
    <Fragment>
      <div style={{ display: 'flex' }}>
        <Router>
          <LeftBar />
          <div className={styles.main_list}>
              <Switch>
                <Route exact path='/about' component={About}/>
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/create" render={ () => <QuestionCreate uid={uid}/> } />
                <Route exact path="/made" render={ () => <QuestionAsked uid={uid}/> } />
                <Route exact path="/voted" render={ () => <QuestionVoted uid={uid}/> } />
                <Route exact path="/liked" render={ () => <QuestionLiked uid={uid}/> } />
                <Route path="/category/:category" render={ (props) => <QuestionCategory uid={uid} {...props} /> } />
                <Route path='/search/:query' render={ (props) => <QuestionSearch uid={uid} {...props} /> } />
                <Route path='/' render={ () => <Home uid={uid}/> } />
              </Switch>
          </div>
          <RightBar />
        </Router>
      </div>
    </Fragment>
  )
}

const useStyles = makeStyles(() => createStyles({
  main_list: {
    width: 630,
    height: 'auto',
  },
}));
