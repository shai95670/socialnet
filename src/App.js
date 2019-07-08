import React from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import LogInButton from './components/LogInButton.js';
import SignUpButton from './components/SignUpButton.js';
import NavBar from './components/NavBar';
//import NavBar from './components/NavBar.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <section className="section" id='utilityButtons'>
          <div className='container'>
            <LogInButton/> 
            <SignUpButton/>
          </div>
        </section>
      </div>     
    );
  }
}

export default App;
