import React, {Component} from 'react'
import Card from "./Card";
import {connect} from 'react-redux'
import {getDataWeather} from "../../store/actionCreator/weatherAction";
import i18next from 'i18next'
import Loader from '../Loader/Loader'

const mapStateToProps = store => {
	return store
}
const mapDispatchToProps = (dispatch) => ({
	getDataWeather: e => dispatch(getDataWeather(e))
})

class CardContainer extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		this.getGeolocation()
		this.getLangugageUser()
	}

	getGeolocation() {
		let getUserSettingCity = JSON.parse(localStorage.getItem('select_user_cities'))
		if (!getUserSettingCity) {
			let dataCoordinate = {};
			navigator.geolocation.getCurrentPosition(position => {
				dataCoordinate.latitude = position.coords.latitude;
				dataCoordinate.longitude = position.coords.longitude;
				this.props.getDataWeather({dataCoordinate})
			});
		}
	}

	getLangugageUser() {
		let getLangugageUser = JSON.parse(localStorage.getItem('lang'))
		if (getLangugageUser) {
			i18next.changeLanguage(getLangugageUser)
		} else {
			localStorage.setItem('lang', JSON.stringify('en'))
		}
	}

	render() {
		return (
			<div className='card-container'>
				{this.props.weatherData.isLoading ? <Loader/>
					: this.props.weatherData.weatherArr && this.props.weatherData.weatherArr.length > 0
						? this.props.weatherData.weatherArr.map(item => {
							return <Card info={item} key={item.sys.id}/>
						}) : i18next.t('There is nothing here yet')}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
