import React, { Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

export default class QuestionList extends React.Component {

  render() {
    const { question } = this.props;
    if (question === null){
      return (
       <Loading type='bars' color='#751' />
      )
    }

    return (
      <Fragment>
        <div className='onepost'>
          <p className='cali2'><span className='text-primary fa fa-tag'></span>
            Category:
            {question.category.map((cate, idx) => {
              var len = question.category.length;
              if ( idx === 0){
                return (
                  <a class='text-primary' href={'/category/'+cate}> {cate}</a>
                )
              }else{
                <a class='text-primary' href={'/category/'+cate}>, {cate}</a>
              }
            })}
          </p>
          <h4 className='cali2'><a className='link' href={'/detail/'+question.slug}>{question.title}</a></h4>
          <p class="date">&ensp;&ensp;&ensp;{ question.created_on } </p>
          <ul>
            {question.choices.map((choice,idx) => (
              <div>
                <input type="radio" name="choice" id="choice{idx}" value="{choice.id}" />
                <label for="choice{idx}">&ensp;{choice.choice_text}</label>
                <br></br>
              </div>
            ))}
          </ul>
        </div>
      </Fragment>
    );
  }
}