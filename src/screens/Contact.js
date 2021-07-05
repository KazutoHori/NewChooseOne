import React, { Fragment } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { Helmet } from "react-helmet";

export default function Contact() {

  const styles = useStyles();

  return (
    <Fragment>
      <Helmet
        title = 'Contact Us'
        meta={[
          { name: 'description', content: 'ChooseOne lets you have access to general understandings through user-interactive questions. The more you vote, the more you can influence the results, and it can be helpful to all the people who want to know the results.' }
        ]}
      />
      <div className={styles.contact}>
        <h2 className={styles.title}>Contact Us</h2>
        <p className={styles.p}>If you have any questions or thoughts on this site,<br />
          <span className={styles.span}>please e-mail us!!</span></p>
        <p className={styles.p}>Our email address is </p><address><u><strong><a style={{color: 'blue'}} href="mailto:admin@chooseone.app">admin@chooseone.app</a></strong></u></address><p />
      </div>
    </Fragment>
  )
}

const useStyles = makeStyles(() => createStyles({
  title: {
    fontFamily: 'lust-script, sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
  },
  main_list: {
    width: 630,
    height: 'auto',
  },
  contact: {
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    padding: 20,
    filter: 'drop-shadow(0px 0px 5px rgba(160, 160, 160, 0.7))',
    borderRadius: 15,
  },
  p: {
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  span: {
    color: 'red',
  },

  '@media (max-width: 500px)': {
    title: {
      fontSize: 22,
    },
    p: {
      fontSize: 12,
    },
  }
}));
