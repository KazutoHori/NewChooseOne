import React, { Component, Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuestionList from '../components/QuestionList.js';
import { WindMillLoading } from 'react-loadingg';

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


export default class QuestionAnswered extends Component {

  constructor(props){
    super(props);

    this.state = {
      questions: [],
    }
  }

  componentDidMount(){
    db.collection("questions").orderBy('created_at', 'desc').onSnapshot((querySnapshot) => {
      var ques = [];
      querySnapshot.forEach((doc) => {
          ques.push(doc.data());
      });
      this.setState({ questions: ques });
    });
  }

  render() {
    const { questions } = this.state;

    if(questions === []){
      return (
        <Loading type='bubbles' color='#eba' />
      )
    }

    return (
      <WindMillLoading color='rgb(39, 169, 68)' speed={1.2} size='large' />
    )

    return (
      <Fragment>
        <QuestionList questions={this.state.questions} />
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
