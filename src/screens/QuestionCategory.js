import React, { useEffect, useState, Fragment } from 'react';
import { Helmet } from "react-helmet";

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
      <Helmet
        title = {'Questions Categorized as' + category + ' - ChooseOne'}
        meta={[
          { name: 'description', content: 'ChooseOne lets you have access to general understandings through user-interactive questions. The more you vote, the more you can influence the results, and it can be helpful to all the people who want to know the results.' }
        ]}
      />
      <h3 className={styles.title}>Questions Categorized as {category}</h3>
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

