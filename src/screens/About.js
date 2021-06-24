import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LeftBar from '../components/LeftBar';
import RightBar from '../components/RightBar';

export default class Home extends React.Component {

  render() {

    return (
      <Fragment>
        <div style={styles.about}>
          <h1 className='cali' style={styles.h1}>About ChooseOne</h1>
          <br />
          <p style={styles.p}>
            ChooseOne's <strong style={styles.strong}>MISSION</strong> is to let you have access
            to general understandings through user-interactive questions.
            You can create your own questions and get to know what people
            think, which is one of the biggest features of ChooseOne.
          </p>
          <p style={styles.p}>
            The <strong style={styles.strong}>HEART</strong> of ChooseOne is your votes.
            The more you vote, the more you can influence the results and
            ,in the long run, can be helpful to people in the world who
            want to know the results.
          </p>
          <p style={styles.p}>
            I sincerely <strong style={styles.strong}>HOPE</strong> ChooseOne will be helpful
            and enjoyable to you all even a little. Nothing can be
            substituted with your pleasant experience with ChooseOne for me.
          </p>
          <h3 className='cali' style={styles.h3}>Thank you All for using ChooseOne!</h3>
        </div>
      </Fragment>
    );
  }
}

const styles = {

  h3: {
    fontFamily: 'lust-script, sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
    marginBottom: 15,
  },
  about: {
    backgroundColor: 'white',
    padding: 15,
    filter: 'drop-shadow(0px 0px 5px rgba(160, 160, 160, 0.7))',
    borderRadius: 15,
  },
  h1: {
    textAlign: 'center',
    fontFamily: 'lust-script, sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
  },
  p: {
    lineHeight: 3,
  },
  h3: {
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  strong: {
    fontWeight: 600,
    fontStyle: 'italic',
  }
}
