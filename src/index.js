import React, { Fragment, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { makeStyles, createStyles } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Header from './components/Header';
import SmallHeader from './components/SmallHeader';
import Footer from './components/Footer';
import BottomBar from './components/BottomBar';
import QuestionDetail from './screens/QuestionDetail';
import './App.scss';

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


export default function Routing () {

  const uid = localStorage.getItem('chooseoneUid');
  const styles = useStyles();
  const smallDisplay = useMediaQuery('(max-width:500px)');

  const makeNewUser = () => {
    let current=new Date();
    current=current.toJSON();
    firebase.auth().signInAnonymously().then(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var userId = user.uid;
          localStorage.setItem('chooseoneUid', userId);
          var at = current.slice(0, 10)+ ' ' + current.slice(11, 19);

          var new_user = {
            email: '',
            uid: userId,
            created_at: at,
            question_voted: [],
            question_created: [],
            question_liked: [],
            username: '',
          };
          db.collection('users').doc(userId).set(new_user);
        }
      });          
    })

  }

  useEffect(() => {
    if(uid) return null;

    makeNewUser();
  });
    
  return (
    <Fragment>
      <div>
        <title>ChooseOne</title>
        <meta name="description" content="ChooseOne lets you have access to general understandings through user-interactive questions. The more you vote, the more you can influence the results and ,in the long run, can be helpful to people in the world who want to know the results." />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.typekit.net/wjg1qds.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="{% sass_src 'css/base.scss' %}" />
        <link rel="stylesheet" href="https://use.typekit.net/wjg1qds.css" />
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
        <meta name="google-site-verification" content="ZLvGG7OEMwGguqr5Nome2wbtPSHJZU16uVVaw5QkEGc" />
        <script src='https://cdn.jsdelivr.net/gh/emn178/chartjs-plugin-labels/src/chartjs-plugin-labels.js'></script>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script>
      </div>
      <Router>
        <div className={styles.background}>
          {smallDisplay 
            ?
            <SmallHeader />
            :
            <Header />
          }
          
          <div className={styles.wrapper}>
            <div className={useMediaQuery('(min-width:500px)') ? 'container' : ''}>
              <div className={styles.container}>
                <Switch>
                  <Route path="/q/:the_slug" render={ (props) => <QuestionDetail {...props} /> } />
                  <Route path="/" render={ () => <App /> } />
                </Switch>
              </div>
            </div>
            {smallDisplay && (
              <div className={styles.bottomBar}>
                <BottomBar />
              </div>
            )}
            <Footer/>
          </div>
        </div>
      </Router>
    </Fragment>
  );
}

const useStyles = makeStyles(() => createStyles({
  bottomBar: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f1efef',
    height: 50,
    filter: 'drop-shadow(0px 0px 2px rgba(160, 160, 160, 0.7))',
    paddingTop: 5,
    zIndex: 2,
  },
  wrapper: {
    minHeight: window.innerHeight-30,
    position: 'relative',/*←相対位置*/
    paddingBottom: 220,/*←footerの高さ*/
    boxSizing: 'border-box',/*←全て含めてmin-height:100vhに*/
  },
  background: {
    backgroundColor: '#f1efef',
  },
  container: {
    paddingTop: 15,
    paddingBottom: 30,
  },

  '@media (max-width: 500px)': {
    container: {
      paddingTop: 5,
      paddingBottom: 10,
    },
    wrapper: {
      paddingBottom: 175,
    }
  }
}));

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
