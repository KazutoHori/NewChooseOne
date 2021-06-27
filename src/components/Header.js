import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import React, { Fragment, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import HomeIcon from '@material-ui/icons/Home';
import { IoIosAddCircle } from "react-icons/io";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import BuildIcon from '@material-ui/icons/Build';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { BsFillAwardFill } from 'react-icons/bs';

import logo from '../ChooseOne1.png';

// Firebase
import firebase from 'firebase/app';
import "firebase/firestore";
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
if (firebase.apps.length === 0){ firebase.initializeApp(firebaseConfig); }
var db = firebase.firestore();

var tabColors = ['#ff69b4']
for(var i=1; i<11; i++) tabColors.push('hsla('+(i*100)+', 75%, 55%, 1)');


export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar className={classes.grow} position="static">
        <div className='container'>
          <Toolbar style={{ padding: 0 }}>
            <a href="/" className={classes.logo}><img src={logo} alt="ChooseOne" /></a>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.sectionDesktop} style={{ marginLeft: 'auto' }}>
              <div className={classes.button} style={{ backgroundColor: 'rgb(40, 168, 69)'}}>
                <StyledButton onClick={() => window.location.href = '/'} startIcon={<HomeIcon />} style={{ outline: 'none', color: 'white' }} aria-label="Home">Home</StyledButton>
              </div>
              <div className={classes.button}  style={{ backgroundColor: 'rgb(255, 192, 8)'}}>
                <StyledButton onClick={() => window.location.href = '/'} startIcon={<IoIosAddCircle />} style={{ outline: 'none', color: 'white' }} aria-label="Home">Add</StyledButton>
              </div>
              <div className={classes.button}  style={{ backgroundColor: 'rgb(3, 122, 255)'}}>
                <StyledButton onClick={() => window.location.href = '/'} startIcon={<BuildIcon />} style={{ outline: 'none', color: 'white' }} aria-label="Home">Made</StyledButton>
              </div>
              <div className={classes.button}  style={{ backgroundColor: 'rgb(255, 192, 8)'}}>
                <StyledButton onClick={() => window.location.href = '/'} startIcon={<ThumbUpAltIcon />} style={{ outline: 'none', color: 'white' }} aria-label="Home">Voted</StyledButton>
              </div>
              <div className={classes.button}  style={{ backgroundColor: 'rgb(3, 122, 255)'}}>
                <StyledButton onClick={() => window.location.href = '/'} startIcon={<FavoriteIcon color='red' />} style={{ outline: 'none', color: 'white' }} aria-label="Home">Liked</StyledButton>
              </div>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </div>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    height: 50,
    backgroundColor: 'red',
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
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 36,
      width: 'auto',
    },
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
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  button: {
    display: 'flex', 
    alignItems: 'center', 
    height: 35, 
    borderRadius: 5,
    marginRight: 5,
  }
}));

const StyledButton = withStyles({
  root: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 4,
    border: 0,
    color: 'white',
    height: 30,
    padding: '0 15px',
    outline: 'none',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    textTransform: 'capitalize',
  },
  cate: {
    textTransform: 'capitalize',
  },
})(Button);

// function ElevationScroll(props) {
//   const { children, window } = props;
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 0,
//     target: window ? window() : undefined,
//   });

//   return React.cloneElement(children, {
//     elevation: trigger ? 4 : 0,
//   });
// }


// export default function SmallHeader (props) {
//   const [query, setQuery] = useState('');

//   const classes = useStyles();
//   const [questions, setQuestions] = useState([]);
//   const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [rankingAnchorEl, setRankingAnchorEl] = useState(null);

//   const isCategoryMenuOpen = Boolean(categoryAnchorEl);
//   const isMenuOpen = Boolean(anchorEl);
//   const isRankingMenuOpen = Boolean(rankingAnchorEl)

//   useEffect(() => {
//     if(questions.length !== 0) return null;

//     var quesRef = db.collection('questions');

//     quesRef.orderBy('all_votes', 'desc').limit(3).get().then((docs) => {
//       var ques = [];
//       docs.forEach(q => {
//         ques.push(q.data());
//       });
//       setQuestions(ques);
//     });
//   });

//   const onSubmitSearch = (event) => {
//     if(query.length === 0) return null;
//     window.location.href = '/search/' + query;
//   }

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleCategoryMenuClose = () => {
//     setCategoryAnchorEl(null);
//     handleMenuClose();
//   };

//   const handleRankingMenuClose = () => {
//     setRankingAnchorEl(null);
//     handleMenuClose();
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const menuId = 'primary-search-account-menu';
//   const renderCategoryMenu = (
//     <Menu
//       anchorEl={categoryAnchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isCategoryMenuOpen}
//       onClose={handleCategoryMenuClose}
//     >
//       <MenuItem style={{color: tabColors[0] }} onClick={() => window.location.href = '/category/Love'}>Love</MenuItem>
//       <MenuItem style={{color: tabColors[1] }} onClick={() => window.location.href = '/category/News'}>News</MenuItem>
//       <MenuItem style={{color: tabColors[2] }} onClick={() => window.location.href = '/category/Sports'}>Sports</MenuItem>
//       <MenuItem style={{color: tabColors[3] }} onClick={() => window.location.href = '/category/Pastime'}>Pastime</MenuItem>
//       <MenuItem style={{color: tabColors[4] }} onClick={() => window.location.href = '/category/Health'}>Health</MenuItem>
//       <MenuItem style={{color: tabColors[5] }} onClick={() => window.location.href = '/category/Living'}>Living</MenuItem>
//       <MenuItem style={{color: tabColors[6] }} onClick={() => window.location.href = '/category/Career'}>Career</MenuItem>
//       <MenuItem style={{color: tabColors[7] }} onClick={() => window.location.href = '/category/'}>Academics</MenuItem>
//       <MenuItem style={{color: tabColors[8] }} onClick={() => window.location.href = '/category/IT'}>IT</MenuItem>
//     </Menu>
//   );

//   const renderRankingMenu = (
//     <Menu
//       anchorEl={rankingAnchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isRankingMenuOpen}
//       onClose={handleRankingMenuClose}
//     >
//       {questions.map((question, idx) => (
//         <MenuItem>
//           <div className="side_question">
//             <div className="title">
//               {idx === 0 && (
//                 <Fragment>
//                   🥇 
//                   <a style={{ textDecoration: 'none' }} className="link" href={'/detail/' + question.slug}><h6 style={{color: 'rgb(223, 176, 0)'}}><strong>{question.title}</strong></h6></a>
//                 </Fragment>
//               )}
//               {idx === 1 && (
//                 <Fragment>
//                   🥈 
//                   <a style={{ textDecoration: 'none' }} className="link" href={'/detail/' + question.slug}><h6 style={{color: 'rgb(174, 179, 181)'}}><strong>{question.title}</strong></h6></a>
//                 </Fragment>
//               )}
//               {idx === 2 && (
//                 <Fragment>
//                   🥉 
//                   <a style={{ textDecoration: 'none' }} className="link" href={'/detail/' + question.slug}><h6 style={{color: 'rgba(184, 115, 51, 0.692)'}}><strong>{question.title}</strong></h6></a>
//                 </Fragment>
//               )}
//             </div>
//             <ul>
//               {question.choices.map(choice => (
//                 <div>
//                   <label>○ {choice.choice_text}</label>
//                   <br />
//                 </div>
//               ))}
//             </ul>
//           </div>
//         </MenuItem>
//       ))}
//      </Menu>
//   );

//   const mobileMenuId = 'primary-search-account-menu-mobile';
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={() => window.location.href = '/'} style={{ margin: 0, paddingBottom: 0, paddingTop: 0 }}>
//         <IconButton style={{ outline: 'none' }}  aria-label="Home" color="inherit">
//           <HomeIcon />
//         </IconButton>
//         <div style={{ display: 'flex', alignItems: 'center'}}><p style={{ margin: 0 }}>Home</p></div>
//       </MenuItem>
//       <MenuItem onClick={(event) => setRankingAnchorEl(event.currentTarget)}  style={{ margin: 0, paddingBottom: 0, paddingTop: 0 }}>
//         <IconButton style={{ outline: 'none' }}  aria-label="Ranking" color="inherit">
//           <BsFillAwardFill />
//         </IconButton>
//         <div style={{ display: 'flex', alignItems: 'center'}}><p style={{ margin: 0 }}>Ranking</p></div>
//       </MenuItem>
//       <MenuItem onClick={(event) => setCategoryAnchorEl(event.currentTarget)}  style={{ margin: 0, paddingBottom: 0, paddingTop: 0 }}>
//         <IconButton style={{ outline: 'none' }}  aria-label="Home" color="inherit">
//           <LocalOfferIcon />
//         </IconButton>
//         <div style={{ display: 'flex', alignItems: 'center'}}><p style={{ margin: 0 }}>Category</p></div>
//       </MenuItem>
//       <MenuItem onClick={() => window.location.href = '/about'}  style={{ margin: 0, paddingBottom: 0, paddingTop: 0 }}>
//         <IconButton style={{ outline: 'none' }}  aria-label="About ChooseOne" color="inherit">
//           <InfoIcon />
//         </IconButton>
//         <div style={{ display: 'flex', alignItems: 'center'}}><p style={{ margin: 0 }}>About</p></div>
//       </MenuItem>
//       <MenuItem onClick={() => window.location.href = '/contact'}  style={{ margin: 0, paddingBottom: 0, paddingTop: 0 }}>
//         <IconButton
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//           style={{ outline: 'none' }} 
//         >
//           <ContactSupportIcon />
//         </IconButton>
//         <div style={{ display: 'flex', alignItems: 'center'}}><p style={{ margin: 0 }}>Contact</p></div>
//       </MenuItem>
//     </Menu>
//   );

//   return (
//     <div>
//       <AppBar className={classes.grow} position="static">
//         <div className='container'>
//           <Toolbar style={{paddingLeft: 10, paddingRight:  10}}>
//             <a href="/" className={classes.logo}><img src={logo} alt="ChooseOne" /></a>
//             <div className={classes.search}>
//               <div className={classes.searchIcon}>
//                 <SearchIcon size='small' />
//               </div>
//               <InputBase
//                 placeholder="Search"
//                 classes={{
//                   root: classes.inputRoot,
//                   input: classes.inputInput,
//                 }}
//                 inputProps={{ 'aria-label': 'search' }}
//                 value={query}
//                 onChange={(event) => setQuery(event.target.value)}
//                 onKeyDown={(e) => {if(e.key === 'Enter'){e.preventDefault(); onSubmitSearch(); }}}
//               />
//             </div>
//             <div className={classes.sectionMobile}>
//               <IconButton
//                 aria-label="show more"
//                 aria-controls={mobileMenuId}
//                 aria-haspopup="true"
//                 onClick={handleMenuOpen}
//                 color="inherit"
//                 style={{ outline: 'none' }} 
//               >
//                 <MenuIcon size='small'  />
//               </IconButton>
//             </div>
//           </Toolbar>
//         </div>
//       </AppBar>
//       {renderMenu}
//       {renderCategoryMenu}
//       {renderRankingMenu}
//     </div>
//   );
// }