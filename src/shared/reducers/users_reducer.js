
const {
	USERS,
	PENDING_USERS,
	ADD_USER,
	USER_APPROVED,
	UPDATE_USER,
	ROLES_LIST,
	ROLE_DETAILS,
	PERMISSIONS
} = require('../constants/actionTypes')

export default (state = {}, action) => {
	switch (action.type) {

		case USERS:
			return { ...state, list: action.payload }
		case PENDING_USERS:
			return { ...state, plist: action.payload }
		case ADD_USER:
			state.list.push(action.payload)
			return state
		case USER_APPROVED:
			return { ...state }
		case UPDATE_USER:
			return { ...state }
		case ROLES_LIST:
			return { ...state, roles: action.payload }
		case ROLE_DETAILS:
			return { ...state, roleDetails: action.payload }
		case 'USER_DETAILS':
			return { ...state, userDetails: action.payload }
		case PERMISSIONS:
			return { ...state, permissions: action.payload }

		default:
			return state;

	}
}