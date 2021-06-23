import React, { Fragment } from 'react';
import { Pie } from 'react-chartjs-2';

export default class PieChart extends React.Component {

  constructor(props){
    super(props);
  }

  render () {

    const { labels, values, colors } = this.props;

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
        duration: 5000,
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
        <Pie data={data} options={options} />
      </Fragment>
    )
  }
}