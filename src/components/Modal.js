import React from 'react';
import { Fragment } from 'react';

export default class Modal extends React.Component {
  render (){
    return (
      <Fragment>
        <div style={styles.addModalWrapper}> {/* className="add-modal-wrapper" */}
          <div style={styles.modall}>
            <div style={styles.closeModal}>
              <a style={styles.close}>×</a>
            </div>
            <div style={styles.addForm} id="addForm">
              <h4 style={styles.h4}>Delete this question?</h4>
              <div style={styles.whichone}>
                <div style={styles.closeModal}><button style={styles.btn} className="btn btn-success" type="button">No</button></div>
                <div style={styles.closeModal}>
                  <form method="post">
                    <button style={styles.btn} className="btn btn-danger" type="submit" name="delete">Yes</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const styles = {
  addModalWrapper: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 100,
    display: 'none',
  },
  modall: {
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
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 20,
  },
  close: {
    position: 'absolute',
    top: 12,
    right: 13,
    color: 'rgba(0, 0, 0, 1)',
    cursor: 'pointer',
  },

  addForm: {
    width: '90%',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 0,
    paddingRight: 10,
    paddingLeft: 0,
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