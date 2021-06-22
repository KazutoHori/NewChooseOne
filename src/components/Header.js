import React, { Component, Fragment } from 'react';
import logo from '../ChooseOne1.png';
import '../App.scss';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


export default class Header extends Component {
  render() {
    return (
      <div className='header' style={styles.header}>
        <div className='container' style={styles.container}>
          <nav className="navbar-light navbar navbar-expand-lg align-items-center">
            <a href="/" className="navbar-brand  font-weight-normal" style={{ marginRight: 36 }}><img src={logo} alt="ChooseOne" /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <form className="form-inline mr-5 " method="get" action="{% url 'search_results' %}">
                <input type="text" className="form-control " name="q" placeholder="Search" aria-label="Search" />
              </form>
              <ul className="navbar-nav">
                <li className="nav-item mr-1">
                  <a style={Object.assign({}, styles.btn, styles.home)} href="/" className="btn normal home btn-success text-light"><img src="https://img.icons8.com/officel/18/000000/home-page.png" /> Home</a>
                </li>
                <li className="nav-item mr-1">
                  <a style={Object.assign({},styles.btn, styles.pic_only)} href="/" className="btn pic_only home btn-success text-light"><img src="https://img.icons8.com/officel/25/000000/home-page.png" /></a>
                </li>
                <li className="nav-item">
                  <a style={styles.btn} href="/create" id="add-question" className="btn normal add_que btn-warning text-light mr-1"><img src="https://img.icons8.com/flat-round/18/000000/question-mark.png" /> Add Questions</a>
                </li>
                <li className="nav-item">
                    <a style={Object.assign({}, styles.btn, styles.pic_only)} href="/create" id="add-question" className="btn pic_only add_que btn-warning text-light mr-1"><img src="https://img.icons8.com/flat-round/25/000000/question-mark.png" /> </a>
                </li>
                <li className="nav-item mr-1">
                    <a style={Object.assign({},styles.btn, styles.btnPrimary)} href="/asked" className="btn normal my_que btn-primary text-light"><img src="https://img.icons8.com/officel/18/000000/box.png" /> Your Content</a>
                </li>
                <li className="nav-item mr-1">
                  <a style={Object.assign({},styles.btn, styles.pic_only, styles.btnPrimary)} href="/asked" className="btn pic_only my_que btn-primary text-light"><img src="https://img.icons8.com/officel/25/000000/box.png" /></a>
                </li>
                <li className="nav-item mr-1">
                  <a style={Object.assign({}, styles.btn, styles.answered)} href="/answered" className="btn normal answered btn-warning text-light"><img src="https://img.icons8.com/dusk/20/000000/checked--v1.png" /> Answered</a>
                </li>
                <li className="nav-item mr-1">
                  <a style={Object.assign({}, styles.btn, styles.pic_only)} href="/answered" className="btn pic_only answered btn-warning text-light"><img src="https://img.icons8.com/dusk/25/000000/checked--v1.png" /></a>
                </li>
                <li className="nav-item">
                  <a style={Object.assign({}, styles.btn )} className="btn liked btn-primary text-light" href="/liked"><img src="https://img.icons8.com/fluent/20/000000/filled-like.png" /> Liked</a>
                </li>
                <li className="nav-item">
                  <a style={Object.assign({}, styles.btn, styles.pic_only)} className="btn pic_only liked btn-primary text-light" href="/liked"><img src="https://img.icons8.com/fluent/25/000000/filled-like.png" /></a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

const styles = {
  header: {
    top: 0,
    alignSelf: 'stretch',
    height: 56,
    zIndex: 12000,
    backgroundColor: 'red',
    color: 'white',
  },
  pic_only: {
    display: 'none',
  },
  home: {
    backgroundColor: 'rgb(40, 168, 69)',
  },
  answered: {
    marginLeft: 25,
  },
  btnPrimary: {
    backgroundColor: 'rgb(3, 122, 255)',
  },
  btn: {
    height: 39,
    textAlign: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
};