import React from "react";
import loaderGif from './loader.gif'

const Loader = () => {

	return (
		<>
			<div className='loader-container'>
				<img src={loaderGif} alt='loader' />
			</div>
		</>
	)
}

export default Loader
