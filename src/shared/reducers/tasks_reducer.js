
export default (state = {}, action)=>{
	switch (action.type) {
	
		case 'TASKS_LIST':
			return {...state, list:action.payload}
		case 'TASK_DETAIL':
			return {...state, details:action.payload}
			case 'ADD_TASK':
				return {...state}
		default:
			return state;

	}
}