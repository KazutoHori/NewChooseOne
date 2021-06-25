import React, { useState, useEffect, Fragment } from 'react';
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


export default function Home () {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if(questions.length !== 0) return null;
    db.collection("questions").orderBy('created_at', 'desc').onSnapshot((querySnapshot) => {
      var ques = [];
      querySnapshot.forEach((doc) => {
          ques.push(doc.data());
      });
      setQuestions(ques);
    });
  });

  return (
    <Fragment>
      <QuestionList questions={questions} />
    </Fragment>
  )
}
