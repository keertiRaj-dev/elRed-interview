import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mybio from './mybio';
import MybioEdit from './mybioedit';
import Skills from './skills';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element ={<Mybio />} />
      <Route path="/my-bio-edit" element ={<MybioEdit />} />
      <Route path="/skills" element ={<Skills />} />
    </Routes>
    </Router>
  );
}

export default App;
