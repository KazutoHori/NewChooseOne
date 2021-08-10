import React, { Fragment} from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme } from '@material-ui/core/styles';
import { IoIosAddCircle } from "react-icons/io";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import BuildIcon from '@material-ui/icons/Build';

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
            <a href={'/create'}> 
              {/* <div>
                <AddCircleIcon style={{ color: 'rgb(255, 192, 8)' }} />
              </div> */}
              <IconButton style={{backgroundColor: 'rgb(255, 192, 8)'}} onClick={() => window.location.href = '/create'} className={styles.iconButton}>
                  <IoIosAddCircle />
              </IconButton>
              {/* <p className={styles.name}>Add</p> */}
            </a>
          </div>
          <div className={styles.button}>
            <a href={'/voted'}>
              {/* <div>
                <ThumbUpAltIcon style={{ color: 'rgb(40, 168, 69)' }} />
              </div> */}
              <IconButton style={{backgroundColor: 'rgb(40, 168, 69)'}} onClick={() => window.location.href = '/voted'} className={styles.iconButton}>
                <ThumbUpAltIcon />
              </IconButton>
              {/* <p className={styles.name}>Voted</p> */}
            </a>
          </div>
          <div className={styles.button}>
            <a href={'/made'}>
              {/* <div>
                <BuildIcon style={{ color: 'rgb(3, 122, 255)' }} />
              </div> */}
              <IconButton style={{backgroundColor: 'rgb(3, 122, 255)'}} onClick={() => window.location.href = '/made'} className={styles.iconButton}>
                <BuildIcon />
              </IconButton>
              {/* <p className={styles.name}>Made</p> */}
            </a>
          </div>
          <div className={styles.button}>
            <a href={'/liked'}>
              {/* <div>
                <FavoriteIcon style={{ color: 'red' }} />
              </div> */}
              <IconButton style={{backgroundColor: 'red'}} onClick={() => window.location.href = '/liked'} className={styles.iconButton}>
                <FavoriteIcon />
              </IconButton>
              {/* <p className={styles.name}>Liked</p> */}
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const useStyles = makeStyles(() => createStyles({
  iconButton: {
    padding: 8, 
    // marginLeft: 15, 
    outline: 'none', 
    color: 'white',
    border: 'none',
    '&:focus': {
      outline: 'none'
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  button: {
    padding: '0 7px',
    textAlign: 'center',
  },
  name: {
    fontSize: 12,
    color: 'black',
  }
}));