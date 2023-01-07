import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'
import { DictionarySearchBar } from './components/dictionarySearchBar/DictionarySearchBar'
import { PokemonSearchbar } from './components/pokemonSearchbar/PokemonSearchbar.tsx'
import { WordInformation } from './components/wordInfomation/WordInformation';
import {CSSTransition} from 'react-transition-group';

const CmdSvg = (
  <svg className='cmdIcon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
)

export default function App() {

  const [userSelection, setUserSelection] = useState<string | null>(null);
  const [isSearchBarActive, setIsSearchBarActive] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLInputElement | null>(null);

  const closeSearchBar = () => {
    setIsSearchBarActive(false);
  }
  const handleUserSelection = (selection:string) => {
    setUserSelection(selection);
    closeSearchBar();
  }
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.metaKey === true && event.key === 'k') {
      event.preventDefault();
      setIsSearchBarActive(prev => !prev);
    }
  }, []);

  useEffect(() => {
    if (searchBarRef.current) {
      searchBarRef.current.focus();
    }
  }, [isSearchBarActive])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="App">
      <div className="backgroundColor"></div>
      <CSSTransition
        nodeRef={null} 
        in={isSearchBarActive} 
        timeout={200} 
        classNames="search-bar"
        unmountOnExit={true}
      > 
        <DictionarySearchBar handleUserSelection={handleUserSelection} closeSearchBar={closeSearchBar} ref={searchBarRef}/>
      </CSSTransition>

      {userSelection && <WordInformation word={userSelection}/>}
      {!userSelection && <p className='prompt'>Press&nbsp; {CmdSvg} &nbsp;+ K</p>}
    </div>
  )
}
