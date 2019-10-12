
const axios = require('axios');

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

// const {HOST_URL} = require('../constants/api')

// 1 - get list of users
export function loadUsers() {
	const URL = `http://localhost:9000`

	return (dispatch) => {
		axios.get(`${URL}\\users`)
			.then(response => {
				
				dispatch(getUsers(response.data))
			})
			.catch(err => { console.log(err) })
	}
}




export function getUsers(users) {
	return {
		type: USERS,
		payload: users
	}
}

export function confirm(id, roles){
	const URL = `http://localhost:9000`
	console.log(id)
	return (dispatch) => {
		axios.put(`${URL}\\users\\${id}`, {rids:roles, pending:false})
			.then(response => {
				dispatch({type:UPDATE_USER, payload:response.data})
			})
			.catch(err => { console.log(err) })
	}
}

export function edit(id, data){
	const URL = `http://localhost:9000`
	console.log(id)
	return (dispatch) => {
		axios.put(`${URL}\\users\\${id}`, data)
			.then(response => {
				dispatch({type:UPDATE_USER, payload:response.data})
			})
			.catch(err => { console.log(err) })
	}
}

//2 - get list of pending users
export function loadPUsers() {
	const URL = `http://localhost:9000`

	return (dispatch) => {
		axios.get(`${URL}\\users\\requests`)
			.then(response => {
				dispatch(getPUsers(response.data))
			})
			.catch(err => { console.log(err) })
	}
}


export function getPUsers(users) {
	return {
		type: PENDING_USERS,
		payload: users
	}
}



export function addUser( values) {
	const URL = `http://localhost:9000`
	return (dispatch) => {
		return axios.post(`${URL}\\users`, values)
		.then(res => {

			dispatch(userAdded(res.data))
		})
		.catch(err => console.log(err))
	}
}

export function userAdded(data){
	return {
		type:ADD_USER,
		payload:data
	}
}

// 3 - approve user request

export function approveUser(id, values) {
	const URL = `http://localhost:9000`
	return (dispatch) => {
		return axios.put(`${URL}\\users\\${id}`, values)
		.then(res => {
			dispatch(userApproved())
		})
		.catch(err =>console.log(err))
	}
}

export function userApproved(){
	return{
		type:USER_APPROVED
	
	}
}


/**
 * Roles
 * -getRoleList
 * -update Role
 * -create Role
 */

export function loadRoles() {
	const URL = `http://localhost:9000`

	return (dispatch) => {
		axios.get(`${URL}\\roles`)
			.then(response => {
				dispatch(getRoles(response.data))
			})
			.catch(err => { console.log(err) })
	}
}


export function getRoles(roles) {
	return {
		type: ROLES_LIST,
		payload: roles
	}
}

export function loadRole(id) {
	const URL = `http://localhost:9000`

	return (dispatch) => {
		axios.get(`${URL}\\roles\\${id}`)
			.then(response => {
				dispatch(getRole(response.data))
			})
			.catch(err => { console.log(err) })
	}
}

export function AddRole(values) {
	const URL = `http://localhost:9000`

	return (dispatch) => {
		axios.post(`${URL}\\roles`, values)
			.then(response => {
				dispatch({type:'ADD_ROLE', payload:response.data})
			})
			.catch(err => { console.log(err) })
	}
}

export function roleEdit(data) {
    // console.log(data)
    return (dispatch) => dispatch ({ type: 'ROLE_DETAILS', payload: data })
}

export function userEdit(data) {
    // console.log(data)
    return (dispatch) => dispatch ({ type: 'USER_DETAILS', payload: data })
}
export function getRole(role) {
	return {
		type: ROLE_DETAILS,
		payload: role
	}
}


export function getPermissions(id) {
	const URL = `http://localhost:9000`

	return (dispatch) => {
		axios.get(`${URL}\\permissions`)
			.then(response => {
				dispatch({
					type: PERMISSIONS,
					payload: response.data
				})
			})
			.catch(err => { console.log(err) })
	}
}
