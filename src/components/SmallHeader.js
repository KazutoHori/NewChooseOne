import React, { Fragment, useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import HomeIcon from '@material-ui/icons/Home';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { BsFillAwardFill, BsMusicNoteBeamed } from 'react-icons/bs';
import { BiNews } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import { FcSportsMode } from 'react-icons/fc';
import { MdWork } from 'react-icons/md';
import { IoIosSchool } from 'react-icons/io';
import { RiComputerFill } from 'react-icons/ri';
import { GiSofa, GiHealthPotion } from 'react-icons/gi';

import logoSmall from '../ChooseOne60.png';

// Firebase
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore, collection, orderBy, limit, query as firebaseQuery, getDocs } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyArjDv3hS4_rw1YyNz-JFXDX1ufF72bqr8",
  authDomain: "chooseone-105a9.firebaseapp.com",
  databaseURL: "https://chooseone-default-rtdb.firebaseio.com",
  projectId: "chooseone",
  storageBucket: "chooseone.appspot.com",
  messagingSenderId: "722704825746",
  appId: "1:722704825746:web:73f11551b9e59f4bc2d54b",
  measurementId: "G-YJ97DZH6V5"
};
var db = '';
if (!getApps().length){ 
  const firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp);
}else{
  db = getFirestore();
}

var tabColors = ['#ff69b4']
for(var i=1; i<11; i++) tabColors.push('hsla('+(i*100)+', 75%, 55%, 1)');

export default function SmallHeader (props) {
  
  const [query, setQuery] = useState('');
  const styles = useStyles();
  const [questions, setQuestions] = useState([]);
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rankingAnchorEl, setRankingAnchorEl] = useState(null);

  const isCategoryMenuOpen = Boolean(categoryAnchorEl);
  const isMenuOpen = Boolean(anchorEl);
  const isRankingMenuOpen = Boolean(rankingAnchorEl)

  useEffect(() => {
    if(questions.length !== 0) return null;

    const q = firebaseQuery(collection(db, 'questions'), orderBy('all_votes', 'desc'), limit(3));
    const promise = new Promise(function(resolve) {
      resolve(getDocs(q));
    });
    promise.then((qq) => {
      var ques = [];
      Promise.all(qq.docs.map(doc => {
        ques.push(doc.data());
        return null;
      })).then(() => {
        setQuestions(ques);
      });
    })
  }, []);

  const onSubmitSearch = (event) => {
    if(query.length === 0) return null;
    window.location.href = '/search/' + query;
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryMenuClose = () => {
    setCategoryAnchorEl(null);
    handleMenuClose();
  };

  const handleRankingMenuClose = () => {
    setRankingAnchorEl(null);
    handleMenuClose();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderCategoryMenu = (
    <Menu
      anchorEl={categoryAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isCategoryMenuOpen}
      onClose={handleCategoryMenuClose}
    >
      <MenuItem style={{color: tabColors[0] }} className={styles.cateItem} onClick={() => window.location.href = '/category/Love'}><AiFillHeart style={{ fontSize: 15, marginRight: 3 }} />Love</MenuItem>
      <MenuItem style={{color: tabColors[1] }} className={styles.cateItem} onClick={() => window.location.href = '/category/News'}><BiNews style={{ fontSize: 17, marginRight: 3 }} />News</MenuItem>
      <MenuItem style={{color: tabColors[2] }} className={styles.cateItem} onClick={() => window.location.href = '/category/Sports'}><FcSportsMode style={{ fontSize: 17, marginRight: 3 }} />Sports</MenuItem>
      <MenuItem style={{color: tabColors[3] }} className={styles.cateItem} onClick={() => window.location.href = '/category/Pastime'}><BsMusicNoteBeamed style={{ fontSize: 17, marginRight: 3 }} />Pastime</MenuItem>
      <MenuItem style={{color: tabColors[4] }} className={styles.cateItem} onClick={() => window.location.href = '/category/Health'}><GiHealthPotion style={{ fontSize: 17, marginRight: 3 }} />Health</MenuItem>
      <MenuItem style={{color: tabColors[5] }} className={styles.cateItem} onClick={() => window.location.href = '/category/Living'}><GiSofa style={{ fontSize: 17, marginRight: 3 }} />Living</MenuItem>
      <MenuItem style={{color: tabColors[6] }} className={styles.cateItem} onClick={() => window.location.href = '/category/Career'}><MdWork style={{ fontSize: 17, marginRight: 3 }}/>Career</MenuItem>
      <MenuItem style={{color: tabColors[7] }} className={styles.cateItem} onClick={() => window.location.href = '/category/'}><IoIosSchool style={{ fontSize: 17, marginRight: 3 }} />Academics</MenuItem>
      <MenuItem style={{color: tabColors[8] }} className={styles.cateItem} onClick={() => window.location.href = '/category/IT'}><RiComputerFill style={{ fontSize: 17, marginRight: 3 }}/>IT</MenuItem>
    </Menu>
  );

  const renderRankingMenu = (
    <Menu
      anchorEl={rankingAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isRankingMenuOpen}
      onClose={handleRankingMenuClose}
    >
      {questions.map((question, idx) => (
        <MenuItem>
          <div className="side_question">
            <div className="title">
              {idx === 0 && (
                <Fragment>
                  🥇 
                  <a style={{ textDecoration: 'none' }} className="link" href={'/q/' + question.slug}><h6 style={{color: 'rgb(223, 176, 0)'}}><strong>{question.title}</strong></h6></a>
                </Fragment>
              )}
              {idx === 1 && (
                <Fragment>
                  🥈 
                  <a style={{ textDecoration: 'none' }} className="link" href={'/q/' + question.slug}><h6 style={{color: 'rgb(174, 179, 181)'}}><strong>{question.title}</strong></h6></a>
                </Fragment>
              )}
              {idx === 2 && (
                <Fragment>
                  🥉 
                  <a style={{ textDecoration: 'none' }} className="link" href={'/q/' + question.slug}><h6 style={{color: 'rgba(184, 115, 51, 0.692)'}}><strong>{question.title}</strong></h6></a>
                </Fragment>
              )}
            </div>
            <ul>
              {question.choices.map(choice => (
                <div>
                  <label>○ {choice.choice_text}</label>
                  <br />
                </div>
              ))}
            </ul>
          </div>
        </MenuItem>
      ))}
     </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ padding: 0 }}
    >
      <MenuItem onClick={() => window.location.href = '/'} className={styles.menuItemPos}>
        <IconButton style={{ outline: 'none', }}  aria-label="Home" color="inherit">
          <HomeIcon style={{ fontSize: 21, color: 'rgb(40, 168, 69)'}}/>
        </IconButton>
        <div style={{ display: 'flex', alignItems: 'center'}}><p className={styles.menuItemFont}>Home</p></div>
      </MenuItem>
      <MenuItem onClick={(event) => setRankingAnchorEl(event.currentTarget)} className={styles.menuItemPos}>
        <IconButton style={{ fontSize: 21, outline: 'none' }}  aria-label="Ranking" color="inherit">
          <BsFillAwardFill color='rgb(255, 192, 8)' />
        </IconButton>
        <div style={{ display: 'flex', alignItems: 'center'}}><p className={styles.menuItemFont}>Ranking</p></div>
      </MenuItem>
      <MenuItem onClick={(event) => setCategoryAnchorEl(event.currentTarget)} className={styles.menuItemPos}>
        <IconButton style={{ outline: 'none' }}  aria-label="Home" color="inherit">
          <LocalOfferIcon style={{ fontSize: 21, color: 'rgb(3, 122, 255)' }} />
        </IconButton>
        <div style={{ display: 'flex', alignItems: 'center'}}><p className={styles.menuItemFont}>Category</p></div>
      </MenuItem>
      <MenuItem onClick={() => window.location.href = '/about'}  className={styles.menuItemPos}>
        <IconButton style={{ outline: 'none' }}  aria-label="About ChooseOne" color="inherit">
          <InfoIcon style={{ fontSize: 21, color: 'red' }} />
        </IconButton>
        <div style={{ display: 'flex', alignItems: 'center'}}><p className={styles.menuItemFont}>About</p></div>
      </MenuItem>
      <MenuItem onClick={() => window.location.href = '/contact'}  className={styles.menuItemPos}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          style={{ outline: 'none' }} 
        >
          <ContactSupportIcon style={{ fontSize: 21, }} />
        </IconButton>
        <div style={{ display: 'flex', alignItems: 'center'}}><p className={styles.menuItemFont}>Contact</p></div>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar elevation={0} className={styles.grow} position="static">
        <Toolbar style={{paddingLeft: 9, paddingRight: 9 }}>
          <a href="/" className={styles.logo}><img src={logoSmall} alt="ChooseOne" /></a>
          <div className={styles.search}>
            <div className={styles.searchIcon}>
              <SearchIcon size='small' />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: styles.inputRoot,
                input: styles.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(e) => {if(e.key === 'Enter'){e.preventDefault(); onSubmitSearch(); }}}
            />
          </div>
          <div className={styles.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
              style={{ outline: 'none' }} 
            >
              <MenuIcon size='small'  />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderCategoryMenu}
      {renderRankingMenu}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  cateItem: {
    fontSize: 11, 
    // justifyContent: 'center', 
    paddingTop: 0, 
    paddingBottom: 0,
    marginRight: -6,
  },
  menuItemFont: {
    margin: 0,
    fontSize: 14,
  },
  menuItemPos: {
    margin: 0, 
    paddingLeft: 0,
    paddingTop: 3,
    paddingBottom: 3,
  },
  grow: {
    position: 'fixed',
    width: '100%',
    height: 40,
    // backgroundColor: '#FF3333',
    backgroundColor: '#ff4500',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.3),
    },
    margin: '2px 5px 2px 8px',
    width: '100%',
    height: 30,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    fontSize: 14,
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));