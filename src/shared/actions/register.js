import axios from 'axios';


const URL = `http://localhost:9000`
const REGISTER = 'REGISTER'
//const {ipcRenderer} = window.require('electron')

export function register(values) {

    return (dispatch) => {

        axios.post(`${URL}\\register`, values)
            .then(res => {

                let reg_status, userData
                if (res.status == 200) {
                    reg_status = 'REGISTERED';
                    userData = res.data
                   // ipcRenderer.send('REGISTERED_DATA', userData)
                }
                else {
                    reg_status = 'UNREGISTERED';
                    userData = null
                }

                //console.log(reg_status)
                dispatch(f(reg_status, userData))


            }).catch(err =>{ 

                //console.log(err)
                dispatch(f('EXISTED', null))
            })
    }
}

export function f(status, data) {
    return { type: REGISTER, state: status, payload: data }
}