import React, { Fragment } from 'react';
import Paginate from 'react-paginate';

export default class Pagination extends React.Component {

  handlePaginate = ({selectedItem: { selected }}) => {
    const page = selected + 1;
  };

  render() {

    return (
      <Fragment>
        <Paginate
          pageCount={this.props.questions.length / 10}
          marginPagesDisplayed={100}
          pageRangeDisplayed={5}
          onPageChange={this.handlePaginate}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="active"
          activeLinkClassName="active"
          previousLinkClassName="previous-link"
          nextLinkClassName="next-link"
          previousLabel={'<'}
          nextLabel={'>'}
          disabledClassName="disabled-button"
        />
      </Fragment>
    )
  }
}