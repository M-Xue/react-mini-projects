import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'
import { DictionarySearchbar } from './components/dictionarySearchbar/DictionarySearchbar'
import { PokemonSearchbar } from './components/pokemonSearchbar/PokemonSearchbar.tsx'
import { WordInformation } from './components/wordInfomation/WordInformation';
import {CSSTransition} from 'react-transition-group';

export default function App() {
  // console.log('test')

  const [userSelection, setUserSelection] = useState<string | null>(null);
  const [isSearchBarActive, setIsSearchBarActive] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLInputElement | null>(null);


  // const handleOutsideClick = (e:MouseEvent) => {
  //   if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
  //     closeSearchBar();
  //     // console.log("first")
  //   }
  //   // console.log(searchBarRef);
  // }

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
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
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
        <DictionarySearchbar handleUserSelection={handleUserSelection} closeSearchBar={closeSearchBar} ref={searchBarRef}/>
      </CSSTransition>

      {/* {isSearchBarActive && <DictionarySearchbar handleUserSelection={handleUserSelection} ref={searchBarRef}/>} */}
      {userSelection && <WordInformation word={userSelection}/>}
    </div>
  )
}
