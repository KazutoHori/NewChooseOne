import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuestionList from '../components/QuestionList';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import ModalDelete from '../components/ModalDelete';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
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

var tabColors = ['#ff69b4']
for(var i=1; i<11; i++) tabColors.push('hsla('+(i*100)+', 75%, 55%, 1)');

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

export default class QuestionResult extends Component {

  constructor(props){
    super(props);

    this.state = {
      modalVisible: false,
      user: null,
      madeIt: null,
      the_question: null,
      your_vote: null,
      likeIt: false,
      choicesSorted: [],
      labels: [],
      values: [],
      colors: [],
    }
  }

  async componentDidMount() {
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

    for(var i=0; i<user.question_answered.length; i++){
      if(user.question_answered[i].question === the_slug) this.setState({ your_vote: user.question_answered[i].answer })
    }

    var the_question = null
    await db.collection('questions').doc(the_slug).get().then((doc) => {
      if(doc.exists){
        the_question = doc.data()
        this.setState({ the_question: doc.data() })
      }else{
        window.location.href = '/';
      }
    });

    var copy=Array.from(the_question.choices);
    copy.sort(function(first, second){
      if (first.votes > second.votes){
        return -1;
      }else if (first.votes < second.votes){
        return 1;
      }else{
        return 0;
      }
    });
    this.setState({ choicesSorted: copy });
    var l = [];
    var v = [];
    var c = [];

    for(let i=0; i<copy.length;  i++){
      l.push(copy[i].choice_text);
      v.push(copy[i].votes);
    }

    var time = the_question.created_at;
    var seconds = parseInt(time.slice(-2));
    if(v !== []){
      v.forEach((entry, idx) => {
        c.push('hsla('+((idx+seconds)*70)+',75%,75%,1)');
      });
    }
    this.setState({ labels: l, values: v, colors: c });
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

  onDelete = () => {
    const { the_choice, user, the_question } = this.state;

    db.collection("questions").doc(the_question.slug).delete();
    db.collection("users").doc(user.uid).update({
      question_created: firebase.firestore.FieldValue.arrayRemove(the_question.slug)
    })

    window.location.href = "/";
  }

  onClose = () => {
    this.setState({ modalVisible: false });
  }

  render() {
    const { madeIt, likeIt, the_question, your_vote, modalVisible, choicesSorted,
        labels, values, colors } = this.state;

    return (
      <Fragment>
        <div style={styles.resultsPos}>

          {/* カテゴリー */}
          <p className='cali2'><span className="text-primary fa fa-tag" />
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
          <h3 className="cali2">{the_question ? the_question.title : <SkeletonTheme color="white" highlightColor="#444"><Skeleton width={1000} height={7}  /></SkeletonTheme>}</h3>
          <p style={styles.date}>
            {the_question ? the_question.created_on : <SkeletonTheme color="white" highlightColor="#444"><Skeleton color='white' width={100} height={7}/></SkeletonTheme> }
          </p>
          
          <div style={{ marginLeft: 10, }}>
            <p style={styles.your_vote}>You have voted for {your_vote}</p>
          </div>
          <div style={{ marginLeft: 10, }}>
            <a style={{ marginRight: 10, color: '#55acee', outline: 'none', border: 'none' }} className='tip' href={the_question && 'https://twitter.com/share?url=https://www.chooseone.app/'+the_question.slug+"/&text="+the_question.title} target="_blank" data-toggle="tooltip" title="Share"><TwitterIcon /></a>
            <a style={{ color: '#3B5998', outline: 'none', border: 'none' }} href={the_question && "https://www.facebook.com/share.php?u=https://www.chooseone.app/"+the_question.slug} target="_blank" data-toggle="tooltip" title="Share"><FacebookIcon /></a>
          </div>

          {/* テーブル */}
          {the_question && (
            <table style={styles.table} className='table'>
              <thead>
                <tr>
                  <td />
                  <td>Choices</td>
                  <td>Votes</td>
                </tr>
              </thead>
              <tbody>
                <Fragment>
                  {choicesSorted.map((choice, idx) => (
                    <tr style={{ backgroundColor: colors[idx] }} >
                      <th scope="row">&nbsp;&nbsp;{idx+1}</th>
                      <td >{choice.choice_text}</td>
                      <td>{choice.votes}</td>
                    </tr>
                  ))}
                </Fragment>
              </tbody>
            </table>
          )}
          {!the_question && (
            <table style={styles.table} className='table'>
              <thead>
                <tr>
                  <td />
                  <td>Choices</td>
                  <td>Votes</td>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: 'rgb(238, 238, 143)' }} >
                  <th scope="row">&nbsp;&nbsp;{1}</th>
                  <td ><SkeletonTheme color="white" highlightColor="#444"><Skeleton width={60} height={10}/></SkeletonTheme></td>
                  <td><SkeletonTheme color="white" highlightColor="#444"><Skeleton width={60} height={10}/></SkeletonTheme></td>
                </tr>
                <tr style={{ backgroundColor: 'rgb(143, 240, 159)' }} >
                  <th scope="row">&nbsp;&nbsp;{1}</th>
                  <td ><SkeletonTheme color="white" highlightColor="#444"><Skeleton width={60} height={10}/></SkeletonTheme></td>
                  <td><SkeletonTheme color="white" highlightColor="#444"><Skeleton width={60} height={10}/></SkeletonTheme></td>
                </tr>
                <tr style={{ backgroundColor: 'rgb(143, 207, 239)' }} >
                  <th scope="row">&nbsp;&nbsp;{1}</th>
                  <td ><SkeletonTheme color="white" highlightColor="#444"><Skeleton width={60} height={10}/></SkeletonTheme></td>
                  <td><SkeletonTheme color="white" highlightColor="#444"><Skeleton width={60} height={10}/></SkeletonTheme></td>
                </tr>
                <tr style={{ backgroundColor: 'rgb(239, 144, 175)' }} >
                  <th scope="row">&nbsp;&nbsp;{1}</th>
                  <td ><SkeletonTheme color="white" highlightColor="#444"><Skeleton width={60} height={10}/></SkeletonTheme> </td>
                  <td><SkeletonTheme color="white" highlightColor="#444"><Skeleton width={60} height={10}/></SkeletonTheme> </td>
                </tr>
              </tbody>
            </table>
          )}

          {/* グラフ */}
          <div style={styles.graphs}>
            {the_question && <div style={styles.pieGraph}><PieChart skeleton={false} labels={labels} values={values} colors={colors} /></div>}
            {!the_question && <div style={styles.pieGraph}><PieChart skeleton labels={['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4']} values={[40, 20, 10, 10 ]} colors={['rgb(238, 238, 143)', 'rgb(143, 240, 159)', 'rgb(143, 207, 239)', 'rgb(239, 144, 175)' ]} /></div>}
            {the_question && <div style={styles.barGraph}><BarChart skeleton={false} labels={labels} values={values} colors={colors} /></div>}
            {!the_question && <div style={styles.barGraph}><BarChart skeleton labels={['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4']} values={[40, 20, 10, 10 ]} colors={['rgb(238, 238, 143)', 'rgb(143, 240, 159)', 'rgb(143, 207, 239)', 'rgb(239, 144, 175)' ]} /></div>}
          </div>

          {/* ボタン系 */}
          <div style={styles.buttonsPos}>
            <ThemeProvider theme={theme}>
              <ButtonGroup variant="contained" >
                {!likeIt && <Button onClick={this.onLikeit} startIcon={<FavoriteIcon />} color='primary' >Like</Button>}
                {likeIt && <Button onClick={this.onLikeit} startIcon={<FavoriteIcon color='secondary' />} color='primary' >Like</Button>}
                <Button onClick={() => this.setState({ modalVisible: true })} startIcon={<DeleteIcon />} color='secondary' >Delete</Button>
              </ButtonGroup>
            </ThemeProvider>
          </div>

          {/* 似ている投稿 */}
          <div>
            <h3 className='cali'>Questions You May Like</h3>
            <QuestionList questions={[]} />
            {/* {questions == [] && ( */}
              <pre>There are no similar posts yet.</pre>
            {/* )} */}
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

    for(var i=0; i<user.question_answered.length; i++){
      if(user.question_answered[i].question === the_slug) this.setState({ your_vote: user.question_answered[i].answer })
    }

    var the_question = null
    await db.collection('questions').doc(the_slug).get().then((doc) => {
      if(doc.exists){
        the_question = doc.data()
        this.setState({ the_question: doc.data() })
      }else{
        window.location.href = '/';
      }
    });

    var copy=Array.from(the_question.choices);
    copy.sort(function(first, second){
      if (first.votes > second.votes){
        return -1;
      }else if (first.votes < second.votes){
        return 1;
      }else{
        return 0;
      }
    });
    this.setState({ choicesSorted: copy });
    var l = [];
    var v = [];
    var c = [];

    for(let i=0; i<copy.length;  i++){
      l.push(copy[i].choice_text);
      v.push(copy[i].votes);
    }

    var time = the_question.created_at;
    var seconds = parseInt(time.slice(-2));
    if(v !== []){
      v.forEach((entry, idx) => {
        c.push('hsla('+((idx+seconds)*70)+',75%,75%,1)');
      });
    }
    this.setState({ labels: l, values: v, colors: c });
  }
}

const styles = {
  table: {
    filter: 'drop-shadow(0px 0px 5px rgba(160, 160, 160, 0.7))',
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: 'white',
    width: '100%',
  },
  graphs: {
    display: 'flex',
    width: '100%',
    marginBottom: 15,
  },
  pieGraph: {
    filter: 'drop-shadow(0px 0px 5px rgba(160, 160, 160, 0.7))',
    borderRadius: 15,
    padding: 10,
    width: '49%',
    backgroundColor: 'white',
    height: 400,
    marginRight: 10,
  },
  barGraph: {
    filter: 'drop-shadow(0px 0px 5px rgba(160, 160, 160, 0.7))',
    borderRadius: 15,
    padding: 10,
    width: '50%',
    backgroundColor: 'white',
    height: 400,
  },
  your_vote: {
    fontSize: 10,
    color: 'yellowgreen',
    fontSize: 14,
  },
  resultsPos: {
    paddingTop: 15,
    width: '100%',
    paddingBottom: 30,
  },
  date: {
    marginLeft: 20,
    fontFamily: 'georgia, serif',
    fontSize: 12,
    color: '#457AFB',
  },
}
