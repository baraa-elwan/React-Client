export default (state = {}, action) => {
	switch (action.type) {
    
        case 'CLIENT_FILES':
            return {...state, list: action.payload}
		default:
			return state;

	}
}