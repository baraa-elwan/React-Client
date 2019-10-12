import axios from 'axios'

//const ipcRenderer = window.require('electron').ipcRenderer

//let token = ipcRenderer.sendSync('get_user_data');
let token = 'dfgrsf'
const options = {
	headers: { 'Authorization': `Bearer ${token}` }
};

// 1 - get list of clients
export function loadClients() {
	const URL = `http://localhost:9000`

	return (dispatch) => {
		axios.get(`${URL}\\clients`)
			.then(response => {
				dispatch(getClients(response.data))
			})
			.catch(err => { console.log(err) })
	}
}


export function getClients(clients) {
	return {
		type: 'CLIENTS_LIST',
		payload: clients
	}
}

// 2 - add new client

export function addClient(values) {
	const URL = `http://localhost:9000`
	////console.log(values)
	return (dispatch) => {
		return axios.post(`${URL}\\clients`, values)
			.then(res => {

				dispatch({
					type: 'ADD_CLIENT',
					payload: res.data
				})
			})
			.catch(err => console.log('err'))
	}
}

export function clientAdded(data) {
	return {
		type: 'ADD_CLIENT',
		payload: data.client
	}
}

// 3 - get Client Details
export function loadClient(id) {
	const URL = `http://localhost:9000`

	return (dispatch) => {
		return axios.get(`${URL}\\clients\\${id}`)
			.then(response => {

				////console.log(response.data)
				dispatch(getClient(response.data))
			})
			.catch(err => { console.log(err) })
	}
}


export function getClient(client) {
	return {
		type: 'CLIENT_DETAILS',
		payload: client
	}
}

// 4 - update client

export function updateClient(id, values) {
	////console.log(values)
	const URL = `http://localhost:9000`
	////console.log(values)
	return (dispatch) => {
		return axios.put(`${URL}\\clients\\${id}`, values)
			.then(res => {
				dispatch(clientUpdated(res.data))
			})
			.catch(err => console.log('err'))
	}
}

export function clientUpdated(data) {
	return {
		type: 'UPDATE_CLIENT',
		payload: data.client
	}
}

// 5 - delete a client

export function deleteClient(id, values) {
	////console.log(values)
	const URL = `http://localhost:9000`
	////console.log(values)
	return (dispatch) => {
		return axios.delete(`${URL}\\clients\\${id}`, values)
			.then(res => {
				dispatch(clientDeleted(res.data))
			})
			.catch(err => console.log('err'))
	}
}

export function clientDeleted(data) {
	return {
		type: 'DELETE_CLIENT',
		payload: data.client
	}
}

export function clientFiles(id) {
	const URL = `http://localhost:9000`

	return (dispatch) => {
		axios.get(`${URL}\\clients\\${id}\\files`)
			.then(response => {
				console.log(response.data)
				dispatch({
					type: 'CLIENT_FILES',
					payload: response.data
				})
			})
			.catch(err => { console.log(err) })
	}
}
