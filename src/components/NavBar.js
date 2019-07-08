import React from 'react';
import LogInButton from './LogInButton.js';
import SignUpButton from './SignUpButton.js';

class NavBar extends React.Component {
    render() {
      return (
        <div>  
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://bulma.io">
                      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
                    </a>

                    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </a>
                </div>

                <div class="navbar-item">
                    <div class="buttons">
                        <a className="button is-primary">
                            <strong>Developers</strong>
                        </a>
                        <SignUpButton className='button is-primary'/>
                        <LogInButton/>
                    </div>
                </div>
            </nav>
        </div>
      );
    }
}

export default NavBar;