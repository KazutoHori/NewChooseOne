import React, { useState, Fragment } from 'react';

import Modal from '@material-ui/core/Modal';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles, createStyles } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { WindMillLoading } from 'react-loadingg';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(3, 122, 255)',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default function ModalDelete (props) {

  const { onDelete, onClose } = props;
  const [deleting, setDeleting] = useState(false);
  const styles = useStyles();
  const smallDisplay = useMediaQuery('(max-width:500px)');

  const handleDelete = () => {
    setDeleting(true);
    onDelete()
  }

  const body = (
    <div className={styles.modal}>
      <div className={styles.addForm} id="addForm">
        <h4 className={styles.h4}>Delete this question?</h4>
        <div className={styles.whichone}>
          {!deleting 
            ?
            <ThemeProvider theme={theme}>
              <ButtonGroup variant="contained" >
                <Button onClick={onClose} startIcon={<CancelIcon/>} color='primary' >no</Button>
                <Button onClick={handleDelete} startIcon={<DeleteIcon />} color='secondary' >yes</Button>
              </ButtonGroup>
            </ThemeProvider>
            :
            <WindMillLoading speed={1} style={{ marginTop: 0 }} size={smallDisplay ? 'small' : 'large'} />
          }
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      <Modal
        open={true}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Fragment>
  )
}

const useStyles = makeStyles(() => createStyles({
  modal: {
    position: 'absolute',
    top: '20%',
    left: '35%',
    right: '35%',
    backgroundColor: '#F0EEEE',
    borderRadius: 10,
    width: 'auto',
    height: 'auto',
    textAlign: 'center',
    paddingTop: 20,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 20,
    filter: 'drop-shadow(0px 0px 5px rgba(160, 160, 160, 0.7))',
  },

  addForm: {
    width: '80%',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 0,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  h4: {
    letterSpacing: 1,
    marginBottom: 20,
    fontSize: 20,
  },
  whichone: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  closeModal: {
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 0,
    marginRight: 5,
    marginLeft: 5,
  },
  btn: {
    width: 80,
    height: 35,
    paddingTop: 4,
    paddingRight: 10,
    paddingLeft: 8,
    paddingBottom: 10,
    borderRadius: 30,
  },

  '@media (max-width: 500px)': {
    modal: {
      top: '30%',
      left: '10%',
      right: '10%',
    }
  }
}));