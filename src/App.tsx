// ...existing code...
import AppRoutes from './routes/AppRoutes';
import { Outlet } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <>
      <div className="container">
        <AppRoutes />
        <Outlet />
      </div>
    </>
  );
}

export default App;

