
//const { ipcRenderer } = window.require('electron')



export function checkLogin(status) {
  //let s = ipcRenderer.sendSync('get-app-status', status)
  let s = 'loggidIn'
  //console.log(s)
  return (dispatch) => {
    dispatch(f(s))
  }
}

function f(s) {
  return { type: 'GET_LOGIN', payload: s }
}

export function getUser() {
  let s = {}// ipcRenderer.sendSync('get_user_data')
  //console.log(s)
  return (dispatch) => {
    dispatch(f1(s))
  }
}

function f1(s) {
  return { type: 'USER_DATA', payload: s }
}