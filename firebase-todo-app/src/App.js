import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { ToDoFormAndList } from './database';
import SignIn from './components/signIn'
import { LoggedIn } from './components/context';





function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <LoggedIn.Provider value = {{loggedIn, setLoggedIn}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />

          <Route path="/toDo" element={<ToDoFormAndList />} />
        </Routes>
      </BrowserRouter>
    </LoggedIn.Provider>
  )
}

export default App;