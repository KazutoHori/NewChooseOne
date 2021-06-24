import React, { Fragment } from 'react';
import { Bar } from 'react-chartjs-2';

export default class BarChart extends React.Component {

  constructor(props){
    super(props);
  }

  render () {
    const { skeleton, labels, values, colors } = this.props;
    var duration = skeleton ? 0 : 5000;

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
      legend: {
        display: false
      },
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
      scales: {
        xAxes: [{
          barPercentage: .5,
          categoryPercentage: .5,
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function(value) {if (value % 1 === 0) {return value;}}
          }
        }]
      },
      plugins: {
        labels: {
          render: 'value',
          precision: 0,
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
        <Bar data={data} options={options} />
      </Fragment>
    )
  }
}