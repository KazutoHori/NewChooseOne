import React, { Component, Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

var categories = ['Love', 'News', 'Sports', 'Pastime', 'Health', 'Living', 'Career', 'Academics', 'IT'];
var tabColors = ['#ff69b4']
for(var i=1; i<11; i++) tabColors.push('hsla('+(i*100)+', 75%, 55%, 1)');

export default class Home extends Component {
  render() {
    var todays_ranking = [];
    var question_popular = [];

    return (
      <Fragment>

        {/* 左バー */}
        <div style={styles.left_side}>
          <h5 style={styles.semiTitle} className='cali'>Categories</h5>
          <ul>
            {categories.map((cate, idx) => (
              <li><a class='cali2' style={{ color: tabColors[idx] }} id="left{idx}" href={'/category/'+cate}>{cate}</a></li>
            ))}
          </ul>
          <h5 style={styles.semiTitle} className='cali'>Today's Ranking</h5>
          {todays_ranking.map((question, idx) => (
            <div className="rank" style={styles.rank}>
            <div className="title" style={styles.title}>
              {idx === 0 && (
                <div>
                  <img src="https://img.icons8.com/color/30/000000/first-place-ribbon.png" /><a style={styles.link} className="link" href="{% url 'question_detail' the_slug=question.slug %}"><h6 style={{color: 'rgb(223, 176, 0)'}}><strong>{'{'}{'{'}question.title{'}'}{'}'}</strong></h6></a>
                </div>
              )}
              {idx === 1 && (
                <div>
                  <img src="https://img.icons8.com/color/30/000000/second-place-ribbon.png" /><a style={styles.link} className="link" href="{% url 'question_detail' the_slug=question.slug %}"><h6 style={{color: 'rgb(174, 179, 181)'}}><strong>{'{'}{'{'}question.title{'}'}{'}'}</strong></h6></a>
                </div>
              )}
              {idx === 2 && (
                <div>
                  <img src="https://img.icons8.com/color/30/000000/third-place-ribbon.png" /><a style={styles.link} className="link" href="{% url 'question_detail' the_slug=question.slug %}"><h6 style={{color: 'rgba(184, 115, 51, 0.692)'}}><strong>{'{'}{'{'}question.title{'}'}{'}'}</strong></h6></a>{'{'}% endif %{'}'}
                </div>
              )}
            </div>
            <ul>
              {question.choices.map(choice => (
                <div>
                  <input type="radio" />
                  <label>{choice.choice}</label>
                  <br />
                </div>
              ))}
            </ul>
          </div>
          ))}
        </div>

      </Fragment>
    )
  }
}

const styles = {

  h3: {
    fontFamily: 'lust-script, sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
    marginBottom: 15,
  },
  
  left_side: {
    width: 200,
    marginRight: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    height: 'fit-content',
    filter: 'drop-shadow(0 0 5 rgba(160, 160, 160, 0.7))',
  },

  semiTitle: {
    paddingLeft: 10,
  },
  rank: {
    margin: 0,
    position: 'relative',
  },
  
}