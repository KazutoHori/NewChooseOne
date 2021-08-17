import React, { Fragment, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { makeStyles, createStyles } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { IoIosAddCircle } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import FavoriteIcon from '@material-ui/icons/Favorite';
import BuildIcon from '@material-ui/icons/Build';
import { Fab, Action } from 'react-tiny-fab';

import Header from './components/Header';
import SmallHeader from './components/SmallHeader';
import Footer from './components/Footer';
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

// export const userAtom = atom({
//   key: 'userState',
//   default: null,
// });

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
    makeNewUser()
  });
    
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
            <div className={!smallDisplay ? 'container' : ''}>
              <div className={styles.container}>
                <Switch>
                  <Route path="/q/:the_slug" render={ (props) => <QuestionDetail {...props} /> } />
                  <Route path="/" render={ () => <App /> } />
                </Switch>
              </div>
            </div>
            {smallDisplay && (
              <Fab
                mainButtonStyles={{ backgroundColor: 'rgb(40, 168, 69)', outline: 'none',  }}
                actionButtonStyles={{ width: 30, height: 30 }}
                style={{ position: 'fixed', bottom: 20,  }}
                icon={<AiOutlinePlus />}
                event={'click'}
                // alwaysShowTitle={true}
              >
                <Action
                  text="Add"
                  style={{backgroundColor: 'rgb(255, 192, 8)', outline: 'none' }} 
                  onClick={() => window.location.href = '/create'}
                >
                  <IoIosAddCircle />
                </Action>
                <Action
                  text="Voted"
                  style={{backgroundColor: 'rgb(40, 168, 69)', outline: 'none' }} 
                  onClick={() => window.location.href = '/voted'}
                >
                  <ThumbUpAltIcon />
                </Action>
                <Action
                  text="Made"
                  style={{backgroundColor: 'rgb(3, 122, 255)', outline: 'none' }} 
                  onClick={() => window.location.href = '/made'}
                >
                  <BuildIcon />
                </Action>
                <Action
                  text="Liked"
                  style={{backgroundColor: 'red', outline: 'none' }} 
                  onClick={() => window.location.href = '/liked'}
                >
                  <FavoriteIcon />
                </Action>
              </Fab>
            )}
            {!smallDisplay && <Footer/>}
          </div>
        </div>
      </Router>
    </Fragment>
  );
}

const useStyles = makeStyles(() => createStyles({
  fabButton: {
    // backgroundColor: 'rgb(40, 168, 69)',
  },
  // fabButtonPos: {

  // },
  actionButton: {

  },
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
    // minHeight: window.innerHeight-30,
    minHeight: '100vh',
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
      paddingTop: 2,
      paddingBottom: 10,
    },
    wrapper: {
      paddingBottom: 175,
    }
  }
}));

ReactDOM.render(
  <React.StrictMode>
    {/* <RecoilRoot> */}
    <Routing />
    {/* </RecoilRoot> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
