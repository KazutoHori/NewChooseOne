import React, { useState, Fragment } from 'react';
import { slugify, timeToDay } from '../utils/Funcs.js';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddIcon from '@material-ui/icons/Add';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, createStyles } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { WindMillLoading } from 'react-loadingg';
import { Helmet } from "react-helmet";

// Firebase
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore, arrayUnion, updateDoc, collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
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

var allCategories = ['Love', 'News', 'Sports', 'Pastime', 'Health', 'Living', 'Career', 'Academics', 'IT'];
var tabColors = ['#ff69b4']
for(var i=1; i<11; i++) tabColors.push('hsla('+(i*100)+', 75%, 55%, 1)');

export default function QuestionCreate (props) {

  const uid = localStorage.getItem('chooseoneUid');
  const [categories, setCategories] = useState([]);
  const [howManyChoice, setHowManyChoice] = useState(2);
  const [warning, setWarning] = useState('');
  const [title, setTitle] = useState('');
  const [choices, setChoices] = useState([]);
  const [voting, setVoting] = useState(false);
  var added=[];
  const styles = useStyles();
  const smallDisplay = useMediaQuery('(max-width:500px)');
  // const [user, setUser] = useRecoilState(userAtom);
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

  const onSubmit = async () => {

    if(title === ''){
      setWarning('Title cannot be empty.');
      setTimeout(() => setWarning(''),5000);
      return null;
    }
    var ifSuperUser = title.slice(0, 5) === 'SUQ__';
    var likes = 0;
    if(ifSuperUser){
      if(!'0123456789'.includes(title[title.length-2])){
        setWarning('Likesの入力を忘れてるよ');
        setTimeout(() => setWarning(''),5000);
        return null;
      }
      likes = parseInt(title.slice(-2), 10);
      var finalTitle = title.slice(5).slice(0, -2);
    } else var finalTitle = title;
    
    var S = new Set(choices);
    if(choices.length !== S.size) {
      setWarning('There are same choices.');
      setTimeout(() => setWarning(''),5000);
      return null;
    }

    var totalVotes = 0;
    let new_choices = [];
    for(var i=0; i<howManyChoice; i++){
      if(choices[i] === undefined || choices[i] === ''){
        setWarning('There is an empty choice.');
        setTimeout(() => setWarning(''),5000);
        return null;
      }else{
        var text = ifSuperUser ? choices[i].slice(0, -3) : choices[i];
        var votes = ifSuperUser ? choices[i].slice(-3) : 0;
        if(ifSuperUser && !'0123456789'.includes(votes[0])){
          setWarning('選択肢の最後の数字忘れてる');
          setTimeout(() => setWarning(''),5000);
          return null;
        }
        if(votes[0] === '0') votes = votes[1] + votes[2];
        totalVotes += parseInt(votes, 10);
        new_choices.push({
          choice_text: text,
          votes: parseInt(votes, 10),
        });
      }
    }

    if(categories.length === 0){
      setWarning('Category cannot be empty.');
      setTimeout(() => setWarning(''),5000);
      return null;
    }

    setVoting(true);

    var how_many = await getDocs(query(collection(db, 'questions')));
    how_many = how_many.docs.length;

    var slug=slugify(finalTitle);
    if(slug === '') slug=finalTitle;

    var rep=0;

    const sameQ = await getDocs(query(collection(db, 'questions'), where('slug', '==', slug)));
    rep = sameQ.docs.length;

    while(rep !== 0) {
      rep=rep+1;
      var conc = '___'.concat(rep);
      var now_slug=slug.concat(conc);
      
      const sameQ = await getDocs(query(collection(db, 'questions'), where('slug', '==', now_slug)));
      if(sameQ.docs.length === 0){
        slug = now_slug;
        rep = 0;
      }
    }

    let current=new Date();
    current=current.toJSON();
    var day = timeToDay(current.slice(0, 10));
    var new_question = {
      id: how_many+1,
      title: finalTitle,
      author: uid,
      category: categories,
      slug: slug,
      created_on: day,
      created_at: current.slice(0, 10)+' '+current.slice(11, 19),
      choices: new_choices,
      comments: [],
      users_voted: [],
      all_votes: totalVotes,
      active: true,
      likes: likes,
      SUQ: ifSuperUser,
    }

    await setDoc(doc(db, 'questions', slug), new_question);

    await updateDoc(doc(db, 'users', uid), {
      question_created: arrayUnion(slug),
    });

    window.location.href = "/q/" + slug;
  };

  const titleChangeText = (event) => {
    setTitle(event.target.value);
  };

  const choiceChangeText = (event, idx) => {
    var copy = choices.slice();
    copy[idx] = event.target.value;

    setChoices(copy);
  };

  const onCategory = (idx) => {
    var copy=categories.slice();
    if(copy.includes(allCategories[idx])){
      copy=copy.filter(c => c !== allCategories[idx]);
    }else{
      copy.push(allCategories[idx]);
    }
    setCategories(copy);
  }

  const onChoiceDelete = (i) => {
    var copy = choices.slice();
    copy.splice(i, 1);
    setChoices(copy);
    setHowManyChoice(howManyChoice-1);
  }

  var added = [];
  for (let i=0; i<howManyChoice; i++){
    added.push(
      <div className={styles.choicePos}>
        <Input
          id="standard-adornment-weight"
          autoComplete={false}
          value={choices[i] ? choices[i] : ''}
          className={styles.choiceInput}
          onChange={(event) => choiceChangeText(event, i)}
          startAdornment={<InputAdornment position="start">{i+1}. </InputAdornment>}
          endAdornment={i > 1 && <InputAdornment position="end"><Tooltip title='Delete'><IconButton aria-label="delete" style={{ outline: 'none', }} onClick={() => onChoiceDelete(i)} color='secondary'><DeleteIcon /></IconButton></Tooltip></InputAdornment>}
          aria-describedby="standard-weight-helper-text"
          inputProps={{
            'aria-label': 'weight',
          }}
        />
      </div>
    );
  }

  return (
    <Fragment>
      <Helmet
        title = 'Add New Questions'
        meta={[
          { name: 'description', content: 'ChooseOne lets you have access to general understandings through user-interactive questions. The more you vote, the more you can influence the results, and it can be helpful to all the people who want to know the results.' }
        ]}
      />
      <div className={styles.add}>
        <h3 className={styles.title}>Let's Add New Questions!</h3>
        
        {/* タイトル */}
        <h4 className={styles.labels}>Title</h4>
        <Input
          id="standard-adornment-weight"
          autoComplete={false}
          className={styles.titleInput}
          onChange={(event) => titleChangeText(event)}
          value={title}
          aria-describedby="standard-weight-helper-text"
          startAdornment={<InputAdornment position="start">Q. </InputAdornment>}
          inputProps={{
            'aria-label': 'weight',
          }}
        />


        {/* 選択肢 */}
        <h4 className={styles.labels}>Choices</h4>
        <div>
          {howManyChoice !== 0 && (
            [added]
          )}
        </div>

        {/* ボタン */}
        <div>
          <ThemeProvider theme={theme}>
            <ButtonGroup size={smallDisplay ? 'small' : 'default'} disableElevation variant="contained" >
              {howManyChoice < 9 && <StyledButton startIcon={<AddIcon /> } color='primary' onClick={() => setHowManyChoice(howManyChoice+1) } >Add</StyledButton>}
            </ButtonGroup>
          </ThemeProvider>
        </div>

        {/* カテゴリー */}
        <div className={styles.cateTitle}>
          <h4 className={styles.labels}>Category</h4>
        </div>
        <div>
          <div>
            {allCategories.map((cate, idx) => {
              if (idx >= 3) return null;
              if (categories.includes(allCategories[idx])) var changer = { backgroundColor: tabColors[idx], color: 'white'  }
              else { var changer = { backgroundColor: 'white', color: tabColors[idx] } }
              return (
                <Fragment>
                  <button onClick={() => onCategory(idx) } type='button' data-id={idx} style={Object.assign({ borderColor: tabColors[idx], outline: 'none'}, changer)} className={styles.cate}  >{cate}</button>
                </Fragment>
              )
            })}
          </div>
          <div>
            {allCategories.map((cate, idx) => {
              if (idx <= 2 || idx >= 6) return null;
              if (categories.includes(allCategories[idx])) var changer = { backgroundColor: tabColors[idx], color: 'white'  }
              else { var changer = { backgroundColor: 'white', color: tabColors[idx] } }
              return (
                <Fragment>
                  <button onClick={() => onCategory(idx) } type='button' data-id={idx} style={Object.assign({ borderColor: tabColors[idx], outline: 'none'}, changer)} className={styles.cate} >{cate}</button>
                </Fragment>
              )
            })}
          </div>
          <div>
            {allCategories.map((cate, idx) => {
              if (idx <= 5) return null;
              if (categories.includes(allCategories[idx])) var changer = { backgroundColor: tabColors[idx], color: 'white'  }
              else { var changer = { backgroundColor: 'white', color: tabColors[idx] } }
              return (
                <Fragment>
                  <button onClick={() => onCategory(idx) } type='button' data-id={idx} style={Object.assign({ borderColor: tabColors[idx], outline: 'none'}, changer)} className={styles.cate}  >{cate}</button>
                </Fragment>
              )
            })}
          </div>
        </div>
        {/* 最後 */}
        {warning && <p style={{color: 'red' }} className={styles.warning} >{warning}</p>}
        {!warning && <p className={styles.warning}>You can delete but cannot edit after you make one.</p>}
        {!voting
          ?
          <ThemeProvider theme={theme}>
            <ButtonGroup disableElevation variant="contained" >
              <StyledButton style={{ fontSize: 11, outline: 'none', backgroundColor: 'rgb(40, 168, 69)' }} size='small' startIcon={<PostAddIcon /> } onClick={onSubmit} >Add Question</StyledButton>
            </ButtonGroup>
          </ThemeProvider>
          :
          <div className={styles.loadingPos}>
            <WindMillLoading speed={1.2}  />
          </div>
        }
      </div>
    </Fragment>
  )
}

const useStyles = makeStyles(() => createStyles({
  loadingPos: {
    marginTop: 50,
    // marginLeft: 50,
    position: 'relative',
  },
  labels: {
    fontFamily: 'latienne-pro, serif',
    fontStyle: 'normal',
    fontWeight: 400,
  },
  title: {
    fontFamily: 'lust-script, sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
  },
  cateTitle: {
    marginTop: 25,
    marginBottom: 20,
  },
  warning: {
    marginTop: 20,
    fontSize: 12,
  },
  titleInput: {
    width: '70%',
    marginBottom: 20,
    borderColor: '#617',
    borderWidth: 1,
  },
  add: {
    backgroundColor: 'white',
    height: 'auto',
    textAlign: 'center',
    filter: 'drop-shadow(0px 0px 5px rgba(160, 160, 160, 0.7))',
    padding: 10,
    paddingBottom: 50,
    borderRadius: 15,
  },
  cate: {
    fontSize: 5,
    marginBottom: 10,
    marginRight: 10,
    textAlign: 'center',
    width: 70,
    height: 25,
    paddingLeft: 2,
    paddingRight: 2,
    cursor: 'pointer',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 25,
  },
  choicePos: {
    marginBottom: 15,
  },
  choiceInput: {
    width: '50%',
  },
  '@media (max-width: 500px)': {
    cate: {
      fontSize: 12,
    },
    labels: {
      fontSize: 20,
      marginTop: 20,
    },
    titleInput: {
      width: '90%',
    },
    choiceInput: {
      width: '80%',
    },
    cateTitle: {
      marginTop: 20,
      marginBottom: 10,
    },
  }
}));



const StyledButton = withStyles({
  root: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 4,
    fontSize: 12,
    color: 'white',
    height: 30,
    padding: '0 15px',
    outline: 'none',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  cate: {
    textTransform: 'capitalize',
  },
})(Button);

