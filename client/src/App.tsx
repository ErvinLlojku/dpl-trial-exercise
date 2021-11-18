import React from 'react';
import './App.scss';

import Birthday from './components/Birthday';
import BirthdayCakeIcon from './icons/BirthdayCakeIcon';

function App() {
  return (
    <div className="App">
      <div className="container">
        <header>
          <BirthdayCakeIcon />
          <h1 className="birthday_head">Enter your birthday</h1>
        </header>
        <Birthday />
      </div>
    </div>
  );
}

export default App;
