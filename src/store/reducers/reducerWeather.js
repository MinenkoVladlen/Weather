// import { FETCH_DATA_WEATHER } from "../actionCreator/weatherAction";

export const INITIAL_STATE = []

export default function(state=INITIAL_STATE, action) {
	switch (action.type) {
		case "FETCH_DATA_WEATHER":
			return {...state, weatherArr: action.payload, isLoading: false};
		case 'LOADER_STATUS':
			return {...state, isLoading: action.payload}
	}
	return state;
}
