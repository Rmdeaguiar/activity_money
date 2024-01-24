import './App.scss';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="container-app">
      <header>
        <h1>Activity Money $$</h1>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
