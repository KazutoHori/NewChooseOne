import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import logo from '../ChooseOne1.png';

export default class Footer extends Component {
  render() {
    return (
      <div style={styles.wrap}>
        <div style={styles.footer}>
          <div style={styles.container}  className="container">
            <div style={styles.footer_logo}><a href="/"><img src={logo} alt="ChooseOne" /></a></div>
              <div style={styles.footer_list}>
                <ul>
                  <li style={styles.li}><a style={styles.a} href="/about">About ChooseOne</a></li>
                  <li style={styles.li}><a style={styles.a} href="/contact">Contact Us</a></li>
                </ul>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  footer: {
    float: 'clear',
    backgroundColor: 'red',
    height: 170,
    alignSelf: 'stretch',
    paddingTop: 20,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  footer_list: {
    float: 'right',
    paddingRight: 10,
  },
  footer_logo: {
    float: 'left',
  },
  container: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  li: {
    listStyle: 'none',
    paddingBottom: 20,
  },
  a: {
    color: 'white',
  }
}