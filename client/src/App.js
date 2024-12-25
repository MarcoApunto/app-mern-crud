import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import Mecanico from './pages/MecanicoPage';
import Encargado from './pages/EncargadoPage';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route className="App_2" path="/mecanico" element={<Mecanico/>}/> 
        <Route className="App_2" path="/encargado" element={<Encargado/>}/>
        <Route className="App" path="/" element={<LoginForm/>}/>
      </Routes>
    </Router>
  );
}
export default App;