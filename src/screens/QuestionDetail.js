import React, { useEffect, useState, Fragment } from 'react';
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
import { Helmet } from "react-helmet";
import { Wave } from "react-animated-text";


import QuestionList from '../components/QuestionList';
import ModalDelete from '../components/ModalDelete';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';

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

export default function QuestionDetail (props) {

  const uid = localStorage.getItem('chooseoneUid');
  const the_slug = props.match.params.the_slug;

  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [madeIt, setMadeIt] = useState(null);
  const [the_question, setTheQuestion] = useState(null);
  const [likeIt, setLikeIt] = useState(false);
  const [your_vote, setYourVote] = useState(null);
  var choicesSorted = [];
  const [relatedQues, setRelatedQues] = useState([]);
  const [answered, setAnswered] = useState(false);
  // const [user, setUser] = useRecoilState(userAtom);

  const loaded = relatedQues.length !== 0;
  const styles = useStyles();
  const smallDisplay = useMediaQuery('(max-width:500px)');
  var l = [];
  var v = [];
  var c = [];
  var content = '';
  if(the_question){
    for(var i=0; i<the_question.choices.length; i++){
      if(i) content += the_question.choices[i].choice_text;
      else content += ' vs ' + the_question.choices[i].choice_text;
    }
  }

  // QuestionDetail
  const [warning, setWarning] = useState(null);
  const [the_choice, setTheChoice] = useState(null);
  var choiceSkeleton = [];
  for(var i=0; i<(5-smallDisplay*2); i++){
    choiceSkeleton.push(<div style={{ marginLeft: 30, marginTop: 15 }}><SkeletonTheme Primarycolor="white" highlightColor="#d3d3d3"><Skeleton duration={2} color='white' width={100} height={15 - smallDisplay*5}/></SkeletonTheme></div>)
  }

  useEffect(() => {
    if(uid === null || user !== null) return null;

    if(user === null){
      db.collection('users').doc(uid).get().then((doc) => {
        if(doc.exists){
          var the_user = doc.data()
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

          if(the_user.question_voted.some((q) => q.question === the_slug)){
            setAnswered(true);
            for(var i=0; i<the_user.question_voted.length; i++){
              if(the_user.question_voted[i].question === the_slug) setYourVote(the_user.question_voted[i].answer)
            }
          }
        }
      })
    }

    db.collection('questions').doc(the_slug).get().then((doc) => {
      if(doc.exists){
        db.collection('questions').where('category', 'array-contains-any', doc.data().category).orderBy('created_at', 'desc').limit(30).get().then(docs => {
          var questionSimilar = [];
          docs.forEach(doc => {
            if(doc.data().slug !== the_slug) questionSimilar.push(doc.data());
          });
          setRelatedQues(questionSimilar);
        })
        setTheQuestion(doc.data());
      }else{
        window.location.href = '/';
      }
    });

  });

  const onChoice = async (idx) => {
  // const onVote = async () => {
  //   if(the_choice === null){
  //     setWarning('You have not chosen yet');
  //     setTimeout(() => setWarning(''),2500);
  //     return null;
  //   }
    const the_choice = idx;

    var the_slug = the_question.slug;
    var your_vote = the_question.choices[the_choice].choice_text;
    setYourVote(your_vote);
    setAnswered(true);

    var copy = Object.create(the_question);

    copy.choices[the_choice].votes=parseInt(copy.choices[the_choice].votes, 10)+1;
    
    setTheQuestion(copy.__proto__);

    await db.collection('questions').doc(the_slug).update({
      choices: copy.choices
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
      setTheQuestion({ ...the_question, likes: the_question.likes-1 });
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
    choicesSorted = copy;

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
  }

  return (
    <Fragment>
      <Helmet
          title = {loaded && the_question.title}
          meta={[
            { name: 'description', content: { content } }
          ]}
      />
      <div className={styles.resultsPos}>

        <div className={styles.forSmallerVer}>
          {/* カテゴリー */}
          <div>
            <p className={styles.category}><span className="text-primary fa fa-tag" />
              Category:
              {loaded && (
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
              {!loaded && <Skeleton style={{ marginLeft: 10 }} width={60} />}
            </p>
          </div>

          {/* モーダル */}
          {modalVisible &&  <ModalDelete onClose={onClose} onDelete={onDelete} />}

          {/* タイトル */}
          <h3 className={styles.title}>{loaded? the_question.title : <SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2} width={1000 - smallDisplay*720} height={20}  /></SkeletonTheme>}</h3>
          <p className={styles.date}>
            {loaded ? the_question.created_on : <SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2} color='white' width={100} height={7}/></SkeletonTheme> }
          </p>
          
          <div style={{ marginBottom: 15 }}>
            <a style={{ marginRight: 10, color: '#55acee', outline: 'none', border: 'none' }} className='tip' rel="noreferrer" href={loaded && 'https://twitter.com/share?url=https://www.chooseone.app/'+the_question.slug+"/&text="+the_question.title} target="_blank" data-toggle="tooltip" title="Share"><TwitterIcon /></a>
            <a style={{ color: '#3B5998', outline: 'none', border: 'none' }} rel="noreferrer" href={loaded && "https://www.facebook.com/share.php?u=https://www.chooseone.app/"+the_question.slug} target="_blank" data-toggle="tooltip" title="Share"><FacebookIcon /></a>
          </div>

          {answered && loaded && (
            <div>
              <p className={styles.your_vote}>You have voted for {your_vote}</p>
            </div>
          )}

        </div>

        {/* 選択肢 */}
        {!answered && (
          <div style={{ marginTop: 20 }}>
            {loaded && (
              <Fragment>
                {the_question.choices.map((choice, idx) => (
                  // <div className={styles.choiceBtnPos}>
                  //   {idx !== the_choice && <button onClick={() => setTheChoice(idx)} style={{ borderRadius: 15  }} type="button" name="choice" className="btn btn-outline-primary">{choice.choice_text}</button>}
                  //   {idx === the_choice && <button onClick={() => setTheChoice(idx)} style={{ borderRadius: 15  }} type="button" name="choice" className="btn btn-primary">{choice.choice_text}</button>}
                  // </div>
                  <div className={styles.choiceBtnPos}>
                    {idx !== the_choice && <button onClick={() => onChoice(idx)} style={{ borderRadius: 15, width: Math.min(300, window.innerWidth*0.6)  }} type="button" name="choice" className="btn btn-outline-primary">{choice.choice_text}</button>}
                    {idx === the_choice && <button onClick={() => onChoice(idx)} style={{ borderRadius: 15, width: Math.min(300, window.innerWidth*0.6) }} type="button" name="choice" className="btn btn-primary">{choice.choice_text}</button>}
                  </div>
                ))}
              </Fragment>
            )}
            {!loaded && [choiceSkeleton]}
            {warning !== null && (<p className={styles.warning}>{warning}</p>)}

            {loaded && (
              <div className={styles.voteBtnPos}>
                {/* <Button startIcon={<ThumbUpAltIcon />}  onClick={onVote} style={{ borderRadius: 10 }} className='btn btn-success'>Vote</Button> */}
                <div className={styles.messageTextPos} >
                  <Wave
                    delay={3}
                    text=" TAP & GET SURPRISED"
                    // effect='pop'
                    // effect='jump'
                    effect='verticalFadeIn'
                    effectChange={5.0}
                  />
                </div>
              </div>
            )}

          </div>
        )}

        {/* グラフ系 */}
        {answered && loaded && (
          <Fragment>
            <div className={styles.table} >
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
                    <tr style={{ backgroundColor: c[idx] }} >
                      <th scope="row">&nbsp;&nbsp;{idx+1}</th>
                      <td >{choice.choice_text}</td>
                      <td>{choice.votes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.graphs}>
              <div className={styles.pieGraph}><PieChart skeleton={!loaded} small={smallDisplay} labels={l} values={v} colors={c} /></div>
              <div className={styles.barGraph}><BarChart skeleton={!loaded} small={smallDisplay} labels={l} values={v} colors={c} /></div>
            </div>
          </Fragment>
        )}

        {loaded && (
          <Fragment>
            {/* ボタン */}
            <div className={styles.buttonsPos} style={{ marginTop: 100 - answered*80 }}>
              <ThemeProvider theme={theme}>
                <ButtonGroup size={smallDisplay ? 'small' : 'default'} variant="contained" >
                  {!likeIt && <Button onClick={onLikeit} startIcon={<FavoriteIcon fontSize='small'/>} color='primary' >{loaded ? the_question.likes : 'Like'}</Button>}
                  {likeIt && <Button onClick={onLikeit} startIcon={<FavoriteIcon color='secondary' />} color='primary' >{loaded ? the_question.likes : 'Like'}</Button>}
                  {madeIt && <Button onClick={() => setModalVisible(true)} startIcon={<DeleteIcon fontSize='small' />} color='secondary' >Delete</Button>}
                </ButtonGroup>
              </ThemeProvider>
            </div>

            {/* 似ている投稿 */}
            {answered && (
              <div>
                <h3 className={styles.mayLike}>Questions You May Like</h3>
                <div className={styles.similarPostsPos}>
                  {relatedQues.length !== 0 && <QuestionList questions={relatedQues} />}
                  {relatedQues.length === 0 && <WindMillLoading style={{ position: 'relative', marginTop: 50, marginLeft: 50,}} color='rgb(39, 169, 68)' speed={1.2} size='large' />}
                </div>
              </div>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

const useStyles = makeStyles(() => createStyles({
  messageTextPos: {
    fontSize: 13,
    marginTop: 40,
    fontFamily: 'Impact, sans-serif',
    fontStyle: 'italic',
    fontWeight: 900,
    letterSpacing: '0.3em',
    color: 'rgb(40, 168, 69)',
    textShadow: '0.2 0.5px 0.5px 0px #004',
    // transform: 'rotate(-10deg)',
  },
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
  mayLike: {
    marginTop: 40,
    marginBottom: 20,
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

  // QuestionDetail

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
    date: {
      marginBottom: 10,
    },
    your_vote: {
      fontSize: 10,
      marginBottom: 10,
    },
    category: {
      fontSize: 12,
    },
    title: {
      fontSize: 24,
    },
    mayLike: {
      margin: '40px 0px 5px 10px',
      fontSize: 20,
    },
    buttonsPos: {
      marginLeft: 15,
    },
    forSmallerVer: {
      paddingLeft: 15,
      marginTop: 10,
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
    voteBtnPos: {
      marginLeft: 15,   //　元は15
    },
    messageTextPos: {
      marginLeft: 30,
    },
    choiceBtnPos: {
      marginLeft: 35,
    },
  },
}));
