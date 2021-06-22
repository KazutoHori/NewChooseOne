import React, { Component, Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../App.scss';

import Modal from '../components/Modal';

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

export default class QuestionDetail extends Component {

  constructor(props){
    super(props);

    this.state = {
      warning: null,
      choice: null,
      user: null,
      madeIt: null,
      the_question: null,
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

    // ここではやんない
    // var c = true;
    // for(var i=0; i<user.question_answered.length; i++){
    //   if (user.question_answered[i].question === the_slug){
    //     c = false;
    //     this.setState({ madeIt: true });
    //   }
    // }

    if (!user.question_created.includes(the_slug)){
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
    const { choice, user, the_question } = this.state;

    if(choice === null){
      this.setState({ warning: 'You have not chosen yet'});
      setTimeout(() => this.setState({ warning: ''}),2500);
      return null;
    }

    var the_slug = the_question.slug;
    var your_vote = the_question.choices[choice].choice_text;
    var copy=Array.from(the_question.choices);
    var remove_data = Object.assign({}, copy[choice]);
    var add_data = {
      choice_text: copy[choice].choice_text,
      votes: parseInt(copy[choice].votes, 10)+1,
    };

    copy[choice].votes=parseInt(copy[choice].votes, 10)+1;
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

    // navigate('QuestionResult', { from_where: from_where, question: question, your_vote: your_vote })
  }

  render() {
    const { madeIt, choice, warning, the_question } = this.state;

    if (the_question === null){
      return (
        <div><h1>Helo</h1></div>
      )
    }
    // console.log(choice)

    return (
      <Fragment>
        <div style={styles.detail_container} className="detail_container">
          {/* カテゴリー */}
          <p className="center"><span className="text-primary fa fa-tag" />
            Category:  
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
          </p>

          {/* モーダル */}
          <Modal />

          {/* タイトル */}
          <h3 className="center">{the_question.title}</h3>
          <p className="date center">
            Created： {the_question.created_on}
          </p>

          {/* 選択肢 */}
          <form method="post">
            {the_question.choices.map((choice, idx) => (
              <div className="btn-choice">
                <button onClick={() => this.setState({ choice: idx })} style={styles.radio} type="button" name="choice" className="btn-choice radio btn btn-outline-primary">{choice.choice_text}</button>
              </div>
            ))}
            <input style={styles.vote_btn} className="btn btn-success vote_btn disabledInput" id="value" type="submit" name="vote" disabled value="Choose One" />
          </form>

          {/* 削除ボタン */}
          <div className="buttons_normal fixed">
            <form method="post">
              <button style={styles.buttons} className="btn btn-primary likeit" type="submit" name="likeit"><img src="https://img.icons8.com/fluent/20/000000/filled-like.png" /> Like</button>
            </form>
            {madeIt && (
              <button style={styles.buttons} className="btn btn-danger delete" type="button" data-toggle="modal"><img src="https://img.icons8.com/plasticine/20/000000/delete-forever.png" /> Delete</button>
            )}
          </div>
          <div className="buttons_small buttons_detail">
            {madeIt &&　(
              <Fragment>
                <form method="post">
                  <button style={styles.buttons} className="btn btn-primary likeit" type="submit" name="likeit"><img src="https://img.icons8.com/fluent/15/000000/filled-like.png" /> Like</button>
                </form>
                <button className="btn btn-danger delete" type="button" data-toggle="modal"><img src="https://img.icons8.com/plasticine/15/000000/delete-forever.png" /> Delete</button>
              </Fragment>
            )}
            {!madeIt && (
              <form method="post">
                <button className="btn btn-primary likeit button_center" type="submit" name="likeit"><img src="https://img.icons8.com/fluent/15/000000/filled-like.png" /> Like</button>
              </form>
            )}
          </div>
        </div>
      </Fragment>
    )
  }
}

const styles = {
  radio: {
    borderRadius: 15,
  },
  your_vote: {
    fontSize: 13,
    marginLeft: 5,
    color: 'yellowgreen',
  },
  detail_container: {
    paddingTop: 15,
    alignSelf: 'stretch',
    paddingBottom: 30,
    fontFamily: 'latienne-pro, serif',
    fontStyle: 'normal',
    fontWeight: 400,
  },
  vote_btn: {
    borderRadius: 15,
  },
  buttons: {
    borderRadius: 30,
  }
}
