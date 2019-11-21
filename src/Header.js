import  React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper light-green darken-2">
                <a href="#" className="brand-logo">Meditation timer </a>
                {/* <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">JavaScript</a></li>
                </ul> */}
                </div>
          </nav>
                
        )
    }
}
