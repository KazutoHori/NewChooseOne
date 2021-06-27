import React, { Fragment, useState } from 'react';
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
import { BsFillAwardFill } from 'react-icons/bs';

import logoSmall from '../ChooseOne80.png';

var tabColors = ['#ff69b4']
for(var i=1; i<11; i++) tabColors.push('hsla('+(i*100)+', 75%, 55%, 1)');

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
  const [categoryAnchorEl, setCategoryAnchorEl] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rankingAnchorEl, setRankingAnchorEl] = React.useState(null);

  const isCategoryMenuOpen = Boolean(categoryAnchorEl);
  const isMenuOpen = Boolean(anchorEl);
  const isRankingMenuOpen = Boolean(rankingAnchorEl)

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
      <MenuItem style={{color: tabColors[0] }} onClick={() => window.location.href = '/category/Love'}>Love</MenuItem>
      <MenuItem style={{color: tabColors[1] }} onClick={() => window.location.href = '/category/News'}>News</MenuItem>
      <MenuItem style={{color: tabColors[2] }} onClick={() => window.location.href = '/category/Sports'}>Sports</MenuItem>
      <MenuItem style={{color: tabColors[3] }} onClick={() => window.location.href = '/category/Pastime'}>Pastime</MenuItem>
      <MenuItem style={{color: tabColors[4] }} onClick={() => window.location.href = '/category/Health'}>Health</MenuItem>
      <MenuItem style={{color: tabColors[5] }} onClick={() => window.location.href = '/category/Living'}>Living</MenuItem>
      <MenuItem style={{color: tabColors[6] }} onClick={() => window.location.href = '/category/Career'}>Career</MenuItem>
      <MenuItem style={{color: tabColors[7] }} onClick={() => window.location.href = '/category/'}>Academics</MenuItem>
      <MenuItem style={{color: tabColors[8] }} onClick={() => window.location.href = '/category/IT'}>IT</MenuItem>
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
      <MenuItem style={{color: tabColors[0] }} onClick={() => window.location.href = '/category/Love'}>Love</MenuItem>
      <MenuItem style={{color: tabColors[1] }} onClick={() => window.location.href = '/category/News'}>News</MenuItem>
      <MenuItem style={{color: tabColors[2] }} onClick={() => window.location.href = '/category/Sports'}>Sports</MenuItem>
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
    >
      <MenuItem style={{ margin: 0, paddingBottom: 0, paddingTop: 0 }}>
        <IconButton style={{ outline: 'none' }}  aria-label="Home" color="inherit">
          <HomeIcon />
        </IconButton>
        <div style={{ display: 'flex', alignItems: 'center'}}><p style={{ margin: 0 }}>Home</p></div>
      </MenuItem>
      <MenuItem onClick={(event) => setRankingAnchorEl(event.currentTarget)}  style={{ margin: 0, paddingBottom: 0, paddingTop: 0 }}>
        <IconButton style={{ outline: 'none' }}  aria-label="Ranking" color="inherit">
          <BsFillAwardFill />
        </IconButton>
        <div style={{ display: 'flex', alignItems: 'center'}}><p style={{ margin: 0 }}>Ranking</p></div>
      </MenuItem>
      <MenuItem onClick={(event) => setCategoryAnchorEl(event.currentTarget)}  style={{ margin: 0, paddingBottom: 0, paddingTop: 0 }}>
        <IconButton style={{ outline: 'none' }}  aria-label="Home" color="inherit">
          <LocalOfferIcon />
        </IconButton>
        <div style={{ display: 'flex', alignItems: 'center'}}><p style={{ margin: 0 }}>Category</p></div>
      </MenuItem>
      <MenuItem style={{ margin: 0, paddingBottom: 0, paddingTop: 0 }}>
        <IconButton style={{ outline: 'none' }}  aria-label="About ChooseOne" color="inherit">
          <InfoIcon />
        </IconButton>
        <div style={{ display: 'flex', alignItems: 'center'}}><p style={{ margin: 0 }}>About</p></div>
      </MenuItem>
      <MenuItem style={{ margin: 0, paddingBottom: 0, paddingTop: 0 }}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          style={{ outline: 'none' }} 
        >
          <ContactSupportIcon />
        </IconButton>
        <div style={{ display: 'flex', alignItems: 'center'}}><p style={{ margin: 0 }}>Contact Us</p></div>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar className={classes.grow} position="static">
        <Toolbar style={{paddingLeft: 10, paddingRight:  10}}>
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