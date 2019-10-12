import axios from 'axios';

const URL = `http://localhost:9000`

const LOGIN = 'LOGIN'

//const {ipcRenderer} = window.require('electron')


export function login(values) {

	return (dispatch) => {

		axios.post(`${URL}\\login`, values)
			.then(res => {

				dispatch(f('loggedin'))
				//ipcRenderer.send('LOGGEDIN', {user:res.data.user,token : res.data.token, time:new Date()})	

			}).catch(err => {

			})
	}
}

export function f(status) {
	return { type: LOGIN, payload: status }
}

export function logout(){
	let res = ''//ipcRenderer.sendSync('LOGOUT')

	return (dispatch) =>{
		dispatch(f1(res=='loggedout'?'no':'yes'))

	}
}

  
  function f1(s) {
	return { type: 'GET_LOGIN', payload: s }
  }