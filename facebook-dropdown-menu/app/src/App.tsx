import React, { useState, useEffect, useRef } from 'react';
import './App.css'
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';
function App() {

  return (
    <div className="App">
      <Navbar>
        <NavItem icon={<PlusIcon />} />
        <NavItem icon={<BellIcon />} />
        <NavItem icon={<MessengerIcon />} />
      </Navbar>
    </div>
  )
}


interface NavbarProps {
  children?: React.ReactNode | React.ReactNode[];
}

function Navbar({children}: NavbarProps) {
  return (
    <nav className='navbar'>
      <ul className="navbar-nav"> {children} </ul>
    </nav>
  )
}

interface NavItemProps {
  icon: String | React.ReactNode
}

function NavItem ({icon}: NavItemProps) {

  return (
    <li className="nav-item">
      <a href="#" className="icon-button">
        {icon}
      </a>
    </li>
  )
}


export default App
