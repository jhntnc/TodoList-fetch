import React from "react";

function Clear(props) {

    async function putClear() {

		if(props.list == []) {
			return alert("La lista ya está limpia")
		}else{
		props.setList([])

		await fetch('https://assets.breatheco.de/apis/fake/todos/user/jhntnc', {
			method:"DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})

		await fetch('https://assets.breatheco.de/apis/fake/todos/user/jhntnc', {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(response =>{
				if(!response.ok){
					console.log("Response from POST is not ok")
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

			
		}
    }

    return (
        <button className="btn btn-warning mt-4" onClick={() => putClear()}>Clear Todo List</button>
    )
}

export default Clear