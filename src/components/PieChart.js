import React, { Fragment } from 'react';
import { Pie } from 'react-chartjs-2';

export default function PieChart (props) {

  const { small, skeleton, labels, values, colors } = props;
  var duration = skeleton ? 0 : 5000;
  if(small) duration = 2000;

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