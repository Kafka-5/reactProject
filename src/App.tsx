import TasksManager from './components/TaskManager/TaskManager';
import FocusTimer from './components/FocusTimer/FocusTimer';
import MotivationPanel from './components/MotivationalPannel/MotivationalPannel';

import './App.css'

function App() {
   return (
    <div className="dashboard">
      <h1 className="title">Dashboard</h1>

      <div className="grid">
        <div className="card">
          <TasksManager />
        </div>

        <div className="card ">
          <FocusTimer />
        </div>
        <div className="card ">
          <MotivationPanel /> 
        </div>
      </div>
    </div>
  );
}

export default App
