import React from 'react';
import './assets/css/App.css';
import TaskList from './components/taskList/taskList';


export default  function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TaskList/>
      </header>
    </div>
  );
}