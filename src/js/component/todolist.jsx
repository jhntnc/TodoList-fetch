import React from "react"
import Delete from "./delete.jsx"

function TodoList (props) {
  
  return (
    <ol className="list-group">{props.list?.length > 0 && props.list.map((task,i) => {
      console.log(task.label)
      return <li className="list-group-item d-flex justify-content-between" key={i}>{task.label} <Delete key={i} llave={i} list={props.list} setList={props.setList}/></li>
    })}</ol>
  )
}

export default TodoList