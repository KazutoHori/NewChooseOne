import React, { useState, useEffect, Fragment } from 'react';
import { WindMillLoading } from 'react-loadingg';
import { makeStyles, createStyles } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Helmet } from "react-helmet";

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


export default function QuestionSearch (props) {

  const [results, setResults] = useState(null);
  const query = props.match.params.query;
  const q = query.toLowerCase();
  const styles = useStyles();
  const smallDisplay = useMediaQuery('(max-width:500px)');

  useEffect(() => {
    if(results !== null) return null;
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
      setResults(ques); 
    });
  });

  if(results === null){
    return (
      <Fragment>
        <h3 className={styles.title}>Search Results</h3>
        <div><pre>      Searching...</pre></div>
        <div className={styles.loadingPos}>
          <WindMillLoading className={styles.loadingPos} speed={1.2} size={smallDisplay ? 'small' : 'large'} />
        </div>
      </Fragment>
    )
  }else{
    return (
      <Fragment>
        <Helmet
          title = 'Search Results'
          meta={[
            { name: 'description', content: 'ChooseOne lets you have access to general understandings through user-interactive questions. The more you vote, the more you can influence the results, and it can be helpful to all the people who want to know the results.' }
          ]}
        />
        <h3 className={styles.title}>Search Results</h3>
        {results.length === 0 && <pre className={styles.forSmallNoMatch}>      No search results for - {query} -</pre>}
        {results.length !== 0 && (
          <Fragment>
            <pre>      - {query} -</pre>
            <QuestionList questions={results} />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

const useStyles = makeStyles(() => createStyles({
  title: {
    fontFamily: 'lust-script, sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
  },
  loadingPos: {
    marginTop: 50,
    marginLeft: 50,
    position: 'relative',
  },

  '@media (max-width: 500px)': {
    title: {
      fontSize: 22,
      marginLeft: 13,
      marginTop: 7,
    },
    forSmallNoMatch: {
      fontSize: 12,
    },
    loadingPos: {
      position: 'relative',
      fontSize: 10,
      marginTop: 70,
      marginLeft: -150,
    }
  }
}));
