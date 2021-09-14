import {combineReducers} from 'redux'
import weatherReduce from './reducers/reducerWeather'

export default combineReducers({
	weatherData: weatherReduce,
})
