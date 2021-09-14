import React, {Component} from 'react'
import Moment from "react-moment";
import LineChart from '../Chart/LineChart'
import {getDataWeather} from "../../store/actionCreator/weatherAction";
import {connect} from "react-redux";
import {compose} from "redux";
import {withTranslation} from "react-i18next";

const mapStateToProps = store => {
	return store
}
const mapDispatchToProps = (dispatch) => ({
	getDataWeather: e => dispatch(getDataWeather(e))
})

class Card extends Component {
	constructor() {
		super();
		this.state ={
			activeUnits: 'celcius'
		}
	}

	componentDidMount() {
		let getLocalUnits = JSON.parse(localStorage.getItem('active_units'))
		if (getLocalUnits) {
			this.setState({
				activeUnits: getLocalUnits
			})
		}
	}

	setActiveUnits(units) {
		localStorage.setItem('active_units', JSON.stringify(units))
		this.setState({
			activeUnits: units
		})
	}

	setToFahrenheight(value) {
		return Math.round(value * 9 / 5 + 32)
	}

	removeCity() {
		let getArrCities = JSON.parse(localStorage.getItem('select_user_cities'))
		let getIndexCity = getArrCities.indexOf(this.props.info.name)
		getArrCities.splice(getIndexCity, 1)
		localStorage.setItem('select_user_cities', JSON.stringify(getArrCities))
		this.props.getDataWeather()
	}

	render() {
		const { t } = this.props;
		return (
				<div className='card'>
					<div className='card-head'>
						<div className='card-head__location'>
							<div className='card-head__title'>
								<p className='title'>{this.props.info.name}, {this.props.info.sys.country}</p>
								<div className='card-head__cloudy'>
									<img src={`http://openweathermap.org/img/w/${this.props.info.curret.weather[0].icon}.png`} alt={this.props.info.curret.weather[0].main} />
									<p>{this.props.info.curret.weather[0].main}</p>
								</div>
							</div>
							<p className='card-head-location__info'><Moment format={'dddd, Do MMMM, HH:mm '}>{(new Date)}</Moment></p>
						</div>
						<div className='card-head__close' onClick={e => this.removeCity()}>
							<span>&times;</span>
						</div>
					</div>
					<LineChart height={50} data={this.props.info.hourly.slice(0, 7)} tempreature={this.props.info.curret.temp} units={this.state.activeUnits}/>
					<div className='card-info'>
						<div className='card-info__temperature'>
							<div className='card-info-temperature__main'>
								<span>+{this.state.activeUnits === 'fahrenheight' ?
									this.setToFahrenheight(this.props.info.curret.temp) :
									Math.round(this.props.info.curret.temp)}</span>
								<div className='card-info__switch'>
									<span onClick={() => {
										this.setActiveUnits('celcius')
									}} className={this.state.activeUnits === 'celcius' ? 'active' : ''}>°C</span>
									<span onClick={() => {
										this.setActiveUnits('fahrenheight')
									}} className={this.state.activeUnits === 'fahrenheight' ? 'active' : ''}>°F</span>
								</div>
							</div>
							<div className='card-info-temperature__feels'>
								{t('Feels like')}: {this.state.activeUnits === 'fahrenheight' ?
								this.setToFahrenheight(this.props.info.curret.feels_like) :
								Math.round(this.props.info.curret.feels_like)}
								{this.state.activeUnits === 'fahrenheight' ? '°F' : '°C'}
							</div>
						</div>
						<div className='card-info__secondary'>
							<div className='card-info-secondary__item'>{t('Wind')}: <span>{this.props.info.curret.wind_speed} m/s </span></div>
							<div className='card-info-secondary__item'>{t('Humidity')}: <span>{this.props.info.curret.humidity}% </span></div>
							<div className='card-info-secondary__item'>{t('Pressure')}: <span>{this.props.info.curret.pressure}Pa </span></div>
						</div>
					</div>
				</div>
		)
	}
}
export default compose(withTranslation('translation'), connect(mapStateToProps, mapDispatchToProps))(Card)
