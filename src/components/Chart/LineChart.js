import React from 'react'
import {Line} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment'


const LineChart = (props) => {

	let arrTemperature = []
	let temperatureUnits = ''
	props.data.map(item => {
		if (props.units === 'fahrenheight') {
			temperatureUnits = item.temp * 9 / 5 + 32;
			arrTemperature.push(Math.round(temperatureUnits))
		} else {
			arrTemperature.push(Math.round(item.temp))
		}
	})

	let arrTime = []
	props.data.map(item => {
		arrTime.push(moment.unix(item.dt).format('HH:mm'))
	})

	const maxTemp = 25;
	const minTemp = 0;
	const redVal = 255 / (maxTemp - minTemp) * (props.tempreature - minTemp);
	const blueVal = 255 / (maxTemp - minTemp) * (maxTemp - props.tempreature);

	const data = canvas => {
		const ctx = canvas.getContext("2d")
		const gradient = ctx.createLinearGradient(0, 0, 0, 50);
		gradient.addColorStop(0, `rgba(${redVal}, 154, ${blueVal}, 1)`);
		gradient.addColorStop(1, 'rgba(255, 241, 254, 1)');
		return {
			labels: arrTime,
			datasets: [
				{
					label: 'none',
					data: arrTemperature,
					backgroundColor: gradient,
					borderColor: 'transparent',
					pointBackgroundColor: 'transparent',
					fill: true,
					pointBorderWidth: 0,
					pointHoverRadius: 0,
					fontSize: 8,
					color: '#C5C5C5'
				},

			],
		}
	};

	const options = {
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				enabled: false
			},
			datalabels: {
				padding: {
					bottom: 0,
					left: 10
				},
				margin: {
					left: 10
				},
				font: {
					size: 8
				},
				color: '#C5C5C5',
				align: 'end',
				textAlign: 'end'
			}
		},
		scales: {
			xAxes: {
				display: true,
				beginAtZero: true,
				grid: {
					display: false,
					drawTicks: false
				},
				title: {
					display: false
				},
				ticks: {
					beginAtZero: true,
					font: {
						size: 8
					},
					color: '#C5C5C5',
					align: 'center',
				},
			},
			yAxes: {
				display: false,
			},
		},
		elements: {
			line: {
				tension: 0.4
			},
		},
		layout: {
			padding: {
				top: 10
			}
		}
	};

	return (
		<>
			<Line data={data} plugins={[ChartDataLabels]} height={50} options={options}/>
		</>
	)
}
export default LineChart;
