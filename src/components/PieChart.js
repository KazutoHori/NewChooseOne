import React, { Fragment } from 'react';
import { Pie } from 'react-chartjs-2';

export default function PieChart (props) {

  var { small, skeleton, labels, values, colors } = props;
  var duration = skeleton ? 0 : 5000 - small*3000;

  // if(skeleton){
  //   labels = ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'];
  //   values = [40, 20, 10, 10 ];
  //   colors = ['rgb(238, 238, 143)', 'rgb(143, 240, 159)', 'rgb(143, 207, 239)', 'rgb(239, 144, 175)'];
  //   if(small){
  //     labels.pop();
  //     values.pop();
  //     colors.pop();
  //   }
  // }

  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderColor: colors,
        hoverBackgroundColor: colors,
        borderWidth: 2,
        hoverBorderColor: colors,
        hoverBorderWidth: 7,
        borderSkipped: 'top'
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    animation: {
      duration: duration,
    },
    tooltips: {
      backgroundColor: 'white',
      titleFontColor: 'black',
      caretSize: 5,
      callbacks: {
        labelColor: function(tooltipItem, chart){
          return {
            borderColor: 'white',
            backgroundColor: 'white',
          }
        },
        labelTextColor: function(tooltipItem, chart){
          return 'black';
        },
      }
    },
    plugins: {
      legend: {
        display: false
      },
      labels: {
        render: 'value',
        precision: 0,
        legend: false,
      }
    },
    layout: {
      padding: {
        top: 13,
      },
    },
  };

  return (
    <Fragment>
      <Pie data={data} options={options} />
    </Fragment>
  )
}