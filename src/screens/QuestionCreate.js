import React, { Component, Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuestionList from '../components/QuestionList.js';
import slugify from '../utils/slugify.js';

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
      addChoice: 0,
      warning: '',
      title: '',
      choices: [],
    }
  }

  onSubmit = async () => {
    const { addChoice, title, choices, categories } = this.state;

    const { user } = this.props;
    var userId = user.uid;

    if(title === ''){
      this.setState({ warning: 'Title cannot be empty.'});
      setTimeout(() => this.setState({ warning: ''}),2500);
      return null;
    }

    var S = new Set(choices);
    if(choices.length !== S.size) {
      this.setState({ warning: 'There are same choices.'});
      setTimeout(() => this.setState({ warning: ''}),2500);
      return null;
    }

    let new_choices = [];
    for(var i=0; i<addChoice+2; i++){
      if(choices[i] !== undefined && choices[i] !== ''){
        new_choices.push({
          choice_text: choices[i],
          votes: 0,
        });
      }
    }

    if(new_choices.length<2) {
      this.setState({ warning: 'Choices must be more than two.'});
      setTimeout(() => this.setState({ warning: ''}),2500);
      return null;
    }

    if(categories.length === 0){
      this.setState({ warning: 'Category cannot be empty.'});
      setTimeout(() => this.setState({ warning: ''}),2500);
      return null;
    }

    var how_many=0;
    await db.collection('questions').get().then(snap => {
      how_many = snap.size
    });

    var rep=0;
    var new_slug=slugify(title);
    if(new_slug === '') new_slug=title;

    await db.collection('questions').where('slug', '==', new_slug).get().then(snap => {
      rep=snap.size
    });
    if(rep !== 0) {
      rep=rep+1;
      new_slug=new_slug.concat('___');
      new_slug=new_slug.concat(rep.toString());
    }

    let current=new Date();
    current=current.toJSON();
    let new_question = {
      id: how_many+1,
      title: title,
      author: user.uid,
      category: categories,
      slug: new_slug,
      created: current.slice(0, 10)+current.slice(11, 19),
      choices: new_choices,
      comments: [],
      users_answered: [],
      all_votes: 0,
    }

    db.collection('questions').doc(new_slug).set(new_question);
    await db.collection('users').doc(userId).update({
      question_created: firebase.firestore.FieldValue.arrayUnion(new_slug)
    });

    this.setState({
      addChoice: 0,
      warning: '',
      categories: [],
    });
    // navigate('QuestionResult', { from_where: 'QuestionCreated', question: new_question});
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
    console.log('hl');
    var copy=categories.slice();
    if(copy.includes(allCategories[idx])){
      copy=copy.filter(c => c !== allCategories[idx]);
    }else{
      copy.push(allCategories[idx]);
    }
    this.setState({ categories: copy });
  }

  render() {
    const { warning, addChoice, title, choices } = this.state;
    var added=[];
    for (let i=0; i<addChoice; i++){
      added.push(
        <Fragment>
          <div style={styles.semiTitle}></div>
          <input
            style={styles.input}
            value={choices[2+i]}
            onChange={(text) => this.choiceChangeText(text, (i+2))}
            placeholder={'Choice '+(3+i)}
          />
        </Fragment>
      );
    }
    if(added.length > addChoice) {
      added.pop();
    }

    return (
      <Fragment>
        <div className="add">
          <h3>Let's Add A New Question!</h3>
          {/* タイトル */}
          <form className="actual" method="post" id="form">
            <form className="field">
              <label>
                Title
                <input
                  style={styles.input}
                  onChange={(event) => this.titleChangeText(event)}
                  value={title}
                  placeholder={'Title'}
                />
              </label>
            </form>
            {/* 選択肢 */}
            <h4>Choices</h4>
            <div className="choice_form">
              <div className="choice-area">
                <form>
                  <input
                    style={styles.input}
                    value={choices[0]}
                    onChange={(event) => this.choiceChangeText(event, 0)}
                    placeholder={'Choice 1'}
                  />
                  <input
                    style={styles.input}
                    value={choices[1]}
                    onChange={(event) => this.choiceChangeText(event, 1)}
                    placeholder={'Choice 2'}
                  />
                  {addChoice !== 0 && (
                    [added]
                  )}
                </form>
              </div>
            </div>
            <div className="buttons">
              {addChoice < 9 && <button onClick={() => {this.setState({ addChoice: addChoice+1 }); console.log(addChoice);} } id="add" type="button" className="btn btn-primary" >Add New Choice</button>}
              {addChoice !== 0 && <button onClick={() => this.setState({ addChoice: addChoice-1 })} id="remove" type="button" className="btn btn-danger" >Remove Last Choice</button>}
            </div>
            <style dangerouslySetInnerHTML={{__html: "\n          .disappear{\n            display: none;\n          }\n        " }} />
            {/* カテゴリー */}
            <h4>Category</h4>
            <div>
              <div className="categories">
                {allCategories.map((cate, idx) => {
                  if (idx >= 3) return null;
                  const { categories } = this.state;
                  if (categories.includes(allCategories[idx])) var changer = { backgroundColor: tabColors[idx], color: 'white'  }
                  else { var changer = { backgroundColor: 'white', color: tabColors[idx] } }
                  return (
                    <Fragment>
                      <button onClick={() => this.onCategory(idx) } type='button' className="label cate" data-id={idx} style={Object.assign({borderColor: tabColors[idx], outline: 'none' }, styles.category, changer)}  >{cate}</button>
                    </Fragment>
                  )
                })}
              </div>
              <div className="categories">
                {allCategories.map((cate, idx) => {
                  if (idx <= 2 || idx >= 6) return null;
                  const { categories } = this.state;
                  if (categories.includes(allCategories[idx])) var changer = { backgroundColor: tabColors[idx], color: 'white'  }
                  else { var changer = { backgroundColor: 'white', color: tabColors[idx] } }
                  return (
                    <Fragment>
                      <button onClick={() => this.onCategory(idx) } type='button' className="label cate" data-id={idx} style={Object.assign({ borderColor: tabColors[idx], outline: 'none' }, styles.category, changer)} >{cate}</button>
                    </Fragment>
                  )
                })}
              </div>
              <div className="categories">
                {allCategories.map((cate, idx) => {
                  if (idx <= 5) return null;
                  const { categories } = this.state;
                  if (categories.includes(allCategories[idx])) var changer = { backgroundColor: tabColors[idx], color: 'white'  }
                  else { var changer = { backgroundColor: 'white', color: tabColors[idx] } }
                  return (
                    <Fragment>
                      <button onClick={() => this.onCategory(idx) } type='button' className="label cate contained" data-id={idx} style={Object.assign({ borderColor: tabColors[idx], outline: 'none' }, styles.category, changer)}  >{cate}</button>
                    </Fragment>
                  )
                })}
              </div>
            </div>
            {/* 最後 */}
            {warning && <p className="red">{warning}</p>}
            {!warning && <p>You can delete but cannot edit after you make one.</p>}
            <button onClick={this.onSubmit} id className="btn btn-success" type="button" name="submit" >Add Question</button>
          </form>
        </div>
      </Fragment>
    )
  }
}

const styles = {
  category: {
    background: 'white',
  }
}
