import React, { Fragment } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { Helmet } from "react-helmet";

export default function About () {

  const styles = useStyles();

  return (
    <Fragment>
      <Helmet>
          <title>About ChooseOne</title>
          <meta
            name='description'
            content='ChooseOne lets you have access to general understandings through user-interactive questions. The more you vote, the more you can influence the results, and it can be helpful to all the people who want to know the results.' 
          />
      </Helmet>
      <div className={styles.about}>
        <h1 className={styles.title}>About ChooseOne</h1>
        <br />
        <p className={styles.p}>
          ChooseOne's <strong className={styles.strong}>MISSION</strong> is to let you have access
          to general understandings through user-interactive questions.
          You can create your own questions and get to know what people
          think, which is one of the biggest features of ChooseOne.
        </p>
        <p className={styles.p}>
          The <strong className={styles.strong}>HEART</strong> of ChooseOne is your votes.
          The more you vote, the more you can influence the results and
          ,in the long run, can be helpful to people in the world who
          want to know the results.
        </p>
        <p className={styles.p}>
          I sincerely <strong className={styles.strong}>HOPE</strong> ChooseOne will be helpful
          and enjoyable to you all even a little. Nothing can be
          substituted with your pleasant experience with ChooseOne for me.
        </p>
        <h3 className={styles.thankYou}>Thank you All for using ChooseOne!</h3>
      </div>
    </Fragment>
  );
}

const useStyles = makeStyles(() => createStyles({

  thankYou: {
    fontFamily: 'lust-script, sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
    marginBottom: 15,
    textAlign: 'center',
  },
  about: {
    backgroundColor: 'white',
    padding: 15,
    filter: 'drop-shadow(0px 0px 5px rgba(160, 160, 160, 0.7))',
    borderRadius: 15,
  },
  title: {
    fontFamily: 'lust-script, sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
    textAlign: 'center',
  },
  p: {
    lineHeight: 3,
  },
  strong: {
    fontWeight: 600,
    fontStyle: 'italic',
  },

  '@media (max-width: 500px)': {
    title: {
      fontSize: 22,
    },
    p: {
      fontSize: 12,
    },
    thankYou: {
      fontSize: 20,
    }
  }

}));
