import React, { Component, Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuestionList from '../components/QuestionList.js';

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


export default class QuestionAnswered extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      questions: null,
      user: null,
    };
  }

  getQues = (user) => {
    db.collection("users").doc(user.uid).onSnapshot((doc) => {
      var ques = [];
      var qs = doc.data().question_answered;
      for(let i=0; i<qs.length; i++){
        db.collection('questions').doc(qs[i].question).get().then((doc) => {
          if(doc.exists){
            ques.unshift(doc.data())
            this.setState({ questions: ques });
          }
        });
      }
    });
  }

  async componentDidUpdate(){

    var ques = [];
    const { user } = this.props;

    if (user === null) {return null;}
    db.collection("users").doc(user.uid).onSnapshot((doc) => {
      ques = [];
      var qs = doc.data().question_answered;
      for(let i=0; i<qs.length; i++){
        db.collection('questions').doc(qs[i].question).get().then((doc) => {
          if(doc.exists){
            ques.unshift(doc.data())
            this.setState({ questions: ques });
          }
        });
      }
    });
    // })
  }

  render() {
    const { user } = this.props;
    const { questions } = this.state;

    console.log(user);
    if (user !== null){
      this.getQues(user);
    }

    if (questions === null){
      return (
        <Fragment>
          <h3 className='cali'>Questions You Answered</h3>
          <pre>        You have not added any questions yet.</pre>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <h3 className='cali'>Questions You Answered</h3>
        {user === null && (<Loading  type='bars' color='#184' />)}
        {user !== null && (<QuestionList questions={questions} />)}
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
