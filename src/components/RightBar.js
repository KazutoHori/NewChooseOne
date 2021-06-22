import React, { Component, Fragment } from 'react';
import Loading from 'react-loading';

export default class Home extends Component {
  render() {
    var categories = [];
    var todays_ranking = [];
    var question_popular = [];

    return (
      <Fragment>

        {/* 右バー */}
        <div className="right_side" style={Object.assign({}, styles.side, { width: 221 })}>
          <h5>Popular Questions</h5>
          {question_popular.map((question, idx) => (
            <div className="rank" style={styles.rank}>
              <div className="title" style={styles.title}>
                {idx === 0 && (
                  <div>
                    <img src="https://img.icons8.com/color/30/000000/first-place-ribbon.png" /><a className="link" href="{% url 'question_detail' the_slug=question.slug %}"><h6 style={{color: 'rgb(223, 176, 0)'}}><strong>{'{'}{'{'}question.title{'}'}{'}'}</strong></h6></a>
                  </div>
                )}
                {idx === 1 && (
                  <div>
                    <img src="https://img.icons8.com/color/30/000000/second-place-ribbon.png" /><a className="link" href="{% url 'question_detail' the_slug=question.slug %}"><h6 style={{color: 'rgb(174, 179, 181)'}}><strong>{'{'}{'{'}question.title{'}'}{'}'}</strong></h6></a>
                  </div>
                )}
                {idx === 2 && (
                  <div>
                    <img src="https://img.icons8.com/color/30/000000/third-place-ribbon.png" /><a className="link" href="{% url 'question_detail' the_slug=question.slug %}"><h6 style={{color: 'rgba(184, 115, 51, 0.692)'}}><strong>{'{'}{'{'}question.title{'}'}{'}'}</strong></h6></a>
                  </div>
                )}
                {idx !== 0 && idx !== 1 && idx !== 2 && (
                  <div>
                    <img src="https://img.icons8.com/color/25/000000/{{forloop.counter}}-circle-c--v2.png" /><a className="link" href="{% url 'question_detail' the_slug=question.slug %}"><h6><strong>{'{'}{'{'}question.title{'}'}{'}'}</strong></h6></a>{'{'}% endif %{'}'}
                  </div>
                )}
              </div>
              <ul>
                {question.choices.map(choice => (
                  <div>
                    <input type="radio" />
                    <label htmlFor="choice{idx}">{choice.choice_text}</label>
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
  
  // 右バー
  
  right_side: {
    width: 221,
  },
  h5: {
    fontFamily: 'lust-script, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    paddingLeft: 7,
  },

  title: {
    display: 'flex',
    flexDirection: 'row',
  },
  rank: {
    paddingLeft: 10,
    margin: 0,
    position: 'relative',
  },
  h6: {
    marginTop: 8,
    marginLeft: 2,
    fontSize: 12,
    maxWidth: 150,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  label: {
    fontSize: 5,
    padding: 0,
    margin: 0,
    maxWidth: 100,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  // .link::after{
  link: {
    position: 'absolute',
    top: 0, 
    right: 0, 
    bottom: 0, 
    left: 0,
    zIndex: 1,
    pointerEvents: 'auto',
    content: '',
    backgroundColor: 'transparent',
  }
}