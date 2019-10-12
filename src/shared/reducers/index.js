import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import tasks from './tasks_reducer'
import clients from './clients_reducer'
import projects from './projects_reducer'
import users from './users_reducer'
import settings from './appReducers'
import files from './fileReducer'

const rootReducer = combineReducers({

		form:formReducer,
		tasks,
		clients,
		projects,
		users,
		settings,
		files
		// requests
	})
export default rootReducer