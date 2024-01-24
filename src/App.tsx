import './App.scss';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="container-app">
      <div className='header-app'>
        <h1>Activity Money $$</h1>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
