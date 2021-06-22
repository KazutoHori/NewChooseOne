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
    };
  }

  async componentDidMount(){
    const { uid } = this.props;
    const { questions } = this.state;
    if (uid === null || questions !== null) return null;

    var ques = [];
    await db.collection("users").doc(uid).onSnapshot((doc) => {
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
  }

  async componentDidUpdate(){
    const { uid } = this.props;
    const { questions } = this.state;
    if (uid === null || questions !== null) return null;

    var ques = [];
    await db.collection("users").doc(uid).onSnapshot((doc) => {
      ques = [];
      var qs = doc.data().question_answered;
      console.log(qs);
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

  render() {
    const { uid } = this.props;
    const { questions } = this.state;

    return (
      <Fragment>
        <h3 className='cali'>Questions You Answered</h3>
        {uid === null || questions === null && (<Loading  type='bars' color='#184' />)}
        {uid !== null && questions !== null && (
          <Fragment>
            {questions === [] && (
              <pre>        You have not answered any questions yet.</pre>
            )}
            {questions !== [] && (
              <QuestionList questions={questions} />
            )}
          </Fragment>
        )}
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
