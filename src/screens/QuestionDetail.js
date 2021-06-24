import React, { Component, Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import ModalDelete from '../components/ModalDelete';
import '../App.scss';

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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(3, 122, 255)',
    },
    secondary: {
      main: '#f50057',
    },
    green: {
      main: 'rgb(40, 168, 69)',
    }
  },
});

export default class QuestionDetail extends Component {

  constructor(props){
    super(props);

    this.state = {
      modalVisible: false,
      warning: null,
      the_choice: null,
      user: null,
      madeIt: null,
      the_question: null,
      likeIt: false,
    }
  }

  async componentDidMount() {
    const { uid } = this.props;
    const { the_slug } = this.props.match.params;
    if(uid === null || this.state.the_question !== null) return null;

    var user = {}
    await db.collection('users').doc(uid).get().then((doc) => {
      if(doc.exists){
        user = doc.data()
        this.setState({ user: doc.data() })
      }
    })
    
    if (user.question_liked.includes(the_slug)){
      this.setState({ likeIt: true });
    }else{
      this.setState({ likeIt: false });
    }

    if (user.question_created.includes(the_slug)){
      this.setState({ madeIt: true });
    }else{
      this.setState({ madeIt: false });
    }

    await db.collection('questions').doc(the_slug).get().then((doc) => {
      if(doc.exists){
        this.setState({ the_question: doc.data() })
      }else{
        //TODO  ホームに戻る
      }
    })
  }
  

  onVote = async () => {
    const { the_choice, user, the_question } = this.state;

    if(the_choice === null){
      this.setState({ warning: 'You have not chosen yet'});
      setTimeout(() => this.setState({ warning: ''}),2500);
      return null;
    }

    var the_slug = the_question.slug;
    var your_vote = the_question.choices[the_choice].choice_text;
    var copy=Array.from(the_question.choices);
    var remove_data = Object.assign({}, copy[the_choice]);
    var add_data = {
      choice_text: copy[the_choice].choice_text,
      votes: parseInt(copy[the_choice].votes, 10)+1,
    };

    copy[the_choice].votes=parseInt(copy[the_choice].votes, 10)+1;
    the_question.choices=copy;

    db.collection('questions').doc(the_slug).update({
      choices: firebase.firestore.FieldValue.arrayRemove(remove_data)
    });
    db.collection('questions').doc(the_slug).update({
      choices: firebase.firestore.FieldValue.arrayUnion(add_data)
    });
    db.collection('questions').doc(the_slug).update({
      all_votes: firebase.firestore.FieldValue.increment(1)
    })

    await db.collection('users').doc(user.uid).set({
      question_answered: firebase.firestore.FieldValue.arrayUnion({ question: the_slug, answer: your_vote}) },
      { merge: true}
    );

    await db.collection('questions').doc(the_slug).set({
      users_answered: firebase.firestore.FieldValue.arrayUnion(user.uid) },
      { merge: true }
    );

    window.location.href = "/result/" + the_slug;
  }

  onLikeit = () => {
    const { likeIt, user, the_question } = this.state;
    if(likeIt){
      this.setState({ likeIt: false });
      db.collection("users").doc(user.uid).update({
        question_liked: firebase.firestore.FieldValue.arrayRemove(the_question.slug)
      });
    }else{
      this.setState({ likeIt: true });
      db.collection("users").doc(user.uid).update({
        question_liked: firebase.firestore.FieldValue.arrayUnion(the_question.slug)
      });
    }
  }

  onDelete = async () => {
    const { the_choice, user, the_question } = this.state;
    await db.collection("questions").doc(the_question.slug).delete();
    await db.collection("users").doc(user.uid).update({
      question_created: firebase.firestore.FieldValue.arrayRemove(the_question.slug)
    })

    window.location.href = "/";
  }

  onClose = () => {
    this.setState({ modalVisible: false });
  }

  render() {
    const { likeIt, modalVisible, madeIt, the_choice, warning, the_question } = this.state;

    var choiceSkeleton = [];
    for(var i=0; i<5; i++){
      choiceSkeleton.push(<div style={{ marginLeft: 30, marginTop: 40 }}><SkeletonTheme Primarycolor="white" highlightColor="#d3d3d3"><Skeleton duration={2} color='white' width={180} height={7}/></SkeletonTheme></div>)
    }


    return (
      <Fragment>
        <div style={styles.detailPos}>
          {/* カテゴリー */}
          <p className="cali2"><span className="text-primary fa fa-tag" />
            Category:
            {the_question && (
              <Fragment>
                {the_question.category.map((cate, idx) => {
                  var len = the_question.category.length;
                  if ( idx === 0){
                    return (
                      <a class='text-primary' href={'/category/'+cate}> {cate}</a>
                    )
                  }else{
                    <a class='text-primary' href={'/category/'+cate}>, {cate}</a>
                  }
                })}
              </Fragment>
            )}
          </p>

          {/* モーダル */}
          {modalVisible &&  <ModalDelete onClose={this.onClose} onDelete={this.onDelete} />}

          {/* タイトル */}
          <h3 className="cali2">{the_question ? the_question.title : <SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2}  width={1000} height={7}  /></SkeletonTheme>}</h3>
          <p style={styles.date}>
            {the_question ? the_question.created_on : <SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton color='white' duration={2}  width={100} height={7}/></SkeletonTheme> }
          </p>

          {/* 選択肢 */}
          <Fragment>
            {the_question && (
              <Fragment>
                {the_question.choices.map((choice, idx) => (
                  <div style={styles.choiceBtnPos}>
                    {idx !== the_choice && <button onClick={() => this.setState({ the_choice: idx })} style={styles.roundBtn} type="button" name="choice" className="btn btn-outline-primary">{choice.choice_text}</button>}
                    {idx === the_choice && <button onClick={() => this.setState({ the_choice: idx })} style={styles.roundBtn} type="button" name="choice" className="btn btn-primary">{choice.choice_text}</button>}
                  </div>
                ))}
              </Fragment>
            )}
            {!the_question && [choiceSkeleton]}
            {warning && (<p>{warning}</p>)}
            <div style={styles.voteBtnPos}>
              <Button startIcon={<ThumbUpAltIcon />}  onClick={this.onVote} style={styles.roundBtn} className='btn btn-success'>Vote</Button>
            </div>
          </Fragment>

          {/* 削除ボタン */}
          <div style={styles.buttonsPos}>
            <ThemeProvider theme={theme}>
              <ButtonGroup variant="contained" >
                {!likeIt && <Button onClick={this.onLikeit} startIcon={<FavoriteIcon />} color='primary' >Like</Button>}
                {likeIt && <Button onClick={this.onLikeit} startIcon={<FavoriteIcon color='secondary' />} color='primary' >Like</Button>}
                <Button onClick={() => this.setState({ modalVisible: true })} startIcon={<DeleteIcon />} color='secondary' >Delete</Button>
              </ButtonGroup>
            </ThemeProvider>
          </div>
        </div>
      </Fragment>
    )
  }

  async componentDidUpdate() {
    const { uid } = this.props;
    const { the_slug } = this.props.match.params;
    if(uid === null || this.state.user !== null) return null;

    var user = {}
    await db.collection('users').doc(uid).get().then((doc) => {
      if(doc.exists){
        user = doc.data()
        this.setState({ user: doc.data() })
      }
    })

    if (user.question_liked.includes(the_slug)){
      this.setState({ likeIt: true });
    }else{
      this.setState({ likeIt: false });
    }

    if (user.question_created.includes(the_slug)){
      this.setState({ madeIt: true });
    }else{
      this.setState({ madeIt: false });
    }

    await db.collection('questions').doc(the_slug).get().then((doc) => {
      if(doc.exists){
        this.setState({ the_question: doc.data() })
      }else{
        //TODO  ホームに戻る
      }
    })
  }
}

const styles = {
  buttonsPos: {
    position: 'absolute',
    bottom: 210,
  },
  date: {
    marginLeft: 20,
    fontFamily: 'georgia, serif',
    fontSize: 12,
    color: '#457AFB',
  },
  the_choice: {
    marginLeft: 0,
  },
  roundBtn: {
    borderRadius: 15,
  },
  choiceBtnPos: {
    marginLeft: 25,
    marginBottom: 8,
    fontSize: 12,
  },
  your_vote: {
    fontSize: 13,
    marginLeft: 5,
    color: 'yellowgreen',
  },
  voteBtnPos: {
    marginTop: 20,
    marginLeft: 25,
  },
  buttons: {
    borderRadius: 30,
  },
}
