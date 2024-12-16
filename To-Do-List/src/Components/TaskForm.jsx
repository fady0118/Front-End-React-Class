import React, { useState } from "react";

function TaskForm({addTask}){
    const [task, setTask] = useState('');

    const handleSubmit = () => {
         if (task.trim()!=='') { 
            addTask(task); 
            setTask(''); 
        }else { 
            console.log('Task cannot be empty');
        } 
    };

    return(
        <>
            <div className="container">
                <input type="text" name="addtask" value={task} id="addtask" onChange={(e)=>{setTask(e.target.value)}}/>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </>
    );
}
export default TaskForm;