import React, { Component, Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import './App.scss';

import ReactDOM from "react-dom";

import Header from './components/Header';
import Footer from './components/Footer'
import Home from './screens/Home';
import About from './screens/About';
import QuestionDetail from './screens/QuestionDetail'
import QuestionResult from './screens/QuestionResult'

import Contact from './screens/Contact';
import QuestionCreate from './screens/QuestionCreate';
import QuestionLiked from './screens/QuestionLiked';
import QuestionAsked from './screens/QuestionAsked';
import QuestionAnswered from './screens/QuestionAnswered';
import QuestionCategory from './screens/QuestionCategory';
import QuestionSearch from './screens/QuestionSearch';

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
  }
  render() {
    const { uid } = this.props;

    return (
      <Fragment>
        <Router>
          <LeftBar />
          <div style={styles.main_list}>
              <Switch>
                <Route exact path='/about' component={About}/>
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/create" render={ () => <QuestionCreate uid={uid}/> } />
                <Route exact path="/asked" render={ () => <QuestionAsked uid={uid}/> } />
                <Route exact path="/answered" render={ () => <QuestionAnswered uid={uid}/> } />
                <Route exact path="/liked" render={ () => <QuestionLiked uid={uid}/> } />
                <Route path="/category/:category" render={ (props) => <QuestionCategory uid={uid} {...props} /> } />
                <Route path='/search/:query' render={ (props) => <QuestionSearch uid={uid} {...props} /> } />
                <Route path='/' render={ () => <Home uid={uid}/> } />
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
