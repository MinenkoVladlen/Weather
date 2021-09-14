import React, {Component} from 'react'
import Dropdown from 'react-select'
import DropdownStyles from '../SelectCustom/DropdownCustom'
import i18next from 'i18next'
import {connect} from "react-redux";
import {getDataWeather} from "../../store/actionCreator/weatherAction";


const mapStateToProps = store => {
	return store
}
const mapDispatchToProps = (dispatch) => ({
	getDataWeather: e => dispatch(getDataWeather(e))
})


class LanguageDropdown extends Component {
	constructor() {
		super();
		this.state = {
			languages: [
				{name: 'en', label: 'EN'},
				{name: 'ua', label: 'UA'},
				{name: 'ru', label: 'RU'}
			],
			activeLang: {name: 'en', label: 'EN'}
		}
	}

	componentDidMount() {
		this.getLocalUserLang()
	}

	changeLanguage = lng => {
		i18next.changeLanguage(lng.name);
		localStorage.setItem('lang', JSON.stringify(lng.name))

		let findInLanguages = this.state.languages.find(item => item.name === lng)
		this.setState({
			activeLang: findInLanguages
		})
		this.props.getDataWeather()
	};

	getLocalUserLang = () => {
		let getLang = JSON.parse(localStorage.getItem('lang'))
		if (getLang) {
			let findInLanguages = this.state.languages.find(item => item.name === getLang)
			this.setState({
				activeLang: findInLanguages
			})
		}
	}

	render() {
		return (
			<>
				<Dropdown
					styles={DropdownStyles}
					options={this.state.languages}
					defaultValue={this.state.activeLang}
					value={this.state.activeLang}
					onChange={lng => this.changeLanguage(lng)}
					isSearchable={false}
				/>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageDropdown)
