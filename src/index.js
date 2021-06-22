import React from 'react';
import Loading from 'react-loading';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';

import QuestionDetail from './screens/QuestionDetail';
import QuestionResult from './screens/QuestionResult';
import { Fragment } from 'react';

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


export default class Routing extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      categories: [],
      todays_ranking: [],
      question_popular: [],
    }
  }

  componentDidMount() {
    const lc = localStorage.getItem('chooseoneUid');
    const { uid } = this.state;

    if(uid === null) {
      if (lc === null){
        var ref = new Date();
        var datetime = ref.toString().slice(4, 25);
        firebase.auth().signInAnonymously()
          .then(() => {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                var uid = user.uid;
                this.setState({ uid });
                localStorage.setItem('chooseoneUid', uid);

                var new_user = {
                  email: '',
                  uid: uid,
                  created_at: datetime,
                  question_answered: [],
                  question_created: [],
                  question_liked: [],
                  username: '',
                };
                db.collection('users').doc(uid).set(new_user).then(() => {
                  this.setState({ uid: new_user });
                });
              }
            });          
          })
      }else{
        this.setState({ uid: lc });
      }
    }
  }

  render () {

    const { uid } = this.state;
    
    return (
      <Fragment>
        <Router>
          <div>
            <meta charSet="utf-8" />
            <title>ChooseOne</title>
            <meta name="description" content="{% block description %}ChooseOne{% endblock %}" />
            <meta name="keywords" content="{% block keywords %}ChooseOne{% endblock %}" />
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
          <div style={styles.background}>
            <Header/>
            <div style={styles.wrapper}>
              <div style={styles.container} className='container'>
                <div style={styles.home_container} className='home-container'>
                  <Switch>
                    <Route path="/detail/:the_slug" render={ (props) => <QuestionDetail uid={uid} {...props} /> } />
                    <Route path="/result/:the_slug" render={ (props) => <QuestionResult uid={uid} {...props} /> } />
                    <Route path="/" render={ () => <App uid={uid}/> } />
                  </Switch>
                  <Footer/>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </Fragment>
    );
  }
}

const styles = {
  wrapper: {
    minHeight: window.innerHeight-30,
    position: 'relative',/*←相対位置*/
    paddingBottom: 170,/*←footerの高さ*/
    boxSizing: 'border-box',/*←全て含めてmin-height:100vhに*/
  },
  background: {
    backgroundColor: '#f1efef',
  },
  home_container: {
    display: 'flex',
  },
  container: {
    paddingTop: 15,
    paddingBottom: 30,
  },
}

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
