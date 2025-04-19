import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import User from './User';
import Guest from './Guest';

function App() {
  return (
    <Admin/>
    //<User/>
    //<Guest/>
  );
}

export default App;