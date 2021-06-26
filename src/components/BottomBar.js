import React, { Fragment} from 'react';
import { makeStyles, createStyles } from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import BuildIcon from '@material-ui/icons/Build';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default function BottomBar (props) {

  const styles = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: 'rgb(3, 122, 255)',
      },
      secondary: {
        main: '#f50057',
      },
      action: {
        main: 'rgb(40, 168, 69)',
      },
    },
  });

  return (
    <Fragment>
      <div>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <a href='#'> 
              <div>
                  <AddCircleIcon style={{ color: 'red' }} />
              </div>
              <p className={styles.name}>Add</p>
            </a>
          </div>
          <div className={styles.button}>
            <a>
              <div>
                  <CheckCircleIcon style={{ color: 'rgb(40, 168, 69)' }} />
              </div>
              <p className={styles.name}>Voted</p>
            </a>
          </div>
          <div className={styles.button}>
            <a>
              <div>
                  <BuildIcon style={{ color: 'rgb(3, 122, 255)' }} />
              </div>
              <p className={styles.name}>Made</p>
            </a>
          </div>
          <div className={styles.button}>
            <a>
              <div>
                  <FavoriteIcon style={{ color: 'red' }} />
              </div>
              <p className={styles.name}>Liked</p>
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const useStyles = makeStyles(() => createStyles({
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  button: {
    // backgroundColor: 'blue',
    padding: '0 7px',
    textAlign: 'center',
  },
  name: {
    fontSize: 4,
    paddingLeft: 3,
    color: 'black',
  }
}));