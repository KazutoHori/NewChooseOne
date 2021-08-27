import React, { Fragment } from 'react';
import { Bar } from 'react-chartjs-2';

export default function BarChart (props) {

  var { small, skeleton, labels, values, colors } = props;
  var duration = skeleton ? 0 : 5000 - small*3000;

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
    indexAxis: 'y',
    maintainAspectRatio: false,
    animation: {
      duration: 0,
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
    scales: {
      yAxes: [{
        barPercentage: .1,
        categoryPercentage: .4,
      }],
      xAxes: [{
        ticks: {
          min: 0,
          precision: 0,
        }
      }]
    },
    plugins: {
      legend: {
        display: false
      },
      labels: {
        render: 'value',
        precision: 0,
      }
    },
    layout: {
      padding: {
        // top: 13,
      },
    },
  };

  return (
    <Fragment>
      <Bar height={'auto'} data={data} options={options} />
    </Fragment>
  )
}