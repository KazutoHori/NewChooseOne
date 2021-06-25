import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import logo from '../ChooseOne1.png';
import logoSmall from '../ChooseOne80.png';
import '../App.scss';

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: 56,
    zIndex: 1,
    color: 'white',
  },
}

export default class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      query: '',
    }
  }

  onSubmitSearch = (event) => {
    window.location.href = '/search/' + this.state.query;
  }

  render() {
    return (
      




      <div className='header'>
        <div className='container' style={{ }}>
          <nav className="navbar-light navbar navbar-expand-lg align-items-center">
            <a href="/" className="navbar-brand" style={{ marginRight: 36 }}><img src={logo} alt="ChooseOne" /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <form onKeyDown={(e) => {if(e.key === 'Enter'){e.preventDefault(); this.onSubmitSearch(); }}} className="form-inline mr-5">
                <input type='text' value={this.state.query} onChange={(event) => this.setState({ query: event.target.value })} className="form-control" placeholder="Search"  />
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