import React, { useEffect, useState, Fragment } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { timeToDay } from '../utils/Funcs.js';

// Firebase
import firebase from 'firebase/app';
import "firebase/firestore";
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

export default function RightBar (props) {

  const [questionPopular, setQuestionPopular] = useState([]);
  const doNotDisplay = useMediaQuery('(max-width:777px)');

  useEffect(() => {
    if(questionPopular.length !== 0) return null;

    var quesRef = db.collection('questions');

    quesRef.orderBy('all_votes', 'desc').limit(10).get().then((docs) => {
      var ques = [];
      docs.forEach(q => {
        ques.push(q.data());
      });
      setQuestionPopular(ques);
    });
  });

  if(doNotDisplay) return null;
  return (
    <Fragment>
      {/* 右バー */}
      <div style={styles.right_side}>
        <h5 style={styles.semiTitle} className='cali'>Popular Questions</h5>
        {questionPopular.map((question, idx) => (
          <div className="side_question">
            <div className="title">
              {idx === 0 && (
                <Fragment>
                  <img src="https://img.icons8.com/color/25/000000/first-place-ribbon.png" />
                  <a className="link" href={'/detail/' + question.slug}><h6 style={{color: 'rgb(223, 176, 0)'}}><strong>{question.title}</strong></h6></a>
                </Fragment>
              )}
              {idx === 1 && (
                <Fragment>
                  <img src="https://img.icons8.com/color/25/000000/second-place-ribbon.png" />
                  <a className="link" href={'/detail/' + question.slug}><h6 style={{color: 'rgb(174, 179, 181)'}}><strong>{question.title}</strong></h6></a>
                </Fragment>
              )}
              {idx === 2 && (
                <Fragment>
                  <img src="https://img.icons8.com/color/25/000000/third-place-ribbon.png" />
                  <a className="link" href={'/detail/' + question.slug}><h6 style={{color: 'rgba(184, 115, 51, 0.692)'}}><strong>{question.title}</strong></h6></a>
                </Fragment>
              )}
              {idx !== 0 && idx !== 1 && idx !== 2 && (
                <Fragment>
                  <div style={styles.number}><p>{idx+1}</p></div>
                  <a className="link" href={'/detail/' + question.slug}><h6><strong>{question.title}</strong></h6></a>
                </Fragment>
              )}
            </div>
            <ul>
              {question.choices.map(choice => (
                <div>
                  <label>○ {choice.choice_text}</label>
                  <br />
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

const styles = {
  // 右バー
  right_side: {
    width: 221,
    backgroundColor: 'white',
    filter: 'drop-shadow(0px 0px 5px rgba(160, 160, 160, 0.7))',
    borderRadius: 15,
    marginLeft: 30,
    paddingTop: 15,
    paddingBottom: 15,
    height: 'fit-content',
  },
  semiTitle: {
    paddingLeft: 10,
  },
  number: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgb(2, 122, 255)',
    color: 'white',
    fontSize: 5,
    textAlign: 'center',
    marginTop: 7,
    marginRight: 4,
    marginLeft: 5,
  }
}