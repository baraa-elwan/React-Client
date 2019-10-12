export default (state = {}, action) => {
	switch (action.type) {
		case 'GET_LOGIN':
			return {...state , loggedIn:action.payload}
		case 'LOGIN':
			return {...state, log:action.payload}
		case 'USER_DATA':
			return {...state, userData:action.payload}
		case 'REGISTER':
			return {...state, registered:action.state, userData: action.payload}
            default:
                return state;
    
	}
}