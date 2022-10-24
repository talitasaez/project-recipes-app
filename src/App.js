import React from 'react';
import recipesProvider from './Context/recipesProvider';
import './App.css';

function App() {
  return (
    <div className="container">
      <recipesProvider>
        olá
      </recipesProvider>
    </div>
  );
}

export default App;
