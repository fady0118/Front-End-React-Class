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
    setTasks(prevTasks=>[...prevTasks, task]);
    console.log('adding task'+task)
  };

  const deleteTask = (index) => {
    setTasks(prevTasks=>{
      const newTasks = [...prevTasks];
      newTasks.splice(index,1);
      return newTasks;
    });
    console.log('deleting task at index: '+index)
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}
export default App;
