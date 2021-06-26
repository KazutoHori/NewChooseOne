import React, { Fragment, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import logoSmall from '../ChooseOne80.png';

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}


const useStyles = makeStyles((theme) => ({
  grow: {
    height: 40,
    backgroundColor: 'red',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -7,
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

export default function PrimarySearchAppBar() {
  const [query, setQuery] = useState('');

  const onSubmitSearch = (event) => {
    if(query.length === 0) return null;
    window.location.href = '/search/' + query;
  }

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
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <a href="/" className={classes.logo}><img src={logoSmall} alt="ChooseOne" /></a>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon size='small' />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(e) => {if(e.key === 'Enter'){e.preventDefault(); onSubmitSearch(); }}}
            />
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon size='small' style={{ outline: 'none', border: 'none'}} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}


//   return (
//     <Fragment>
//       <CssBaseline />
//       <ElevationScroll {...props}>
//         <AppBar className={styles.header}>
//           <Toolbar>
//             <a href="/" className={styles.logo}><img src={smallDisplay ? logoSmall : logo} alt="ChooseOne" /></a>
//             <div className={styles.search}>
//               <div className={styles.searchIcon}>
//                 <SearchIcon />
//               </div>
//               <InputBase
//                 placeholder="Search…"
//                 classes={{
//                   root: styles.inputRoot,
//                   input: styles.inputInput,
//                 }}
//                 inputProps={{ 'aria-label': 'search' }}
//               />
//             </div>
//           </Toolbar>
//         </AppBar>
//         {/* <div >
//           <a href="/" className={styles.logo}><img src={smallDisplay ? logoSmall : logo} alt="ChooseOne" /></a>
//           <div>
//             <SearchIcon className={styles.searchIcon} />
//             <form onKeyDown={(e) => {if(e.key === 'Enter'){e.preventDefault(); onSubmitSearch(); }}} className={styles.search}>
//               <input type='text' value={query} onChange={(event) => setQuery(event.target.value)} className="form-control" placeholder="Search"  />
//             </form>
//           </div>
//         </div> */}
//       </ElevationScroll>
//       <div style={{ width: '100%', height: 40 }}></div>
//     </Fragment>
//   )
// }

// const useStyles = makeStyles((theme) => createStyles({
//   scrollToTop: {
//     position: 'fixed',
//     bottom: theme.spacing(2),
//     right: theme.spacing(2),
//   },
//   header: {
//     position: 'fixed',
//     top: 0,
//     width: '100%',
//     height: 40,
//     zIndex: 2,
//     backgroundColor: 'red',
//     display: 'flex',
//     flexDirection: 'row',
//     textAlign: 'center',
//     alignItems: 'center',
//   },

//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(3),
//       width: 'auto',
//     },
//   },
//   inputRoot: {
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));