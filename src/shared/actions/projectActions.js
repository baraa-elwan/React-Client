/**
 * 1. get list of projects (done)
 * 2. add new project
 * 3. get Project Details
 * 4. update project
 * 5. delete a project
 * 6. project files 
 * 7. project tasks
 */

import axios from 'axios'

const URL = `http://localhost:9000`

// 1 - get list of projects
export function loadProjects(clientId=null) {

	return (dispatch) => {

		let url = clientId? `${URL}\\clients\\${clientId}\\projects`:`${URL}\\projects`

		axios.get(url)
			.then(response => {
				dispatch(getProjects(response.data))
			})
			.catch(err => { console.log(err) })
	}
}


export function getProjects(projects) {
	return {
		type: 'PROJECTS_LIST',
		payload: projects
	}
}

// 2 - add new project

export function addProject( formdata, form1) {



		////console.log(formdata)
	return (dispatch) => {
		return axios.post(`${URL}\\projects`, formdata)
		.then(res => {

			console.log(form1)
			return axios.post(`${URL}\\files\\upload?project=${res.data.id}`, form1)

		})
		.then(res1=> dispatch(projectAdded(res1.data)))
		.catch(err =>  console.log(err))
	}
}

export function projectAdded(data){
	return {
		type:'ADD_PROJECT', 
		payload:data.project
	}
}

// 3 - get Project Details
export function loadProject(id) {
	
	return (dispatch) => {
		return axios.get(`${URL}\\projects\\${id}`)
			.then(response => {

				dispatch(getProject(response.data))
			})
			.catch(err => { console.log(err) })
	}
}


export function getProject(data) {
	////console.log(data)
	return {
		type: 'PROJECT_DETAILS',
		payload:data
	}
}

// 4 - update project

export function updateProject( id, values) {
	////console.log(values)
		////console.log(values)
	return (dispatch) => {
		return axios.put(`${URL}\\projects\\${id}`, values)
		.then(res => {
			dispatch(projectUpdated(res.data))
		})
		.catch(err =>  console.log('err'))
	}
}

export function projectUpdated(data){
	return {
		type:'UPDATE_PROJECT', 
		payload:data.project
	}
}

// 5 - delete a project

export function deleteProject( id, values) {
	////console.log(values)
		////console.log(values)
	return (dispatch) => {
		return axios.delete(`${URL}\\projects\\${id}`, values)
		.then(res => {
			dispatch(projectDeleted(res.data))
		})
		.catch(err => console.log('err'))
	}
}

export function projectDeleted(data){
	return {
		type:'DELETE_PROJECT', 
		payload:data.project
	}
}

// 6 - project files

export function projectFiles(id){
	return (dispatch) => {
		return axios.get(`${URL}\\projects\\${id}\\files`)
		.then(res => {
			dispatch({type:'CLIENT_FILES', payload:res.data})
		})
		.catch(err => console.log('err'))
	}

}
export function projectFiles1(data){
	return {
		type:'PROJECT_FILES', 
		payload:data
	}
}
// 7 - project tasks

export function loadProjectTasks(id){


	return (dispatch) => {
		axios.get(`${URL}\\projects\\${id}\\tasks`)
			.then(response => {
				dispatch(projectTasks(response.data))
			})
			.catch(err => { console.log(err) })
	}

}
export function projectTasks(data){
	return {
		type:'PROJECT_TASKS', 
		payload:data
	}
}