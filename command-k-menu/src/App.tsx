import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { CommandKMenu } from './components/commandKMenu/CommandKMenu'

function App() {
  const menuRef = useRef<HTMLInputElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);

  const handleButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    // setIsMenuOpen(prev => !prev);
    menuRef.current?.focus();
  }

  return (
    <div className="App">
      {isMenuOpen && <CommandKMenu ref={menuRef} />}
      <button onClick={handleButtonClick}>Focus</button>
    </div>
  )
}

export default App
