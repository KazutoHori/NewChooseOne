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


export default function QuestionMade (props) {

  const [questions, setQuestions] = useState(null);
  const uid = props.uid;
  const styles = useStyles();

  useEffect(() => {
    if (uid === null || questions !== null) return null;

    var ques = [];
    db.collection("users").doc(uid).onSnapshot((doc) => {
      var qs = doc.data().question_created;
      for(var i=0; i<qs.length; i++){
        // eslint-disable-next-line no-loop-func
        db.collection('questions').doc(qs[i]).get().then((doc) => {
          if(doc.exists){
            ques.unshift(doc.data())
            setQuestions(ques)
          }
        });
      }
    })
  });

  return (
    <Fragment>
      <h3 className={styles.title}>Questions You Made</h3>
      {questions !== null && questions.length === 0
        ?
        <pre>   You haven't made any questions.</pre>
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
  },

  '@media (max-width: 500px)': {
    title: {
      fontSize: 22,
      marginLeft: 15,
      marginTop: 7,
    }
  }
}));
