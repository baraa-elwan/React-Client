import axios from 'axios';

// 1 - get list of tasks
export function loadTasks() {
	const URL = `http://localhost:9000`

	return (dispatch) => {
		axios.get(`${URL}\\tasks`)
			.then(response => {
				console.log(response)
				dispatch(getTasks(response.data))
			})
			.catch(err => { console.log(err) })
	}
}

export function getTasks(tasks) {
	return {
		type: 'TASKS_LIST',
		payload: tasks
	}
}

// 1 - get task details
export function loadTask(id) {
	const URL = `http://localhost:9000`

	return (dispatch) => {
		axios.get(`${URL}\\tasks\\${id}`)
			.then(response => {
				console.log(response.data)
				dispatch(getTask(response.data))
			})
			.catch(err => { console.log(err) })
	}
}

export function getTask(task) {
	return {
		type: 'TASK_DETAIL',
		payload: task
	}
}

// add new Task

export function addTask( values) {
	const URL = `http://localhost:9000`
	console.log(values)
	return (dispatch) => {
		
		return axios.post(`${URL}\\tasks`, values)
		.then(res => {
			console.log(res)
			dispatch(taskAdded(res.data))
		})
		.catch(err => console.log(err))
	}
}

export function taskAdded(data){
	return {
		type:'ADD_TASK', 
		payload:data
	}
}



