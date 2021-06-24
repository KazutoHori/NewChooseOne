import React, { Fragment } from 'react';
import Paginate from 'react-paginate';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default class Pagination extends React.Component {

  handlePaginate = ({selectedItem: { selected }}) => {
    const page = selected + 1;
  };

  render() {

    return (
      <Fragment>
        <Paginate
          totalRecords={this.props.questions}
          pageCount={this.props.questions.length / 5}
          marginPagesDisplayed={5}
          pageRangeDisplayed={5}
          onPageChange={this.handlePaginate}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="active"
          activeLinkClassName="active"
          previousLinkClassName="previous-link"
          nextLinkClassName="next-link"
          previousLabel={<ArrowBackIosIcon /> }
          nextLabel={<NavigateNextIcon /> }
          disabledClassName="disabled-button"
        />
      </Fragment>
    )
  }
}