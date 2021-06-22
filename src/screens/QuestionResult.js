import React, { Component, Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuestionList from '../components/QuestionList';
import ModalDelete from '../components/ModalDelete';

export default class QuestionResult extends Component {

  render() {
    var madeIt = true;
    var error_message = 'HELLO WORLD!!! THIS IS KAZUTO HORI';
    var questions = [];
    var your_vote = 'Soccer';
    var the_question = {
      all_votes: 917,
      author: "JBMEXogvCuYl4m4dcVi4yJWnFpU2",
      created_at: "2021/06/07 07:16:45",
      created_on: "2021/06/07",
      id: 13,
      slug: "which-popular-sport-is-your-favorite",
      title: "Which popular sport is your favorite?",
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
    var url = 'https://www.chooseone.app/'+the_question.slug;
    var Ref = "https://twitter.com/share?url="+url+"/&text="+the_question.title;
    var Fref = "https://www.facebook.com/share.php?u="+url;
    var LRef = "https://social-plugins.line.me/lineit/share?url="+url;

    return (
      <Fragment>
        {/* ここからがメイン */}
        <div className="detail_container">

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
          <ModalDelete />

          {/* タイトル */}
          <h3 className="center">{the_question.title}</h3>
          <p className="date center">
            Created： {the_question.created_on}
          </p>
          
          <div className="your_vote">
            <p className="your_vote">You have voted for {your_vote}</p>
          </div>
          <div className="share">
            <a className="tip btn-twitter" href={'https://twitter.com/share?url=https://www.chooseone.app/'+the_question.slug+"/&text="+the_question.title} rel="nofollow" target="_blank"><img src="https://img.icons8.com/color/35/000000/twitter-circled.png" /><span>Share</span></a>
            <a className="tip" href={"https://www.facebook.com/share.php?u=https://www.chooseone.app/"+the_question.slug} rel="nofollow" target="_blank"><img src="https://img.icons8.com/fluent/35/000000/facebook-new.png" /><span>Share</span></a>
            <a className="tip btn-line" href={"https://social-plugins.line.me/lineit/share?url=https://www.chooseone.app/"+the_question.slug} target="_blank" rel="nofollow"><img src="https://img.icons8.com/color/35/000000/line-me.png" /><span>Share</span></a>
          </div>
          <style dangerouslySetInnerHTML={{__html: "\n        a.tip span { display: none; padding:3px 5px; margin-top: 30px; margin-left: -20px; font-size: 7px;}\n        a.tip:hover span {display:inline; position:absolute; border-radius: 10px; background:#ffffff; border:1px solid #cccccc; color:#6c6c6c;}\n      " }} />

          {/* テーブル */}
          <table className="block table">
            <thead>
              <tr>
                <td />
                <td>Choices</td>
                <td>Votes</td>
              </tr>
            </thead>
            <tbody>
              {the_question.choices.map((choice, idx) => (
                <tr id='table{idx+1}'>
                  <th scope="row">&nbsp;{idx+1}</th>
                  <td >{choice.choice_text}</td>
                  <td>{choice.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* グラフ */}
          <div className="graphs">
            <div className="block pie-canvas"><canvas id="piechart" /></div>
            <div className="block bar-canvas"><canvas id="barchart" /></div>
          </div>
          {/* ボタン系 */}
          <div className="buttons_normal">
            <form method="post">
              <button className="btn btn-primary likeit" type="submit" name="likeit"><img src="https://img.icons8.com/fluent/27/000000/filled-like.png" /> Like</button>
            </form>
            {madeIt && (
              <button className="btn btn-danger delete" type="button" data-toggle="modal"><img src="https://img.icons8.com/plasticine/27/000000/delete-forever.png" /> Delete</button>
            )}
          </div>
          <div className="buttons_small">
            {madeIt && (
              <Fragment>
                <form method="post">
                  <button className="btn btn-primary likeit" type="submit" name="likeit"><img src="https://img.icons8.com/fluent/15/000000/filled-like.png" /> Like</button>
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
          {/* 似ている投稿 */}
          <div className="similar_posts main_list">
            <h3>Questions You May Like</h3>
            <QuestionList questions={questions} />
            {questions == [] && (
              <pre>There are no similar posts yet.</pre>
            )}
          </div>
        </div>
      </Fragment>
    )
  }
}

const styles = {
  
}
