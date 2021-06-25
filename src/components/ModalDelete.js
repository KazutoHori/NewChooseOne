import React, { Fragment } from 'react';

import Modal from '@material-ui/core/Modal';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
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

  const { onDelete, onClose } = this.props;
  const body = (
    <div style={styles.modal}>
      <div style={styles.addForm} id="addForm">
        <h4 style={styles.h4}>Delete this question?</h4>
        <div style={styles.whichone}>
          <ThemeProvider theme={theme}>
            <ButtonGroup variant="contained" >
              <Button onClick={onClose} startIcon={<CancelIcon/>} color='primary' >no</Button>
              <Button onClick={onDelete} startIcon={<DeleteIcon />} color='secondary' >yes</Button>
            </ButtonGroup>
          </ThemeProvider>
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

const styles = {
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
    marginTop: 5,
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
  }
}