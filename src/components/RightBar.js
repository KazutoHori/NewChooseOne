import React, { useEffect, useState, Fragment } from 'react';

// Firebase
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
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
export default function RightBar (props) {

  const [questionPopular, setQuestionPopular] = useState([]);

  useEffect(() => {
    if(questionPopular.length !== 0) return null;

    const q = query(collection(db, 'questions'), orderBy('all_votes', 'desc'), limit(10));

    const promise = new Promise(function(resolve, reject) {
      resolve(getDocs(q));
    });
    promise.then((qq) => {
      var ques = [];
      Promise.all(qq.docs.map(doc => {
        ques.push(doc.data());
        return null;
      })).then(() => {
        setQuestionPopular(ques);
      });
    });
  }, [questionPopular]);

  return (
    <Fragment>
      {/* 右バー */}
      <div style={styles.right_side}>
        <h4 style={styles.semiTitle} className='cali'>Popular Questions</h4>
        {questionPopular.map((question, idx) => (
          <div className="side_question">
            <div className="title">
              {idx === 0 && (
                <Fragment>
                  <p style={{ fontSize: 25 }}>🥇</p> 
                  <a className="link" href={'/q/' + question.slug}><h6 style={{color: 'rgb(223, 176, 0)'}}><strong>{question.title}</strong></h6></a>
                </Fragment>
              )}
              {idx === 1 && (
                <Fragment>
                  <p style={{ fontSize: 25 }}>🥈</p>
                  <a className="link" href={'/q/' + question.slug}><h6 style={{color: 'rgb(174, 179, 181)'}}><strong>{question.title}</strong></h6></a>
                </Fragment>
              )}
              {idx === 2 && (
                <Fragment>
                  <p style={{ fontSize: 25 }}>🥉</p>
                  <a className="link" href={'/q/' + question.slug}><h6 style={{color: 'rgba(184, 115, 51, 0.692)'}}><strong>{question.title}</strong></h6></a>
                </Fragment>
              )}
              {idx !== 0 && idx !== 1 && idx !== 2 && (
                <Fragment>
                  <div style={styles.number}><p>{idx+1}</p></div>
                  <a className="link" href={'/q/' + question.slug}><h6>{question.title}</h6></a>
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
    paddingTop: 5,
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