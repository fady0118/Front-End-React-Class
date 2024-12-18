import React, { useState, useEffect } from 'react';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      text:task,
    };
    setTasks(prevTasks=>[...prevTasks, newTask]);
    console.log('adding task'+newTask)
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    console.log('deleting task: '+ id)
  };

  const deleteChecked = (checkedIds) => {
    setTasks(prevTasks => prevTasks.filter((task) => !checkedIds.includes(task.id)));
  }
  
  return (
    <div className="App">
      <h1>To-Do List</h1>
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} deleteTask={deleteTask} deleteChecked={deleteChecked}/>
    </div>
  );
}
export default App;
