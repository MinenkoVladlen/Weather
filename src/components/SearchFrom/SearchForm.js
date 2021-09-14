import React, {Component} from 'react'
import {connect} from 'react-redux'
import SelectCustom from 'react-select'
import selectStyles from '../SelectCustom/SelectStyles'
import {getDataWeather} from '../../store/actionCreator/weatherAction'
import { compose } from "redux";
import { withTranslation } from "react-i18next";


const mapStateToProps = store => {
	return store
}
const mapDispatchToProps = (dispatch) => ({
	getDataWeather: e => dispatch(getDataWeather(e))
})


class SearchForm extends Component {
	constructor() {
		super();
		this.state = {
			cityData: [
				{name: 'Cherkasy', label: 'Cherkasy, UA'},
				{name: 'Ivano-Frankivsk', label: 'Ivano-Frankivsk, UA'},
				{name: 'Kyiv', label: 'Kyiv, UA'},
				{name: 'Dnipro', label: 'Dnipro, UA'}
			],
			selectedCity: {}
		}
	}

	componentDidMount() {
		this.props.getDataWeather()
	}

	changeSelectCity(value) {
		if (this.state.selectedCity !== value) {
			this.setState({
				selectedCity: value
			})
		}
	}

	handleSubmit(event) {
		event.preventDefault()
		let getAlreadySelectCities = JSON.parse(localStorage.getItem('select_user_cities'))
		let getAlreadySelectCitiesFind = '';
		if (getAlreadySelectCities) {
			getAlreadySelectCitiesFind = getAlreadySelectCities.find(item => item === this.state.selectedCity.name)
		}
		if (!getAlreadySelectCitiesFind) {
			this.setInLocalstorage(this.state.selectedCity.name)
		}
	}

	setInLocalstorage(event) {
		let localCitiesUser = JSON.parse(localStorage.getItem('select_user_cities'))
		if (localCitiesUser) {
			localCitiesUser.push(event)
			localStorage.setItem('select_user_cities', JSON.stringify(localCitiesUser))
		} else {
			let createArr = [event]
			localStorage.setItem('select_user_cities', JSON.stringify( createArr ))
		}
		this.props.getDataWeather()
	}


	render() {
		const { t } = this.props;
		return (
			<>
				<form className="select-city__form" onSubmit={e => this.handleSubmit(e)}>
					<SelectCustom
						options={this.state.cityData}
						placeholder={t('City name') + '...'}
						styles={selectStyles}
						noOptionsMessage={() => t('No cities...')}
						onChange={e => this.changeSelectCity(e)}
					/>
					<button type="submit" className='button'>{t('Add')}</button>
				</form>
			</>
		)
	}
}

export default compose(withTranslation('translation'), connect(mapStateToProps, mapDispatchToProps))(SearchForm)
