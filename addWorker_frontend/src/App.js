import { useNavigate } from 'react-router-dom';
import './App.css';



function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <h1>Add A Worker</h1>
        <button className='addworker-button' onClick={() => navigate('/Users')}>AddWorker</button>
      </header>
    </div>
  );
}

export default App;
