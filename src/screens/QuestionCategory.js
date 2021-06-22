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
      questions: [],
    }
  }

  componentDidMount(){
    const { params } = this.props.match;
    var category = params.category;

    db.collection("questions").where('category', 'array-contains', category).orderBy('created_at', 'desc').onSnapshot((querySnapshot) => {
      var ques = [];
      querySnapshot.forEach((doc) => {
          ques.push(doc.data());
      });
      this.setState({ questions: ques });
    });
  }

  render() {
    const { params } = this.props.match;
    const { questions } = this.state;
    var category = params.category;

    return (
      <Fragment>
        <h3 className='cali'>Questions Categorized As {category}</h3>
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
