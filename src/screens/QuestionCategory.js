import React, { useEffect, useState, Fragment } from 'react';
import { Helmet } from "react-helmet";
import InfiniteScroll  from "react-infinite-scroller"
import { makeStyles, createStyles } from '@material-ui/core';

import QuestionList from '../components/QuestionList.js';

// Firebase
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, orderBy, limit, startAfter } from "firebase/firestore";
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

export default function QuestionCategory (props) {

  const [questions, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [end, setEnd] = useState(null);
  const [last, setLast] = useState(null);
  const category = props.match.params.category;
  const styles = useStyles();

  useEffect(() => {
    if(questions.length !== 0) return null;

    const q = query(collection(db, 'questions'), where('category', 'array-contains', category), orderBy('created_at', 'desc'), limit(10));
    const promise = new Promise(function(resolve, reject) {
      resolve(getDocs(q));
    });
    promise.then((qq) => {
      var ques = [];
      Promise.all(qq.docs.map(async doc => {
        ques.push(doc.data());
        if(ques.length === 10) setLast(doc);
      })).then(() => {
        setQuestions(ques);
      })
    });

    if(end === null){
      setEnd(query(collection(db, 'questions'), where('category', 'array-contains', category), orderBy('created_at', 'asc'), limit(1)));
    }
  });

  const loadMore = async (page) => {
    var more = true;
    setHasMore(false);

    const next = await getDocs(query(collection(db, 'questions'), where('category', 'array-contains', category), orderBy('created_at', 'desc'), startAfter(last), limit(10)));
    var ques = [];
    await Promise.all(next.docs.map(async doc => {
      ques.push(doc.data());
      if(doc === end || ques.length === 10) {
        if(doc === end) more = false;
        setLast(doc);
      }
    })).then(() => setQuestions(questions.concat(ques)));

    if(more) setHasMore(true);
    else setHasMore(false);
  }

  return (
    <Fragment>
      <Helmet
        title = {'Questions Categorized as ' + category}
        meta={[
          { name: 'description', content: 'ChooseOne lets you have access to general understandings through user-interactive questions. The more you vote, the more you can influence the results, and it can be helpful to all the people who want to know the results.' }
        ]}
      />
      <p className={styles.title}>Questions Categorized as {category}</p>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        threshold={500}
        loader={<div></div> }
      >
        <QuestionList questions={questions} />
      </InfiniteScroll>
    </Fragment>
  )
}

const useStyles = makeStyles(() => createStyles({
  title: {
    fontFamily: 'lust-script, sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 24,
  },

  '@media (max-width: 500px)': {
    title: {
      fontSize: 22,
      marginLeft: 15,
      marginTop: 7,
    }
  }
}));

