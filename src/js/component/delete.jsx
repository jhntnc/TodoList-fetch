import React from "react"

function Delete(props) {
    
    function deleteTask() {
        console.log(props.llave); 
        let newTaskList = props.list.filter(item => item !== props.list[props.llave])
        return props.setList(newTaskList)
    }
    fetch('https://assets.breatheco.de/apis/fake/todos/user/jhntnc', {
			method: "PUT",
			body: JSON.stringify([...props.list]),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(response =>{
				if(!response.ok){
					console.log("Response from PUT is not ok")
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(
				console.log("User list initialized")
				)
			.catch(error => {
				console.log('Looks like there was a problem doing POST: \n', error);
				return false
			})	


    return(
        <button className="btn btn-danger" onClick={() => deleteTask()}>X</button>    
    )
}

export default Delete