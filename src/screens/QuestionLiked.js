import React, { useEffect, useState, Fragment } from 'react';
import QuestionList from '../components/QuestionList.js';
import { makeStyles, createStyles } from '@material-ui/core';
import { Helmet } from "react-helmet";

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


export default function QuestionLiked (props) {

  const [questions, setQuestions] = useState(null);
  const uid = localStorage.getItem('chooseoneUid');
  const styles = useStyles();

  useEffect(() => {
    if(uid === null || questions !== null) return null;
    db.collection("users").doc(uid).get().then((doc) => {
      if(doc.exists){
        var qs = doc.data().question_liked || [];
        const promises = qs.map((q) => {
          return db.collection('questions').doc(q).get();
        })
        Promise.all(promises).then((docs) => {
          const data = docs.reverse().filter((doc) => doc.exists).map((doc) => doc.data())
          setQuestions(data);
        })
      }
    });
  });

  return (
    <Fragment>
      <Helmet
        title = 'Questions You Like'
        meta={[
          { name: 'description', content: 'ChooseOne lets you have access to general understandings through user-interactive questions. The more you vote, the more you can influence the results, and it can be helpful to all the people who want to know the results.' }
        ]}
      />
      <p className={styles.title}>Questions You Like</p>
      {questions !== null && questions.length === 0
        ?
        <pre>   There are no questions you like.</pre>
        :
        <QuestionList questions={questions} />
      }
    </Fragment>
  )
}

const useStyles = makeStyles(() => createStyles({
  title: {
    fontFamily: 'lust-script, sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 24,
  },
  '@media (max-width: 500px)': {
    title: {
      fontSize: 22,
      marginLeft: 13,
      marginTop: 7,
    },
  }
}));
