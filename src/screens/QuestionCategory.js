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


export default function QuestionCategory (props) {

  const [questions, setQuestions] = useState(null);
  const category = props.match.params.category;
  const styles = useStyles();

  useEffect(() => {
    db.collection("questions").where('category', 'array-contains', category).orderBy('created_at', 'desc').get().then((docs) => {
      var ques = [];
      docs.forEach((doc) => {
          ques.push(doc.data());
      });
      setQuestions(ques);
    });
  });

  return (
    <Fragment>
      <h3 className={styles.title}>Questions Categorized As {category}</h3>
      <QuestionList questions={questions} />
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

