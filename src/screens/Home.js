import React, { useState, useEffect, Fragment } from 'react';
import { Helmet } from "react-helmet";
import InfiniteScroll  from "react-infinite-scroller"

import QuestionList from '../components/QuestionList.js';

// Firebase
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
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


export default function Home () {

  const [questions, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [end, setEnd] = useState(null);
  const [last, setLast] = useState(null);

  useEffect(() => {
    if(questions.length !== 0) return null;

    const q = query(collection(db, 'questions'), orderBy('created_at', 'desc'), limit(10));
    const promiseD = new Promise(function(resolve, reject) {
      resolve(getDocs(q));
    });
    promiseD.then((qq) => {
      var ques = [];
      Promise.all(qq.docs.map(async doc => {
        ques.push(doc.data());
        if(ques.length === 10) setLast(doc);
      })).then(() => {
        setQuestions(ques);
      })
    }, []);

    if(end === null){
      setEnd(query(collection(db, 'questions'), orderBy('created_at', 'asc'), limit(1)));
    }
  });

  const loadMore = async (page) => {
    var more = true;
    setHasMore(false);

    const next = await getDocs(query(collection(db, 'questions'), orderBy('created_at', 'desc'), startAfter(last), limit(10)));
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
        title = 'ChooseOne'
        meta={[
          { name: 'description', content: 'ChooseOne lets you have access to general understandings through user-interactive questions. The more you vote, the more you can influence the results, and it can be helpful to all the people who want to know the results.' }
        ]}
      />
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
