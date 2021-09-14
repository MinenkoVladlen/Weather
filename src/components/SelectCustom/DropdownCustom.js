import React from 'react'

const dropdownCustom = {
	control: () => ({
		background: "#FFFFFF 0% 0% no-repeat padding-box;",
		border: 'none',
		borderRadius: 5,
		opacity: 1,
		width: 70,
		outline: 'none',
		display: 'flex',
		cursor: 'pointer'
	}),
	menu: (styles, state) => ({
		...styles,
		top: '50%',
	}),
	dropdownIndicator: (provided, state) => {
		return ({
			transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : '',
			display: 'flex',
			alignItems: 'center'
		})
	},
	indicatorSeparator: () => ({
		display: 'none'
	}),
	option: (styles, {isFocused}) => {
		return ({
			backgroundColor: isFocused ? '#F2F2F2' : '#FFFFFF',
			fontSize: 14,
			padding: 5,
			cursor: 'pointer'
		})
	},
	valueContainer: (styles, state) => ({
		...styles,
		padding: 0,
	})
}

export default dropdownCustom
