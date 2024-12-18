import React, { useState } from "react";
import './TaskList.css'
function TaskList({tasks, deleteTask, deleteChecked}){
    const [checkData, setCheckData] = useState([]); 
    const getcheckedData = (taskId, isChecked) => { 
        if(isChecked){
            setCheckData(prevData => [...prevData, taskId]);
        }else{
            setCheckData(prevData => prevData.filter(item => item !== taskId));
        }
    };
    const handleDeleteChecked = (checkedTasks) => {
        deleteChecked(checkedTasks);
        setCheckData([])
    };
    return(
        <>
        <ul className="list">
            {tasks.map((task,index)=>(
                <Task key={task.id} id={task.id} task={task} index={index} deleteTask={()=>deleteTask(task.id)} checkData={getcheckedData}/>
               
            ))}
        </ul>
        <button className={`${checkData.length > 0 ? 'display' : 'hide'}`} onClick={()=>handleDeleteChecked(checkData)}>Delete Completed</button>
        </>
    );
}
export default TaskList;

function Task({ task, index, deleteTask, checkData}){
    const [isCompleted, setIsCompleted] = useState(false);
    const taskcompleted = ()=>{
        setIsCompleted(!isCompleted);
        checkData(task.id, !isCompleted);
    };

    return(
        <>
        <li className={`listitem ${isCompleted?'checked':''}`}>
            <div>
             {task.text}
            <input type="checkbox" name="taskDone" onClick={taskcompleted}/>   
            </div>
            <button onClick={deleteTask}>X</button>
        </li>
        
        </>
    );

}