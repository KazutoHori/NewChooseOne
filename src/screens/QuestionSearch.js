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
      results: null,
    }
  }

  componentDidMount(){
    const { query } = this.props.match.params;
    var q = query.toLowerCase();

    db.collection("questions").get().then((querySnapshot) => {
      var ques = [];
      querySnapshot.forEach((doc) => {
        var question = doc.data();
        if(question.slug.includes('___')) var slug = question.slug.split('___')[0];
        else var slug = question.slug;
        var titleWords = slug.split('-');
        if(titleWords.includes(q))ques.unshift(question);
        else{
          for(var i=0; i<question.choices.length; i++){
            var c = question.choices[i].choice_text.toLowerCase().split(' ');
            if(c.includes(q)){ 
              ques.push(question)
              break;
            }
          }
        }
      }); 
      this.setState({ results: ques });
    });
  }

  render() {
    const { query } = this.props.match.params;
    const { results } = this.state;

    if(results === null){
      return (
        <Fragment>
          <h3 className='cali'>Search Results</h3>
          <div style={styles.loadingPos}>
            <WindMillLoading color='rgb(39, 169, 68)' speed={1.2} size='large' />
          </div>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <h3 className='cali'>Search Results</h3>
        {results.length === 0 && <pre>      Your search - {query} - did not match any questions.</pre>}
        {results.length !== 0 && <QuestionList questions={results} />}
      </Fragment>
    )
  }

  componentDidUpdate(){
    if(this.state.results !== null) return null;
    const { query } = this.props.match.params;
    var q = query.toLowerCase();

    db.collection("questions").get().then((querySnapshot) => {
      var ques = [];
      querySnapshot.forEach((doc) => {
        var question = doc.data();
        if(question.slug.includes('___')) var slug = question.slug.split('___')[0];
        else var slug = question.slug;
        var titleWords = slug.split('-');
        if(titleWords.includes(q))ques.unshift(question);
        else{
          for(var i=0; i<question.choices.length; i++){
            var c = question.choices[i].choice_text.toLowerCase().split(' ');
            if(c.includes(q)){ 
              ques.push(question)
              break;
            }
          }
        }
      }); 
      this.setState({ results: ques });
    });
  }
}

const styles = {
  main_list: {
    width: 630,
    height: 'auto',
  },
}
