import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import { IoIosAddCircle } from "react-icons/io";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import BuildIcon from '@material-ui/icons/Build';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import logo from '../ChooseOne1.png';
import logoSmall from '../ChooseOne60.png';
import logoMedium from '../ChooseOne80.png';

var tabColors = ['#ff69b4']
for(var i=1; i<11; i++) tabColors.push('hsla('+(i*100)+', 75%, 55%, 1)');


export default function PrimarySearchAppBar() {
  
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [query, setQuery] = useState('');
  const smallDisplay = useMediaQuery('(max-width:500px)');
  const smallerThan1200 = useMediaQuery('(max-width:1200px)');
  const smallerThan900 = useMediaQuery('(max-width:990px)');

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const onSubmitSearch = (event) => {
    if(query.length === 0) return null;
    window.location.href = '/search/' + query;
  }

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
      <AppBar className={styles.grow} style={{ height: smallerThan900 ? 35 : smallerThan1200 ? 40 : 44 }} position="static">
        <div className={!smallDisplay && 'container'}>
          <Toolbar style={{ padding: 0 }}>
            {smallerThan900 && <a href="/" className={styles.logo}><img src={logoSmall} alt="ChooseOne" /></a>}
            {!smallerThan900 &&  smallerThan1200 && <a href="/" className={styles.logo}><img src={logoMedium} alt="ChooseOne" /></a>}
            {!smallerThan1200 && <a href="/" className={styles.logo}><img src={logo} alt="ChooseOne" /></a>}
            <div className={styles.search} style={{ height: smallerThan900 ? 28 : smallerThan1200 ? '60%' : '80%' }} >
              <div className={styles.searchIcon}>
                <SearchIcon />
              </div>
              <div style={{ width: '100%' }}>
                <InputBase
                  placeholder="Search"
                  className={styles.inputInput}
                  inputProps={{ 'aria-label': 'search' }}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(e) => {if(e.key === 'Enter'){e.preventDefault(); onSubmitSearch(); }}}
                />
              </div>
            </div>
            {!smallerThan900
              ?
              <div className={styles.sectionDesktop} style={{ marginLeft: 'auto' }}>
                <div className={styles.button} style={{ backgroundColor: 'rgb(40, 168, 69)'}}>
                  <StyledButton onClick={() => window.location.href = '/'} startIcon={<HomeIcon />} className={styles.buttonStyle} aria-label="Home">Home</StyledButton>
                </div>
                <div className={styles.button}  style={{ backgroundColor: 'rgb(255, 192, 8)'}}>
                  <StyledButton onClick={() => window.location.href = '/create'} startIcon={<IoIosAddCircle />} className={styles.buttonStyle} aria-label="Home">Add</StyledButton>
                </div>
                <div className={styles.button}  style={{ backgroundColor: 'rgb(3, 122, 255)'}}>
                  <StyledButton onClick={() => window.location.href = '/made'} startIcon={<BuildIcon />} className={styles.buttonStyle} aria-label="Home">Made</StyledButton>
                </div>
                <div className={styles.button}  style={{ backgroundColor: 'rgb(255, 192, 8)'}}>
                  <StyledButton onClick={() => window.location.href = '/voted'} startIcon={<ThumbUpAltIcon />} className={styles.buttonStyle} aria-label="Home">Voted</StyledButton>
                </div>
                <div className={styles.button}  style={{ backgroundColor: 'rgb(3, 122, 255)'}}>
                  <StyledButton onClick={() => window.location.href = '/liked'} startIcon={<FavoriteIcon />} className={styles.buttonStyle} aria-label="Home">Liked</StyledButton>
                </div>
              </div>
              :
              <div className={styles.sectionDesktop} style={{ marginLeft: 'auto', fontSize:15 }}>
                <IconButton style={{backgroundColor: 'rgb(40, 168, 69)'}} onClick={() => window.location.href = '/'} className={styles.iconButton}>
                  <HomeIcon style={{ fontSize: 18 }} />
                </IconButton>
                <IconButton style={{backgroundColor: 'rgb(255, 192, 8)'}} onClick={() => window.location.href = '/create'} className={styles.iconButton}>
                  <IoIosAddCircle style={{ fontSize: 18 }} />
                </IconButton>
                <IconButton style={{backgroundColor: 'rgb(3, 122, 255)'}} onClick={() => window.location.href = '/made'} className={styles.iconButton}>
                  <BuildIcon style={{ fontSize: 18 }} />
                </IconButton>
                <IconButton style={{backgroundColor: 'rgb(255, 192, 8)'}} onClick={() => window.location.href = '/voted'} className={styles.iconButton}>
                  <ThumbUpAltIcon style={{ fontSize: 18 }} />
                </IconButton>
                <IconButton style={{backgroundColor: 'rgb(3, 122, 255)'}} onClick={() => window.location.href = '/liked'} className={styles.iconButton}>
                  <FavoriteIcon style={{ fontSize: 18 }} />
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
    border: 'none',
    '&:focus': {
      outline: 'none'
    }
  },
  button: {
    display: 'flex', 
    alignItems: 'center', 
    height: 35, 
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonStyle: {
    fontSize: 12, 
    outline: 'none', 
    color: 'white',
  },
  grow: {
    // backgroundColor: '#FF3333',
    // backgroundColor: 'red',
    backgroundColor: '#ff4500',
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
    width: '100%',
    marginLeft: 10,
    [theme.breakpoints.up(777)]: {
      marginLeft: 36,
    },
    marginRight: 5,
  },
  searchIcon: {
    paddingLeft: 15,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    color: 'white',
    width: '100%',
    paddingTop: 1,
    fontSize: 15,
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
