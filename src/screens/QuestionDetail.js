import React, { Component, Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../App.scss';

import Modal from '../components/Modal';

export default class QuestionDetail extends Component {
  render() {
    const { params } = this.props.match;
    var the_slug = params.the_slug;
    if(params === undefined){
      return null;
    }

    // var the_slug = params.the_slug;

    var madeIt = true;
    var error_message = 'HELLO WORLD!!! THIS IS KAZUTO HORI';
    var the_question = {
      all_votes: 917,
      author: "JBMEXogvCuYl4m4dcVi4yJWnFpU2",
      created_at: "2021/06/07 07:16:45",
      created_on: "2021/06/07",
      id: 13,
      slug: "which-popular-sport-is-your-favorite",
      title: the_slug,
      category: ['Pastime', 'Sports'],
      choices: [
        {
          choice_text: "Basketball",
          votes: 11,
        },
        {
          choice_text: "Baseball",
          votes: 8,
        },
        {
          choice_text: "Hockey",
          votes: 2,
        },
        {
          choice_text: "Soccer",
          votes: 1,
        },
      ],
      comments: [],
      users_answered: [],
    };

    return (
      <Fragment>
        <div style={styles.detail_container} className="detail_container">
          {/* カテゴリー */}
          <p className="center"><span className="text-primary fa fa-tag" />
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
          <Modal />

          {/* タイトル */}
          <h3 className="center">{the_question.title}</h3>
          <p className="date center">
            Created： {the_question.created_on}
          </p>

          {/* 選択肢 */}
          <form method="post">
            {the_question.choices.map((choice, idx) => (
              <div className="btn-choice">
                <input style={styles.radio} type="button" name="choice" data-id={idx} data-content={choice.choice_text} id={idx} className="btn-choice radio btn btn-outline-primary" value={choice.choice_text} />
              </div>
            ))}
            <input style={styles.vote_btn} className="btn btn-success vote_btn disabledInput" id="value" type="submit" name="vote" disabled value="Choose One" />
          </form>

          {/* 削除ボタン */}
          <div className="buttons_normal fixed">
            <form method="post">
              <button style={styles.buttons} className="btn btn-primary likeit" type="submit" name="likeit"><img src="https://img.icons8.com/fluent/20/000000/filled-like.png" /> Like</button>
            </form>
            {madeIt && (
              <button style={styles.buttons} className="btn btn-danger delete" type="button" data-toggle="modal"><img src="https://img.icons8.com/plasticine/20/000000/delete-forever.png" /> Delete</button>
            )}
          </div>
          <div className="buttons_small buttons_detail">
            {madeIt &&　(
              <Fragment>
                <form method="post">
                  <button style={styles.buttons} className="btn btn-primary likeit" type="submit" name="likeit"><img src="https://img.icons8.com/fluent/15/000000/filled-like.png" /> Like</button>
                </form>
                <button className="btn btn-danger delete" type="button" data-toggle="modal"><img src="https://img.icons8.com/plasticine/15/000000/delete-forever.png" /> Delete</button>
              </Fragment>
            )}
            {!madeIt && (
              <form method="post">
                <button className="btn btn-primary likeit button_center" type="submit" name="likeit"><img src="https://img.icons8.com/fluent/15/000000/filled-like.png" /> Like</button>
              </form>
            )}
          </div>
        </div>
      </Fragment>
    )
  }
}

const styles = {
  radio: {
    borderRadius: 15,
  },
  your_vote: {
    fontSize: 13,
    marginLeft: 5,
    color: 'yellowgreen',
  },
  detail_container: {
    paddingTop: 15,
    alignSelf: 'stretch',
    paddingBottom: 30,
    fontFamily: 'latienne-pro, serif',
    fontStyle: 'normal',
    fontWeight: 400,
  },
  vote_btn: {
    borderRadius: 15,
  },
  buttons: {
    borderRadius: 30,
  }
}
