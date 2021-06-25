import React, { useEffect, useState, Fragment } from 'react';
import QuestionList from '../components/QuestionList';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles, createStyles } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { WindMillLoading } from 'react-loadingg';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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

export default function QuestionResult (props) {

  const uid = props.uid;
  const the_slug = props.match.params.the_slug;

  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [madeIt, setMadeIt] = useState(null);
  const [the_question, setTheQuestion] = useState(null);
  const [likeIt, setLikeIt] = useState(false);
  const [your_vote, setYourVote] = useState(null);
  const [choicesSorted, setChoiceSorted] = useState([]);
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [colors, setColors] = useState([]);
  const [relatedQues, setRelatedQues] = useState([]);

  const notUseSkeleton = relatedQues.length !== 0;
  const styles = useStyles();
  const smallDisplay = useMediaQuery('(max-width:500px)');

  useEffect(() => {
    if(uid === null || the_question !== null) return null;

    db.collection('users').doc(uid).get().then((doc) => {
      if(doc.exists){
        var the_user = doc.data()
        if(!the_user.question_answered.some((q) => q.question === the_slug)) window.location.href = '/detail/'+the_slug;
        else{
          setUser(the_user)

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

          for(var i=0; i<the_user.question_answered.length; i++){
            if(the_user.question_answered[i].question === the_slug) setYourVote(the_user.question_answered[i].answer)
          }
        }
      }
    })


    db.collection('questions').doc(the_slug).get().then((doc) => {
      if(doc.exists){
        setTheQuestion(doc.data())
        var now_question = doc.data()

        var copy=Array.from(now_question.choices);
        copy.sort(function(first, second){
          if (first.votes > second.votes){
            return -1;
          }else if (first.votes < second.votes){
            return 1;
          }else{
            return 0;
          }
        });
        setChoiceSorted(copy);
        var l = [];
        var v = [];
        var c = [];

        for(let i=0; i<copy.length;  i++){
          l.push(copy[i].choice_text);
          v.push(copy[i].votes);
        }

        var time = now_question.created_at;
        var seconds = parseInt(time.slice(-2));
        if(v !== []){
          v.forEach((entry, idx) => {
            c.push('hsla('+((idx+seconds)*70)+',75%,75%,1)');
          });
        }
        setLabels(l);
        setValues(v);
        setColors(c);
        
        db.collection('questions').where('category', 'array-contains-any', now_question.category).orderBy('created_at', 'desc').limit(50).get().then(docs => {
          var questionSimilar = [];
          docs.forEach(doc => {
            if(doc.data().slug !== the_slug) questionSimilar.push(doc.data());
          });
          setRelatedQues(questionSimilar);
        })
      }else{
        window.location.href = '/';
      }
    });

  });

  const onLikeit = () => {
    if(likeIt){
      setLikeIt(false);
      db.collection("users").doc(user.uid).update({
        question_liked: firebase.firestore.FieldValue.arrayRemove(the_question.slug)
      });
      db.collection("questions").doc(the_question.slug).update({
        likes: firebase.firestore.FieldValue.increment(-1)
      });
      setTheQuestion({ ...the_question, likes: the_question.likes-1 });
    }else{
      setLikeIt({ likeIt: true });
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
      <div className={styles.resultsPos}>

        <div className={styles.forSmallerVer}>
          {/* カテゴリー */}
          <div className='category'>
            <p className={styles.category}><span className="text-primary fa fa-tag" />
              Category:
              {notUseSkeleton && (
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
              {!notUseSkeleton && <Skeleton style={{ marginLeft: 10 }} width={60} />}
            </p>
          </div>

          {/* モーダル */}
          {modalVisible &&  <ModalDelete onClose={onClose} onDelete={onDelete} />}

          {/* タイトル */}
          <h3 className={styles.title}>{notUseSkeleton ? the_question.title : <SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2} width={1000} height={20}  /></SkeletonTheme>}</h3>
          <p className={styles.date}>
            {notUseSkeleton ? the_question.created_on : <SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2} color='white' width={100} height={7}/></SkeletonTheme> }
          </p>
          
          <div>
            <p className={styles.your_vote}>You have voted for {your_vote}</p>
          </div>
          <div>
            <a style={{ marginRight: 10, color: '#55acee', outline: 'none', border: 'none' }} className='tip' rel="noreferrer" href={the_question && 'https://twitter.com/share?url=https://www.chooseone.app/'+the_question.slug+"/&text="+the_question.title} target="_blank" data-toggle="tooltip" title="Share"><TwitterIcon /></a>
            <a style={{ color: '#3B5998', outline: 'none', border: 'none' }} rel="noreferrer" href={notUseSkeleton && "https://www.facebook.com/share.php?u=https://www.chooseone.app/"+the_question.slug} target="_blank" data-toggle="tooltip" title="Share"><FacebookIcon /></a>
          </div>
        </div>

        {/* テーブル */}
        <div className={styles.table} >
          {notUseSkeleton && (
            <table className='table' style={{ margin: 0 }}>
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
          )}
          {!notUseSkeleton && (
            <table className='table'>
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
                  <td><SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2} width={60} height={10}/></SkeletonTheme></td>
                  <td><SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2} width={60} height={10}/></SkeletonTheme></td>
                </tr>
                <tr style={{ backgroundColor: 'rgb(143, 240, 159)' }} >
                  <th scope="row">&nbsp;&nbsp;{2}</th>
                  <td><SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2} width={60} height={10}/></SkeletonTheme></td>
                  <td><SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2} width={60} height={10}/></SkeletonTheme></td>
                </tr>
                <tr style={{ backgroundColor: 'rgb(143, 207, 239)' }} >
                  <th scope="row">&nbsp;&nbsp;{3}</th>
                  <td><SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2} width={60} height={10}/></SkeletonTheme></td>
                  <td><SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2} width={60} height={10}/></SkeletonTheme></td>
                </tr>
                <tr style={{ backgroundColor: 'rgb(239, 144, 175)' }} >
                  <th scope="row">&nbsp;&nbsp;{4}</th>
                  <td><SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2} width={60} height={10}/></SkeletonTheme> </td>
                  <td><SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2} width={60} height={10}/></SkeletonTheme> </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* グラフ */}
        <div className={styles.graphs}>
          {notUseSkeleton && <div className={styles.pieGraph}><PieChart skeleton={false} small={smallDisplay} labels={labels} values={values} colors={colors} /></div>}
          {!notUseSkeleton && <div className={styles.pieGraph}><PieChart skeleton={true} duration={2} labels={['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4']} values={[40, 20, 10, 10 ]} colors={['rgb(238, 238, 143)', 'rgb(143, 240, 159)', 'rgb(143, 207, 239)', 'rgb(239, 144, 175)' ]} /></div>}
          {notUseSkeleton && <div className={styles.barGraph}><BarChart skeleton={false} small={smallDisplay} labels={labels} values={values} colors={colors} /></div>}
          {!notUseSkeleton && <div className={styles.barGraph}><BarChart skeleton={true} duration={2} labels={['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4']} values={[40, 20, 10, 10 ]} colors={['rgb(238, 238, 143)', 'rgb(143, 240, 159)', 'rgb(143, 207, 239)', 'rgb(239, 144, 175)' ]} /></div>}
        </div>

        {/* ボタン系 */}
        <div className={styles.buttonsPos}>
          <ThemeProvider theme={theme}>
            <ButtonGroup size={smallDisplay ? 'small' : 'default'} variant="contained" >
              {!likeIt && <Button onClick={onLikeit} startIcon={<FavoriteIcon fontSize='small'/>} color='primary' >{notUseSkeleton ? the_question.likes : 'Like'}</Button>}
              {likeIt && <Button onClick={onLikeit} startIcon={<FavoriteIcon color='secondary' />} color='primary' >{notUseSkeleton ? the_question.likes : 'Like'}</Button>}
              {madeIt && <Button onClick={() => setModalVisible(true)} startIcon={<DeleteIcon fontSize='small' />} color='secondary' >Delete</Button>}
            </ButtonGroup>
          </ThemeProvider>
        </div>

        {/* 似ている投稿 */}
        <div>
          <h3 className={styles.mayLike}>Questions You May Like</h3>
          <div className={styles.similarPostsPos}>
            {relatedQues.length !== 0 && <QuestionList questions={relatedQues} />}
            {relatedQues.length === 0 && <WindMillLoading style={{ position: 'relative', marginTop: 50, marginLeft: 50,}} color='rgb(39, 169, 68)' speed={1.2} size='large' />}
          </div>
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
    fontWeight: 400,
  },
  mayLike: {
    marginBottom: 40,
    fontFamily: 'lust-script, sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
  },
  similarPostsPos: {
    width: '70%',
  },
  table: {
    filter: 'drop-shadow(0px 0px 5px rgba(160, 160, 160, 0.7))',
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 25,
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
    fontSize: 10,
    color: '#457AFB',
  },

  '@media (max-width: 500px)': {
    category: {
      fontSize: 10,
    },
    title: {
      fontSize: 23,
    },
    mayLike: {
      margin: '40px 0px 5px 10px',
      fontSize: 20,
    },
    buttonsPos: {
      marginLeft: 10,
      height: 20,
    },
    forSmallerVer: {
      paddingLeft: 10,
    },
    table: {
      filter: 'drop-shadow(5px 0px 4px rgba(160, 160, 160, 0.7))',
      marginTop: 10,
      marginBottom: 4,
    },
    pieGraph: {
      filter: 'drop-shadow(0px 2px 2px rgba(160, 160, 160, 0.7))',
      height: 150,
      marginBottom: 7,
      borderRadius: 4,
      padding: 4,
      marginRight: 3,
    },
    barGraph: {
      filter: 'drop-shadow(0px 2px 2px rgba(160, 160, 160, 0.7))',
      height: 150,
      marginBottom: 4,
      borderRadius: 4,
      padding: 4,
    },
    similarPostsPos: {
      width: '100%',
    },
  },
}));
