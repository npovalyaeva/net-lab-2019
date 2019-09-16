import React from 'react';
import '../styles/App.css';

import TextField from '@material-ui/core/TextField';

import { Header } from './Header';
import { Footer } from './Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="main-content">
        <div className="quote">
          <h3>“Reading brings us unknown friends.”</h3>
          <h5>Honoré de Balzac</h5>
        </div>
        <div className="registration-form">
          <TextField
            label="First Name"
          />
          <TextField
            label="Last Name"
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
