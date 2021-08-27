import React, { Fragment, useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, createStyles } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Bar } from 'react-chartjs-2';

import HoriChart from './HoriChart';

// Firebase
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore, updateDoc, increment, collection, deleteDoc, startAfter, arrayRemove, arrayUnion, query, 
      where, getDoc, doc, getDocs, orderBy, limit } from "firebase/firestore";
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
var db = '';
if (!getApps().length){ 
  const firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp);
}else{
  db = getFirestore();
}

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

export default function QuestionList (props) {

  const uid = localStorage.getItem('chooseoneUid');
  // const [your_vote, setYourVote] = useState(null);
  const [answered, setAnswered] = useState(false);
  const styles = useStyles();
  var l = [];
  var v = [];
  var c = [];

  const the_question = props.the_question;
  const notLoaded = (the_question.category === null || the_question.category === undefined);
  const smallDisplay = useMediaQuery('(max-width:500px)');
  var choiceSkeleton = [];

  for(var i=0; i<(5-smallDisplay*2); i++){
    choiceSkeleton.push(
      <div>
        <label for="choice{idx}">
          <Skeleton duration={2.5} width={150} height={10}/>
        </label>
      </div>
    )
  }

  if(the_question !== 'skeleton' && the_question !== undefined){
    var copy = the_question.choices;

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

  useEffect(() => {
    if(uid === null) return null;

    const u = doc(db, 'users', uid);
    const promise = new Promise(function(resolve) {
      resolve(getDoc(u));
    })
    promise.then((us) => {
      if(us.exists){
        var the_user = us.data();

        if(the_user.question_voted.some((q) => q.question === the_question.slug)){
          setAnswered(true);
        }
      }
    });
  });

  const onChoice = async (idx) => {
    var the_slug = the_question.slug;
    var your_vote = the_question.choices[idx].choice_text;

    setAnswered(true);

    var copy = Object.create(the_question);

    copy.choices[idx].votes=parseInt(copy.choices[idx].votes, 10)+1;
    

    await updateDoc(doc(db, 'questions', the_question.slug), {
      choices: copy.choices,
      all_votes: increment(1),
      users_voted: arrayUnion(uid),
    });

    await updateDoc(doc(db, 'users', uid), {
      question_voted: arrayUnion({ question: the_slug, answer: your_vote }),
    })
  }

  return (
    <Fragment>
      <div className={styles.onepost}>
        
        <p className='cali2' style={{ fontSize: 12 }}><span className='text-primary fa fa-tag'></span>
          Category:
          {!notLoaded && (
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
          {notLoaded && <Skeleton style={{ marginLeft: 10 }} width={60} />}
        </p>
        <h4 style={{ fontSize: 19 }} className='cali2'><a className={styles.link} href={'/q/'+the_question.slug}>{!notLoaded ? the_question.title : <SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2.5} width={'80%'} height={20}  /></SkeletonTheme> }</a></h4>

        <div className={styles.choices} style={{ paddingLeft: smallDisplay && answered && 0, paddingRight: !smallDisplay && answered && 35 }}>
          <ul style={{ paddingLeft: 0 }}>
            {!notLoaded && (
              <Fragment>
                {!answered ?
                  <Fragment>
                    {the_question.choices.map((choice,idx) => (
                      <div>
                        {/* <label for="choice{idx}">○ {choice.choice_text}</label>
                        <br></br> */}
                        <StyledButton variant="outlined" onClick={() => onChoice(idx)} size="small" color="primary">
                          {choice.choice_text}
                        </StyledButton>
                      </div>
                    ))}
                  </Fragment>
                  :
                  <Fragment>
                    <div className={styles.HoriChart}><HoriChart small={smallDisplay} skeleton={notLoaded} labels={l} values={v} colors={c} /></div>
                  </Fragment>
                }
              </Fragment>
            )}
            {notLoaded && [choiceSkeleton]}
          </ul>
        </div>
        <div className={styles.more}>
          <ThemeProvider theme={theme}>
            <Button variant='contained' onClick={() => window.location.href = '/q/'+the_question.slug } color="primary">
              More
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </Fragment>
  );
}

const useStyles = makeStyles(() => createStyles({
  more: {
    marginBottom: 10,
    marginLeft: 12,
  },
  onepost: {
    padding: 10,
    paddingLeft: 15,
    marginBottom: 15,
    filter: 'drop-shadow(0px 0px 5px rgba(160, 160, 160, 0.7))',
    backgroundColor: 'white',
    position: 'relative',
    borderRadius: 15,
  },

  choices: {
    paddingLeft: 40,
  },

  link: {
    color: 'black',
    '&:hover': {
      background: 'linear-gradient(transparent 70%, #45cafb 0%)',
      textDecoration: 'none',
    }
  },
  
  '@media (max-width: 500px)': {
    onepost: {
      borderRadius: 0,
      marginBottom: 5,
      paddingLeft: 10,
      paddingBottom: 1,
      filter: 'none',

      link: {
        '&:hover': {
          background: 'none',
        }
      }
    }
  }
}));

const StyledButton = withStyles({
  root: {
    borderRadius: 7,
    borderColor: '#d3d3d3', 
    borderWidth: 0.01,
    color: '#696969', 
    fontSize: 11, 
    width: Math.min(200, window.innerWidth*0.5),
    textTransform: 'none',
    margin: 2,
    paddingLeft: 12,
    alignItems: 'center',
    justifyContent: 'start',
  },

  '@media (max-width: 500px)': {
    root: {
      width: window.innerWidth*0.5,
    }
  }
})(Button);