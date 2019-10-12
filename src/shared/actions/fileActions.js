
export function uploadFiles(form){

    const URL = `http://localhost:9000`

	return (dispatch) => {
		axios.get(`${URL}\\files\\upload?projectId${res.data.id}`)
			.then(response => {
				dispatch(getClients(response.data))
			})
			.catch(err => { console.log(err) })
	}
}