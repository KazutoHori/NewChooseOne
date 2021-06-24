import React, { Component, Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuestionList from '../components/QuestionList';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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

    if(uid === null || this.state.the_question !== null) return null;

    var user = {};
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

    var the_question = null
    await db.collection('questions').doc(the_slug).get().then((doc) => {
      if(doc.exists){
        the_question = doc.data()
        this.setState({ the_question: doc.data() })
      }else{
        //TODO  ホームに戻る
      }
    });

    if(the_question){
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

      // Chart.defaults.global.barPercentage=1.0;
      var time = the_question.created_at
      var seconds = time[-2]+time[-1]
      if(v !== []){
        v.forEach((entry, idx) => { // generate some colors
          c.push('hsla('+((idx+seconds)*70)+',75%,75%,1)');
        });
      }
      this.setState({ labels: l, values: v, colors: c });
    }
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

    if(the_question === null){
      return <Loading type='bars' color='#714' />
    }

    return (
      <Fragment>
        <div style={styles.resultsPos}>

          {/* カテゴリー */}
          <p><span className="text-primary fa fa-tag" />
            Category:
            {the_question.category.map((cate, idx) => {
              var len = the_question.category.length;
              if ( idx === len-1){
                return (
                  <a class='text-primary' href="/category/">{cate}, </a>
                )
              }else{
                <a class='text-primary' href="/category/">{cate}</a>
              }
            })}
          </p>

          {/* モーダル */}
          {modalVisible &&  <ModalDelete onClose={this.onClose} onDelete={this.onDelete} />}

          {/* タイトル */}
          <h3 className="cali2">{the_question.title}</h3>
          <p style={styles.date}>
            {the_question.created_on}
          </p>
          
          <div>
            <p style={styles.your_vote}>You have voted for {your_vote}</p>
          </div>
          <div>
            <a className="tip" href={'https://twitter.com/share?url=https://www.chooseone.app/'+the_question.slug+"/&text="+the_question.title} rel="nofollow" target="_blank"><img src="https://img.icons8.com/color/35/000000/twitter-circled.png" /><span>Share</span></a>
            <a className="tip" href={"https://www.facebook.com/share.php?u=https://www.chooseone.app/"+the_question.slug} rel="nofollow" target="_blank"><img src="https://img.icons8.com/fluent/35/000000/facebook-new.png" /><span>Share</span></a>
            <a className="tip" href={"https://social-plugins.line.me/lineit/share?url=https://www.chooseone.app/"+the_question.slug} target="_blank" rel="nofollow"><img src="https://img.icons8.com/color/35/000000/line-me.png" /><span>Share</span></a>
          </div>
          <style dangerouslySetInnerHTML={{__html: "\n        a.tip span { display: none; padding:3px 5px; margin-top: 30px; margin-left: -20px; font-size: 7px;}\n        a.tip:hover span {display:inline; position:absolute; border-radius: 10px; background:#ffffff; border:1px solid #cccccc; color:#6c6c6c;}\n      " }} />

          {/* テーブル */}
          <table style={styles.table} className='table'>
            <thead>
              <tr>
                <td />
                <td>Choices</td>
                <td>Votes</td>
              </tr>
            </thead>
            <tbody>
              {choicesSorted.map((choice, idx) => (
                <tr style={{ backgroundColor: colors[idx] }} >
                  <th scope="row">&nbsp;&nbsp;{idx+1}</th>
                  <td >{choice.choice_text}</td>
                  <td>{choice.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* グラフ */}
          <div style={styles.graphs}>
            <div style={styles.pieGraph}><PieChart labels={labels} values={values} colors={colors} /></div>
            <div style={styles.barGraph}><BarChart labels={labels} values={values} colors={colors} /></div>
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
            <h3>Questions You May Like</h3>
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

    var the_question = null
    await db.collection('questions').doc(the_slug).get().then((doc) => {
      if(doc.exists){
        the_question = doc.data()
        this.setState({ the_question: doc.data() })
      }else{
        //TODO  ホームに戻る
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

    // Chart.defaults.global.barPercentage=1.0;
    var time = the_question.created_at;
    var seconds = parseInt(time.slice(-2));
    if(v !== []){
      v.forEach((entry, idx) => { // generate some colors
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
