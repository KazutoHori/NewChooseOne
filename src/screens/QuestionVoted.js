import React, { useEffect, useState, Fragment } from 'react';
import QuestionList from '../components/QuestionList.js';
import { makeStyles, createStyles } from '@material-ui/core';
import { Helmet } from "react-helmet";

// Firebase
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore, getDoc, doc } from "firebase/firestore";
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
var db = '';
if (!getApps().length){ 
  const firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp);
}else{
  db = getFirestore();
}

export default function QuestionVoted (props) {

  // カスタムフック
  // react router
  // コンテキスト
  
  const [questions, setQuestions] = useState(null);
  const uid = localStorage.getItem('chooseoneUid');
  const styles = useStyles();

  useEffect(() => {
    const u = doc(db, 'users', uid);
    const promise = new Promise((function(resolve) {
      resolve(getDoc(u));
    }));
    promise.then((user) => {
      if(user.exists()){
        var qs = user.data().question_voted || [];
        const promises = qs.map((q) => {
          return getDoc(doc(db, 'questions', q.question));
        })
        Promise.all(promises).then((docs) => {
          const data = docs.reverse().filter((doc) => doc.exists()).map((doc) => doc.data())
          setQuestions(data);
        })
      }
    })
  }, []);

  return (
    <Fragment>
      <Helmet
        title = 'Questions You Voted'
        meta={[
          { name: 'description', content: 'ChooseOne lets you have access to general understandings through user-interactive questions. The more you vote, the more you can influence the results, and it can be helpful to all the people who want to know the results.' }
        ]}
      />
      <p className={styles.title}>Questions You Voted</p>
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