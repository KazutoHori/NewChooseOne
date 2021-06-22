import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuestionList from '../components/QuestionList.js';


export default class Contact extends Component {
  render() {
    return (
      <Fragment>
        <div style={styles.contact} className="contact">
          <h2 className='cali'>Contact Us</h2>
          <p style={styles.p}>If you have any questions or thoughts on this site,<br />
            <span style={styles.span}>please e-mail us!!</span></p>
          <p style={styles.p}>Our email address is </p><address><u><strong><a style={{color: 'blue'}} href="mailto:admin@chooseone.app">admin@chooseone.app</a></strong></u></address><p />
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
  contact: {
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    padding: 20,
    filter: 'drop-shadow(0px 0px 5px rgba(160, 160, 160, 0.7))',
    borderRadius: 15,
  },
  p: {
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  span: {
    color: 'red',
  },
}
