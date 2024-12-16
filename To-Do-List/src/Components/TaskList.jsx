import React from "react";
import './TaskList.css'
function TaskList({tasks, deleteTask}){
    return(
        <>
        <ul className="list">
            {tasks.map((task,index)=>(
                <Task key={index} task={task} deleteTask={()=>deleteTask(index)}/>
            ))}
        </ul>
        </>
    );
}
export default TaskList;

function Task({ task, deleteTask}){
    return(
        <li className="listitem">
            {task}
            <button onClick={deleteTask}>X</button>
        </li>
    );
}