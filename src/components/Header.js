import React from 'react';
import '../styles/Header.css';
import logo from '../logo.png';
import newtabicon from '../assets/newtab.svg';

const Header = ({ hideBorder }) => {
    return (
        <header className={`header ${hideBorder ? 'no-border' : ''}`}>
            <a href="/">
                <img src={logo} alt="Project Lux logo" height="90" width="90" />
            </a>
            <a href="https://www.theprojectlux.org/" target="_blank" className="header-link">
                Nonprofit
                <img src={newtabicon} alt="Open in new tab" height="15" width="15" />
            </a>
        </header>
    )
}

export default Header;