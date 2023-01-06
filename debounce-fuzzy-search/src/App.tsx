import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'
import { DictionarySearchBar } from './components/dictionarySearchBar/DictionarySearchBar'
import { PokemonSearchbar } from './components/pokemonSearchbar/PokemonSearchbar.tsx'
import { WordInformation } from './components/wordInfomation/WordInformation';
import {CSSTransition} from 'react-transition-group';

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
    </div>
  )
}
