import React, { Component, Fragment } from 'react';
import Loading from 'react-loading';

import { slugify, timeToDay } from '../utils/Funcs.js';

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

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      questionPopular: [],
    }
  }

  componentDidMount() {
    let current=new Date();
    current=current.toJSON();
    var today = timeToDay(current.slice(0, 10));

    var quesRef = db.collection('questions');
    quesRef.orderBy('all_votes', 'desc').limit(10).get().then((docs) => {
      var ques = [];
      docs.forEach(q => {
        ques.push(q.data());
      });
      this.setState({ questionPopular: ques });
    });
  }

  render() {
    const { questionPopular } = this.state;

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
                {idx === 9 && (
                  <Fragment>
                    <img src="https://img.icons8.com/color/25/000000/10.png"/>
                    <a className="link" href={'/detail/' + question.slug}><h6><strong>{question.title}</strong></h6></a>
                  </Fragment>
                )}
                {idx !== 0 && idx !== 1 && idx !== 2 && idx !== 9 && (
                  <Fragment>
                    <img src={'https://img.icons8.com/color/20/000000/'+(idx+1)+'-circle-c--v2.png'} />
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

  componentDidUpdate() {
    if(this.state.questionPopular !== []) return null;

    let current=new Date();
    current=current.toJSON();
    var today = timeToDay(current.slice(0, 10));

    var quesRef = db.collection('questions');
    quesRef.orderBy('all_votes', 'desc').limit(10).get().then((docs) => {
      var ques = [];
      docs.forEach(doc => {
        ques.push(doc.data());
      });
      this.setState({ questionPopular: ques });
    });
  }
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
}