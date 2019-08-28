import React from 'react';
import '../styles/App.css';


import { Header } from './Header';
import { Footer } from './Footer';

import wallpaper from '../sources/wallpaper.jpg';

function App() {
  return (
    <div className="App">
      <Header/>
      <img
          src={wallpaper}
          width="100%"
          className="main-image"
          alt="Main image"
      />

      <Footer/>
    </div>
  );
}

export default App;
