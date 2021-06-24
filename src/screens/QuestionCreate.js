import React, { Component, Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuestionList from '../components/QuestionList.js';
import { slugify, timeToDay } from '../utils/Funcs.js';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddIcon from '@material-ui/icons/Add';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

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

var allCategories = ['Love', 'News', 'Sports', 'Pastime', 'Health', 'Living', 'Career', 'Academics', 'IT'];
var tabColors = ['#ff69b4']
for(var i=1; i<11; i++) tabColors.push('hsla('+(i*100)+', 75%, 55%, 1)');

export default class QuestionCreate extends Component {

  constructor(props){
    super(props);

    this.state = {
      categories: [],
      howManyChoice: 2,
      warning: '',
      title: '',
      choices: [],
    }
  }

  onSubmit = async () => {
    const { howManyChoice, title, choices, categories } = this.state;

    const { uid } = this.props;

    if(title === ''){
      this.setState({ warning: 'Title cannot be empty.'});
      setTimeout(() => this.setState({ warning: ''}),5000);
      return null;
    }
    var ifSuperUser = title.slice(0, 5) === 'SUQ__';
    
    var S = new Set(choices);
    if(choices.length !== S.size) {
      this.setState({ warning: 'There are same choices.'});
      setTimeout(() => this.setState({ warning: ''}),5000);
      return null;
    }

    let new_choices = [];
    for(var i=0; i<howManyChoice; i++){
      if(choices[i] === undefined || choices[i] === ''){
        this.setState({ warning: 'There is an empty choice.'});
        setTimeout(() => this.setState({ warning: ''}),5000);
        return null;
      }else{
        var text = ifSuperUser ? choices[i].slice(0, -3) : choices[i];
        var votes = ifSuperUser ? choices[i].slice(-3) : 0;
        if(ifSuperUser && !'123456789'.includes(votes[0])){
          this.setState({ warning: '選択肢の最後の数字忘れてる'});
          setTimeout(() => this.setState({ warning: ''}),5000);
          return null;
        }
        new_choices.push({
          choice_text: text,
          votes: votes,
        });
      }
    }

    if(categories.length === 0){
      this.setState({ warning: 'Category cannot be empty.'});
      setTimeout(() => this.setState({ warning: ''}),5000);
      return null;
    }

    var how_many=0;
    await db.collection('questions').get().then(snap => {
      how_many = snap.size
    });

    if(ifSuperUser) var slug = slugify(title.slice(5));
    else var slug=slugify(title);
    if(slug === '') slug=title;

    var rep=0;
    await db.collection('questions').where('slug', '==', slug).get().then(snap => {
      rep=snap.size
    });
    while(rep !== 0) {
      rep=rep+1;
      var conc = '___'.concat(rep);
      var now_slug=slug.concat(conc);
      db.collection('questions').where('slug', '==', slug).get().then(snap => {
        if(snap.size == 0){
          slug = now_slug;
          rep = 0;
        }
      });
    }

    let current=new Date();
    current=current.toJSON();
    var day = timeToDay(current.slice(0, 10));
    let new_question = {
      id: how_many+1,
      title: title,
      author: uid,
      category: categories,
      slug: slug,
      created_on: day,
      created_at: current.slice(0, 10)+current.slice(11, 19),
      choices: new_choices,
      comments: [],
      users_answered: [],
      all_votes: 0,
      active: true,
    }

    db.collection('questions').doc(slug).set(new_question);
    await db.collection('users').doc(uid).update({
      question_created: firebase.firestore.FieldValue.arrayUnion(slug)
    });

    window.location.href = "/detail/" + slug;
  };

  titleChangeText = (event) => {
    this.setState({ title: event.target.value });
  };

  choiceChangeText = (event, idx) => {
    const { choices } = this.state;
    var copy = choices.slice();
    copy[idx] = event.target.value;

    this.setState({ choices: copy });
  };

  onCategory = idx => {
    const { categories } = this.state;
    var copy=categories.slice();
    if(copy.includes(allCategories[idx])){
      copy=copy.filter(c => c !== allCategories[idx]);
    }else{
      copy.push(allCategories[idx]);
    }
    this.setState({ categories: copy });
  }

  render() {
    let current=new Date();
    current=current.toJSON();
    const { warning, howManyChoice, title, choices } = this.state;
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

    var added=[];
    for (let i=0; i<howManyChoice; i++){
      added.push(
        <div style={styles.choicePos}>
          <Input
            id="standard-adornment-weight"
            value={choices[i]}
            style={styles.choiceInput}
            onChange={(event) => this.choiceChangeText(event, i)}
            startAdornment={<InputAdornment position="start">{i+1}. </InputAdornment>}
            endAdornment={i > 1 && <InputAdornment position="end"><Tooltip title='Delete'><IconButton aria-label="delete" style={{ outline: 'none', }} onClick={() => this.setState({ howManyChoice: howManyChoice-1 })} color='secondary'><DeleteIcon /></IconButton></Tooltip></InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        </div>
      );
    }
    if(added.length > howManyChoice) {
      added.pop();
    }

    return (
      <Fragment>
        <div style={styles.add}>
          <h3 className='cali'>Let's Add A New Question!</h3>
          
          {/* タイトル */}
          <h4 className='cali2'>Title</h4>
          <Input
            id="standard-adornment-weight"
            style={styles.titleInput}
            onChange={(event) => this.titleChangeText(event)}
            value={title}
            aria-describedby="standard-weight-helper-text"
            // placeholder='Question'
            startAdornment={<InputAdornment position="start">Question：  </InputAdornment>}
            inputProps={{
              'aria-label': 'weight',
            }}
          />


          {/* 選択肢 */}
          <h4 className='cali2'>Choices</h4>
          <div>
            {howManyChoice !== 0 && (
              [added]
            )}
          </div>

          {/* ボタン */}
          <div>
            <ThemeProvider theme={theme}>
              <ButtonGroup disableElevation variant="contained" >
                {howManyChoice < 9 && <StyledButton startIcon={<AddIcon /> } color='primary' onClick={() => this.setState({ howManyChoice: howManyChoice+1 }) } >Add</StyledButton>}
              </ButtonGroup>
            </ThemeProvider>
          </div>

          {/* カテゴリー */}
          <h4 style={styles.cateTitle} className='cali2'>Category</h4>
          <div>
            <div>
              {allCategories.map((cate, idx) => {
                if (idx >= 3) return null;
                const { categories } = this.state;
                if (categories.includes(allCategories[idx])) var changer = { backgroundColor: tabColors[idx], color: 'white'  }
                else { var changer = { backgroundColor: 'white', color: tabColors[idx] } }
                return (
                  <Fragment>
                    <button onClick={() => this.onCategory(idx) } type='button' data-id={idx} style={Object.assign({borderColor: tabColors[idx], outline: 'none' }, styles.label, changer)}  >{cate}</button>
                  </Fragment>
                )
              })}
            </div>
            <div>
              {allCategories.map((cate, idx) => {
                if (idx <= 2 || idx >= 6) return null;
                const { categories } = this.state;
                if (categories.includes(allCategories[idx])) var changer = { backgroundColor: tabColors[idx], color: 'white'  }
                else { var changer = { backgroundColor: 'white', color: tabColors[idx] } }
                return (
                  <Fragment>
                    <button onClick={() => this.onCategory(idx) } type='button' data-id={idx} style={Object.assign({ borderColor: tabColors[idx], outline: 'none' }, styles.label, changer)} >{cate}</button>
                  </Fragment>
                )
              })}
            </div>
            <div>
              {allCategories.map((cate, idx) => {
                if (idx <= 5) return null;
                const { categories } = this.state;
                if (categories.includes(allCategories[idx])) var changer = { backgroundColor: tabColors[idx], color: 'white'  }
                else { var changer = { backgroundColor: 'white', color: tabColors[idx] } }
                return (
                  <Fragment>
                    <button onClick={() => this.onCategory(idx) } type='button' data-id={idx} style={Object.assign({ borderColor: tabColors[idx], outline: 'none'}, styles.label, changer)}  >{cate}</button>
                  </Fragment>
                )
              })}
            </div>
          </div>
          {/* 最後 */}
          {warning && <p style={Object.assign({ color: 'red' }, styles.warning)} >{warning}</p>}
          {!warning && <p style={styles.warning}>You can delete but cannot edit after you make one.</p>}
          <Button startIcon={<PostAddIcon /> } onClick={this.onSubmit} className="btn btn-success"  >Add Question</Button>
        </div>
      </Fragment>
    )
  }
}

const styles = {
  cateTitle: {
    marginTop: 25,
    marginBottom: 20,
  },
  warning: {
    marginTop: 20,
    fontSize: 10,
  },
  titleInput: {
    width: '70%',
    marginBottom: 20,
  },
  add: {
    backgroundColor: 'white',
    height: 'auto',
    textAlign: 'center',
    filter: 'drop-shadow(0px 0px 5px rgba(160, 160, 160, 0.7))',
    padding: 10,
    paddingBottom: 30,
    borderRadius: 15,
  },
  label: {
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
}



const StyledButton = withStyles({
  root: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 4,
    border: 0,
    color: 'white',
    height: 30,
    padding: '0 15px',
    outline: 'none',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);