export default (state = {}, action) => {
	switch (action.type) {
		case 'CLIENTS_LIST':
			return {...state , list:action.payload}

		case 'ADD_CLIENT':
			
			console.log(action.payload)
			state.list.push(action.payload)
			return {...state}
		case 'CLIENT_DETAILS':
			return {...state , details:action.payload}

		case 'UPDATE_CLIENT':
			return {...state}	
		case 'CLIENTS_FILES':
			return {...state, files:action.payload}
		default:
			return state;

	}
}