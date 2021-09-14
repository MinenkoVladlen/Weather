import React from 'react'

const selectStyles = {

	control: () => ({
		background: "#FFFFFF 0% 0% no-repeat padding-box;",
		border: 'none',
		borderRadius: 5,
		opacity: 1,
		width: 250,
		height: 40,
		outline: 'none',
		display: 'flex',
		boxShadow: '0px 3px 6px #00000029'
	}),
	menu: (styles, state) => ({
		...styles,
		width: 250,
		color: '#000000',
		boxShadow: '0px 3px 6px #00000029',
		marginTop: 10,
		paddingBottom: 5
	}),
	option: (styles, {isFocused}) => {
		return ({
			backgroundColor: isFocused ? '#F2F2F2' : '#FFFFFF',
			fontSize: 14,
			paddingLeft: 5,
			paddingRight: 5,
			cursor: 'pointer'
		})
	},
	menuList: () => ({
		color: '#000000'
	}),
	indicatorSeparator: () => ({
		display: 'none'
	}),
	dropdownIndicator: () => ({
		display: 'none'
	}),
}

export default selectStyles;
