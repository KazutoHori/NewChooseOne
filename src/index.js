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

  const [uid, setUid] = useState(null);
  const styles = useStyles();
  const smallDisplay = useMediaQuery('(max-width:500px)');

  const makeNewUser = () => {
    var ref = new Date();
    var datetime = ref.toString().slice(4, 25);
    firebase.auth().signInAnonymously().then(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          setUid(uid);
          localStorage.setItem('chooseoneUid', uid);

          var new_user = {
            email: '',
            uid: uid,
            created_at: datetime,
            question_voted: [],
            question_created: [],
            question_liked: [],
            username: '',
          };
          db.collection('users').doc(uid).set(new_user).then(() => {
            setUid(new_user);
          });
        }
      });          
    })
  }

  useEffect(() => {
    if(uid !== null) return null;
    const ls = localStorage.getItem('chooseoneUid');

    if(uid === null) {
      if (ls === null){
        makeNewUser();
      }else{
        db.collection('users').doc(ls).get().then((doc) => {
          if(doc.exists) setUid(ls);
          else{ 
            localStorage.removeItem('chooseoneUid');
            makeNewUser();
          }
        })
      }
    }
  }, [uid]);
    
  return (
    <Fragment>
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
                  <Route path="/q/:the_slug" render={ (props) => <QuestionDetail uid={uid} {...props} /> } />
                  <Route path="/" render={ () => <App uid={uid}/> } />
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
