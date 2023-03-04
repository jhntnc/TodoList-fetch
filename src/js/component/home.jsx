import React, {useEffect, useState} from "react";
import TodoList from "./todolist.jsx"
import Clean from "./clean.jsx"

const Home = () => {

	const [list, setList] = useState([])
	useEffect(() => {
		
		todoList()
	},[])
	const inputNewTask = document.getElementById("inputNewTask")

	function keyPress(e){

		if (e.key === 'Enter' && list.map((task) => task.label).includes(inputNewTask.value)) {
            alert("Esta tarea ya existe")
            e.target.value = ""
        }else if (e.key === 'Enter' && e.target.value != "") {
            setList([...list,{"label": inputNewTask.value , "done": false}])
            e.target.value = ""
			newTodo({"label": inputNewTask.value , "done": false})
        }else if (e.key === 'Enter' && e.target.value == "") {
            alert("Debe ingresar una tarea")
        }
	}

	async function newTodo (newObjet) {

		await fetch('https://assets.breatheco.de/apis/fake/todos/user/jhntnc', {
			method: "PUT",
			body: JSON.stringify([...list], newObjet),
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
				console.log('Looks like there was a problem doing PUT: \n', error);
				return false
			})	
	}
	
	function todoList() {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/jhntnc')
	  .then(resp => resp.json())
	  .then(data => {
		  //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
		  console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
		setList(data)
		  
		})
		.catch(error => {
		  //manejo de errores
		  console.log(error);
		});
	  }

	
	return (
		<div className="text-center container mt-2" >
			<input className="mt-4 mb-4" placeholder="Add new task" id="inputNewTask" type="text" onKeyPress={(e) => keyPress(e)}/>
			<TodoList list={list} setList={setList}/>
			<Clean list={list} setList={setList}/>

		</div>
	);
};

export default Home;
