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
import useMediaQuery from '@material-ui/core/useMediaQuery';

import logo from '../ChooseOne1.png';
import logoSmall from '../ChooseOne60.png';
import logoMedium from '../ChooseOne80.png';

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
  const smallDisplay = useMediaQuery('(max-width:500px)');
  const smallerThan1200 = useMediaQuery('(max-width:1200px)');
  const smallerThan900 = useMediaQuery('(max-width:990px)');

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
        <div className={!smallDisplay && 'container'}>
          <Toolbar style={{ padding: 0 }}>
            {smallerThan900 && <a href="/" className={classes.logo}><img src={logoSmall} alt="ChooseOne" /></a>}
            {!smallerThan900 &&  smallerThan1200 && <a href="/" className={classes.logo}><img src={logoMedium} alt="ChooseOne" /></a>}
            {!smallerThan1200 && <a href="/" className={classes.logo}><img src={logo} alt="ChooseOne" /></a>}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            {!smallerThan900
              ?
              <div className={classes.sectionDesktop} style={{ marginLeft: 'auto' }}>
                <div className={classes.button} style={{ backgroundColor: 'rgb(40, 168, 69)'}}>
                  <StyledButton onClick={() => window.location.href = '/'} startIcon={<HomeIcon />} style={{ outline: 'none', color: 'white' }} aria-label="Home">Home</StyledButton>
                </div>
                <div className={classes.button}  style={{ backgroundColor: 'rgb(255, 192, 8)'}}>
                  <StyledButton onClick={() => window.location.href = '/create'} startIcon={<IoIosAddCircle />} style={{ outline: 'none', color: 'white' }} aria-label="Home">Add</StyledButton>
                </div>
                <div className={classes.button}  style={{ backgroundColor: 'rgb(3, 122, 255)'}}>
                  <StyledButton onClick={() => window.location.href = '/made'} startIcon={<BuildIcon />} style={{ outline: 'none', color: 'white' }} aria-label="Home">Made</StyledButton>
                </div>
                <div className={classes.button}  style={{ backgroundColor: 'rgb(255, 192, 8)'}}>
                  <StyledButton onClick={() => window.location.href = '/voted'} startIcon={<ThumbUpAltIcon />} style={{ outline: 'none', color: 'white' }} aria-label="Home">Voted</StyledButton>
                </div>
                <div className={classes.button}  style={{ backgroundColor: 'rgb(3, 122, 255)'}}>
                  <StyledButton onClick={() => window.location.href = '/liked'} startIcon={<FavoriteIcon color='red' />} style={{ outline: 'none', color: 'white' }} aria-label="Home">Liked</StyledButton>
                </div>
              </div>
              :
              <div className={classes.sectionDesktop} style={{ marginLeft: 'auto', fontSize:15 }}>
                <IconButton style={{backgroundColor: 'rgb(40, 168, 69)'}} onClick={() => window.location.href = '/'} className={classes.iconButton}>
                  <HomeIcon />
                </IconButton>
                <IconButton style={{backgroundColor: 'rgb(255, 192, 8)'}} onClick={() => window.location.href = '/create'} className={classes.iconButton}>
                  <IoIosAddCircle />
                </IconButton>
                <IconButton style={{backgroundColor: 'rgb(3, 122, 255)'}} onClick={() => window.location.href = '/made'} className={classes.iconButton}>
                  <BuildIcon />
                </IconButton>
                <IconButton style={{backgroundColor: 'rgb(255, 192, 8)'}} onClick={() => window.location.href = '/voted'} className={classes.iconButton}>
                  <ThumbUpAltIcon />
                </IconButton>
                <IconButton style={{backgroundColor: 'rgb(3, 122, 255)'}} onClick={() => window.location.href = '/liked'} className={classes.iconButton}>
                  <FavoriteIcon />
                </IconButton>
              </div>
            }
          </Toolbar>
        </div>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: 6, 
    marginLeft: 15, 
    outline: 'none', 
    color: 'white',
  },
  button: {
    display: 'flex', 
    alignItems: 'center', 
    height: 35, 
    borderRadius: 5,
    marginLeft: 5,
  },
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
    backgroundColor: fade(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    marginLeft: 10,
    [theme.breakpoints.up(777)]: {
      marginLeft: 36,
      width: '100%',
    },
    marginRight: 10,
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
    width: 'auto',
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
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
    textTransform: 'capitalize',
  },
})(Button);
