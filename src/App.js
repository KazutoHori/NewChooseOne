import React, { Component, Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import './App.scss';

import ReactDOM from "react-dom";

import Header from './components/Header.js';
import Footer from './components/Footer.js'
import Home from './screens/Home.js';
import About from './screens/About.js';
import QuestionDetail from './screens/QuestionDetail.js'
import QuestionResult from './screens/QuestionResult.js'

import Contact from './screens/Contact.js';
import QuestionCreate from './screens/QuestionCreate.js';
import QuestionLiked from './screens/QuestionLiked.js';
import QuestionAsked from './screens/QuestionAsked.js';
import QuestionAnswered from './screens/QuestionAnswered.js';
import QuestionCategory from './screens/QuestionCategory.js';

import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';

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

export default class App extends Component {
  constructor(props){
    super(props);

    // this.state = {
    //   uid: '',
    //   user: '',
    // }
  }

  // componentDidMount() {
  //   const lc = localStorage.getItem('chooseoneUid');

  //   var ref = new Date();
  //   var datetime = ref.toString().slice(4, 25);
  //   if (lc === null){
  //     firebase.auth().signInAnonymously()
  //       .then(() => {
  //         firebase.auth().onAuthStateChanged((user) => {
  //           if (user) {
  //             var uid = user.uid;
  //             this.setState({ uid });
  //             localStorage.setItem('chooseoneUid', uid);

  //             var new_user = {
  //               email: '',
  //               uid: uid,
  //               created_at: datetime,
  //               question_answered: [],
  //               question_created: [],
  //               question_liked: [],
  //               username: '',
  //             };
  //             db.collection('users').doc(uid).set(new_user).then(() => {
  //               this.setState({ user: new_user });
  //               // this.registerForPushNotificationsAsync(user);
  //             });
  //           }
  //         });          
  //       })
  //   }else{
  //     this.setState({ uid: lc });
  //     db.collection('users').doc(lc).get().then((doc) => {
  //       this.setState({ user: doc.data() });
  //     })
  //   }
  // }

  render() {
    const { user } = this.props;

    return (
      <Fragment>
        <Router>
          <LeftBar />
          <div className='main_list'>
              <Switch>
                <Route exact path='/about' component={About}/>
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/create" render={ () => <QuestionCreate user={user}/> } />
                <Route exact path="/asked" render={ () => <QuestionAsked user={user}/> } />
                <Route exact path="/answered" render={ () => <QuestionAnswered user={user}/> } />
                <Route exact path="/liked" render={ () => <QuestionLiked user={user}/> } />
                <Route path="/category/:category" render={ (props) => <QuestionCategory user={user} {...props} /> } />
                <Route path='/' render={ () => <Home user={user}/> } />
              </Switch>
          </div>
          <RightBar />
        </Router>
      </Fragment>
    )
  }
}

const styles = {
  main_list: {
    width: 630,
    height: 'auto',
  },
}
