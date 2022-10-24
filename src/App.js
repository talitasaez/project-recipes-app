import React from 'react';
import './App.css';
import Login from './pages/Login';

function App() {
  return (
    <div className="container">
      <recipesProvider>
        <Login />
      </recipesProvider>
    </div>
  );
}

export default App;
