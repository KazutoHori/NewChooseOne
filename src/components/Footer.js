import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, createStyles } from '@material-ui/core';

import logo from '../ChooseOne1.png';
import logoSmall from '../ChooseOne80.png';

export default function Footer () {

  const smallDisplay = useMediaQuery('(max-width:500px)');
  const styles = useStyles();

  return (
    <div className={styles.wrap}>
      <div className={styles.footer}>
        <div className='container' >
          <div className={styles.footer_logo}><a href="/"><img src={smallDisplay ? logoSmall : logo} alt="ChooseOne" /></a></div>
            <div className={styles.footer_list}>
              <ul>
                <li className={styles.li}><a className={styles.a} href="/about">About ChooseOne</a></li>
                <li className={styles.li}><a className={styles.a} href="/contact">Contact Us</a></li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  )
}
const useStyles =  makeStyles(() => createStyles({
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
  li: {
    listStyle: 'none',
    paddingBottom: 20,
  },
  a: {
    color: 'white',
  },

  '@media (max-width: 500px)': {
    footer: {
      height: 125,
    },
    a: {
      fontSize: 10,
    }
  },
}));