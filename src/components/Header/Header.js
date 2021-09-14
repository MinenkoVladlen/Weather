import React from 'react'
import SearchForm from '../SearchFrom/SearchForm'
import LanguageDropdown from '../LanguageDropdown/LanguageDropdown'

const Header = () => {

	return (
		<>
			<header>
				<SearchForm/>
				<LanguageDropdown/>
			</header>
		</>
	)
}

export default Header
