import React, { useEffect, useState, Fragment } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Helmet } from "react-helmet";

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { makeStyles, createStyles } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { WindMillLoading } from 'react-loadingg';

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

export default function QuestionDetail (props) {

  const uid = props.uid;
  const the_slug = props.match.params.the_slug;
  const [modalVisible, setModalVisible] = useState(false);
  const [warning, setWarning] = useState(null);
  const [the_choice, setTheChoice] = useState(null);
  const [user, setUser] = useState(null);
  const [madeIt, setMadeIt] = useState(null);
  const [the_question, setTheQuestion] = useState(null);
  const [likeIt, setLikeIt] = useState(false);
  const [pushed, setPushed] = useState(false);
  const styles = useStyles();
  const smallDisplay = useMediaQuery('(max-width:500px)');
  var choiceSkeleton = [];
  for(var i=0; i<(5-smallDisplay*2); i++){
    choiceSkeleton.push(<div style={{ marginLeft: 30, marginTop: 15 }}><SkeletonTheme Primarycolor="white" highlightColor="#d3d3d3"><Skeleton duration={2} color='white' width={100} height={15 - smallDisplay*5}/></SkeletonTheme></div>)
  }
  var content = '';
  if(the_question){
    for(var i=0; i<the_question.choices.length; i++){
      if(i) content += the_question.choices[i].choice_text;
      else content += ' vs ' + the_question.choices[i].choice_text;
    }
  }


  useEffect(() => {
    if(uid === null || user !== null) return null;

    db.collection('users').doc(uid).get().then((doc) => {
      var the_user = doc.data();
      if(the_user.question_voted.some((q) => q.question === the_slug)) window.location.href = '/result/'+the_slug;
      else{
        setUser(the_user);

        if (the_user.question_liked.includes(the_slug)){
          setLikeIt(true);
        }else{
          setLikeIt(false);
        }

        if (the_user.question_created.includes(the_slug)){
          setMadeIt(true);
        }else{
          setMadeIt(false);
        }

        db.collection('questions').doc(the_slug).get().then((doc) => {
          if(doc.exists){
            setTheQuestion(doc.data())
          }else{
            window.location.href = '/';
          }
        })
      }
    })
  });
  

  const onVote = async () => {
    if(the_choice === null){
      setWarning('You have not chosen yet');
      setTimeout(() => setWarning(''),2500);
      return null;
    }
    if(pushed) return null;
    setPushed(true);
    var the_slug = the_question.slug;
    var your_vote = the_question.choices[the_choice].choice_text;
    var copy = the_question.choices.slice();

    copy[the_choice].votes=parseInt(copy[the_choice].votes, 10)+1;

    await db.collection('questions').doc(the_slug).update({
      choices: copy
    });

    await db.collection('questions').doc(the_slug).update({
      all_votes: firebase.firestore.FieldValue.increment(1)
    })

    await db.collection('users').doc(user.uid).update({
      question_voted: firebase.firestore.FieldValue.arrayUnion({ question: the_slug, answer: your_vote}) },
    );

    await db.collection('questions').doc(the_slug).update({
      users_voted: firebase.firestore.FieldValue.arrayUnion(user.uid) },
    );

    window.location.href = "/result/" + the_slug;
  }

  const onLikeit = () => {

    if(likeIt){
      setLikeIt(false);
      db.collection("users").doc(user.uid).update({
        question_liked: firebase.firestore.FieldValue.arrayRemove(the_question.slug)
      });
      db.collection("questions").doc(the_question.slug).update({
        likes: firebase.firestore.FieldValue.increment(-1)
      });
      setTheQuestion({ ...the_question, likes: the_question.likes-1 })
    }else{
      setLikeIt(true);
      db.collection("users").doc(user.uid).update({
        question_liked: firebase.firestore.FieldValue.arrayUnion(the_question.slug)
      });
      db.collection("questions").doc(the_question.slug).update({
        likes: firebase.firestore.FieldValue.increment(1)
      });
      setTheQuestion({ ...the_question, likes: the_question.likes+1 })
    }
  }

  const onDelete = async () => {
    await db.collection("questions").doc(the_question.slug).delete();
    await db.collection("users").doc(user.uid).update({
      question_created: firebase.firestore.FieldValue.arrayRemove(the_question.slug)
    })

    window.location.href = "/";
  }

  const onClose = () => {
    setModalVisible(false);
  }

  return (
    <Fragment>
      <Helmet
          title = {the_question && the_question.title + ' - ChooseOne'}
          meta={[
            { name: 'description', content: { content } }
          ]}
      />
      <div className={styles.detailPos}>

        <div className={styles.forSmallerVer}>
          {/* カテゴリー */}
          <p className={styles.category}><span className="text-primary fa fa-tag" />
            Category:
            {the_question && (
              <Fragment>
                {the_question.category.map((cate, idx) => {
                  if ( idx === 0){
                    return (<a className='text-primary' href={'/category/'+cate}> {cate}</a>)
                  }else{
                    return (<a className='text-primary' href={'/category/'+cate}>, {cate}</a>)
                  }
                })}
              </Fragment>
            )}
            {!the_question && <Skeleton style={{ marginLeft: 10 }} width={60} />}
          </p>

          {/* タイトル */}
          <h3 className={styles.title}>{the_question ? the_question.title : <SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2}  width={1000 - smallDisplay*720} height={20}  /></SkeletonTheme>}</h3>
          <p className={styles.date}>
            {the_question ? the_question.created_on : <SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton color='white' duration={2}  width={50} height={7}/></SkeletonTheme> }
          </p>
        </div>

        {/* モーダル */}
        {modalVisible &&  <ModalDelete onClose={onClose} onDelete={onDelete} />}

        {/* 選択肢 */}
        <Fragment>
          {the_question && (
            <Fragment>
              {the_question.choices.map((choice, idx) => (
                <div className={styles.choiceBtnPos}>
                  {idx !== the_choice && <button onClick={() => setTheChoice(idx)} style={{ borderRadius: 15 }} type="button" name="choice" className="btn btn-outline-primary">{choice.choice_text}</button>}
                  {idx === the_choice && <button onClick={() => setTheChoice(idx)} style={{ borderRadius: 15 }} type="button" name="choice" className="btn btn-primary">{choice.choice_text}</button>}
                </div>
              ))}
            </Fragment>
          )}
          {!the_question && [choiceSkeleton]}
          {warning !== null && (<p className={styles.warning}>{warning}</p>)}
          {!pushed ?
            <div className={styles.voteBtnPos}>
              <Button startIcon={<ThumbUpAltIcon />}  onClick={onVote} style={{ borderRadius: 10 }} className='btn btn-success'>Vote</Button>
            </div>
            :
            <div>
              <WindMillLoading style={{ position: 'relative', marginTop: 50-smallDisplay*30, marginLeft: 50,}} size={smallDisplay ? 'small' : 'large'} speed={1} />
            </div>
          }
        </Fragment>

        {/* ボタン系 */}
        <div className={styles.buttonsPos}>
          <ThemeProvider theme={theme}>
            <ButtonGroup size={smallDisplay ? 'small' : 'default'} variant="contained" >
              {!likeIt && <Button onClick={onLikeit} startIcon={<FavoriteIcon />} color='primary' >{the_question ? the_question.likes : 'Like'}</Button>}
              {likeIt && <Button onClick={onLikeit} startIcon={<FavoriteIcon color='secondary' />} color='primary' >{the_question ? the_question.likes : 'Like'}</Button>}
              {madeIt && <Button onClick={() => setModalVisible(true)} startIcon={<DeleteIcon />} color='secondary' >Delete</Button>}
            </ButtonGroup>
          </ThemeProvider>
        </div>
      </div>
    </Fragment>
  )
}

const useStyles = makeStyles(() => createStyles({
  category: {
    fontFamily: 'latienne-pro, serif',
    fontStyle: 'normal',
    fontWeight: 400,
  },
  title: {
    fontFamily: 'latienne-pro, serif',
    fontStyle: 'normal',
    fontWeight: 500,
  },
  buttonsPos: {
    marginTop: 100,
  },
  date: {
    marginLeft: 20,
    fontFamily: 'georgia, serif',
    fontSize: 10,
    color: '#457AFB',
  },
  the_choice: {
    marginLeft: 0,
  },
  choiceBtnPos: {
    marginLeft: 25,
    marginBottom: 8,
    fontSize: 12,
  },
  voteBtnPos: {
    marginTop: 20,
    marginLeft: 25,
  },
  buttons: {
    borderRadius: 30,
  },

  warning: {
    color: 'red',
    fontSize: 10,
    margin: '0px 0px 0px 25px',
    padding: 0,
  },

  '@media (max-width: 500px)': {
    voteBtnPos: {
      marginLeft: 15,
    },
    choiceBtnPos: {
      marginLeft: 35,
    },
    forSmallerVer: {
      paddingLeft: 15,
      marginTop: 10,
    },
    category: {
      fontSize: 12,
    },
    title: {
      fontSize: 24,
    },
    buttonsPos: {
      marginLeft: 15,
    },
  }
}));
