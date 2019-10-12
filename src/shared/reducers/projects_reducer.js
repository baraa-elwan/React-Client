export default (state = {}, action) => {
	switch (action.type) {
		case 'PROJECTS_LIST':
			return { ...state, list: action.payload }
		case 'ADD_PROJECT':
			return {...state}
		case 'PROJECT_DETAILS':
			return { ...state, details: action.payload }
		case 'UPDATE_PROJECT':
			return { ...state }
		case 'PROJECT_FILES':
			return { ...state, project: action.payload.project, files: action.payload.files }
		case 'PROJECT_TASKS':
			return { ...state,  tasks: action.payload }
		default:
			return state;

	}
}