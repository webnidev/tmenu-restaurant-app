import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


import './App.css';

const MenuNav = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/contato">Contato</Link>
    </nav>
  );
};


function App() {
  return (
    <>
    <BrowserRouter>
    <MenuNav/>
      <Routes>
        <Route path="/" element={<h1>Olá Route!</h1>} end/>
        <Route path="/contato" element={<h1>Contato</h1>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;