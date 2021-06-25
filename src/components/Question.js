import React, { Fragment } from 'react';
import Loading from 'react-loading';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function QuestionList (props) {

  const the_question = props.the_question;
  const notUseSkeleton = the_question !== 'skeleton';
  var choiceSkeleton = [];
  for(var i=0; i<5; i++){
    choiceSkeleton.push(
      <div>
        <input type="radio" name="choice" id="choice{i}"/>
        <label style={{ marginLeft: 8 }} for="choice{idx}">
          <SkeletonTheme Primarycolor="white" highlightColor="#d3d3d3">
            <Skeleton duration={2.5} color='white' width={100} height={10}/>
          </SkeletonTheme>
        </label>
        <br></br>
      </div>
    )
  }

  return (
    <Fragment>
      <div className='onepost'>
        <p className='cali2'><span className='text-primary fa fa-tag'></span>
          Category:
          {notUseSkeleton && (
            <Fragment>
              {the_question.category.map((cate, idx) => {
                if ( idx === 0){
                  return (<a className='text-primary' href={'/category/'+cate}> {cate}</a>)
                }else{
                  return (<a className='text-primary' href={'/category/'+cate}>, {cate}</a>)
                }
              })}
            </Fragment>
          )}
          {!notUseSkeleton && <Skeleton style={{ marginLeft: 10 }} width={60} />}
        </p>
        <h4 className='cali2'><a className='link' href={'/detail/'+the_question.slug}>{notUseSkeleton ? the_question.title : <SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2.5} width={'80%'} height={20}  /></SkeletonTheme> }</a></h4>
        <p className="date">&ensp;&ensp;&ensp;{notUseSkeleton ? the_question.created_on : <SkeletonTheme color="white" highlightColor="#d3d3d3"><Skeleton duration={2.5} width={100} height={7}  /></SkeletonTheme> } </p>
        <ul>
          {notUseSkeleton && (
            <Fragment>
              {the_question.choices.map((choice,idx) => (
                <div>
                  <input type="radio" name="choice" id="choice{idx}" value="{choice.id}" />
                  <label for="choice{idx}">&ensp;{choice.choice_text}</label>
                  <br></br>
                </div>
              ))}
            </Fragment>
          )}
          {!notUseSkeleton && [choiceSkeleton]}
        </ul>
      </div>
    </Fragment>
  );
}