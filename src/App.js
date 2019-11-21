import React from 'react';
import Timer from './Timer';
// import Footer from './Footer';
import Header from './Header';
import './App.scss';

function App() {
  return (
    <div style={{width:"100%",height:"100%"}} >
      <Header />
      <div id="main">
        <Timer />
      </div>
      {/* <Footer /> */}
    </div>
     
  );
}

export default App;
