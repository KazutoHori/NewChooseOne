import React, { useEffect, useState, Fragment } from 'react';
import QuestionList from '../components/QuestionList.js';
import { makeStyles, createStyles } from '@material-ui/core';

// Firebase
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyArjDv3hS4_rw1YyNz-JFXDX1ufF72bqr8",
  authDomain: "chooseone-105a9.firebaseapp.com",
  databaseURL: "https://chooseone-default-rtdb.firebaseio.com",
  projectId: "chooseone",
  storageBucket: "chooseone.appspot.com",
  messagingSenderId: "722704825746",
  appId: "1:722704825746:web:73f11551b9e59f4bc2d54b",
  measurementId: "G-YJ97DZH6V5"
};
if (firebase.apps.length === 0){ firebase.initializeApp(firebaseConfig); }
var db = firebase.firestore();


export default class QuestionMade extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      questions: null,
    }
  }

  componentDidMount() {
    const { uid } = this.props;
    if (uid === null || this.state.questions !== null) return null;

    var ques = [];
    db.collection("users").doc(uid).onSnapshot((doc) => {
      ques = [];
      var qs = doc.data().question_created;
      for(let i=0; i<qs.length; i++){
        // eslint-disable-next-line no-loop-func
        db.collection('questions').doc(qs[i]).get().then((doc) => {
          if(doc.exists){
            ques.unshift(doc.data());
            this.setState({ questions: ques});
          }
        });
      }
    });
  }

  render() {
    const { questions } = this.state;
    // const styles = useStyles();

    return (
      <Fragment>
        <h3 className='headline'>Questions You Made</h3>
        {questions !== null && questions.length === 0
          ?
          <pre>   You haven't made any questions.</pre>
          :
          <QuestionList questions={questions} />
        }
      </Fragment>
    )
  }

  componentDidUpdate() {
    const { uid } = this.props;
    if (uid === null || this.state.questions !== null) return null;

    var ques = [];
    db.collection("users").doc(uid).onSnapshot((doc) => {
      ques = [];
      var qs = doc.data().question_created;
      for(let i=0; i<qs.length; i++){
        // eslint-disable-next-line no-loop-func
        db.collection('questions').doc(qs[i]).get().then((doc) => {
          if(doc.exists){
            ques.unshift(doc.data())
            this.setState({ questions: ques});
          }
        });
      }
    });
  }
}

const styles = {
  title: {
    fontFamily: 'lust-script, sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
  },

  '@media (max-width: 500px)': {
    title: {
      fontSize: 22,
      marginLeft: 15,
      marginTop: 7,
    }
  }
};
