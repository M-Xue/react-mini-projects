import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './dictionarySearchbar.css';

interface Props {
  handleUserSelection: (input: string) => void;
}

export interface SearchBarRef {
  focus: () => void;
  containerRef: HTMLDivElement | null;
}
// <SearchBarRef, Props>
export const DictionarySearchbar = forwardRef<HTMLDivElement, Props>(({handleUserSelection}, ref) => {

  const [words, setWords] = useState<string[] | null>(null);
  const [matches, setMatches] = useState<string[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getWords = async () => {
      const wordsReq = await fetch('./words.json');
      const wordsData = await wordsReq.json();
      // console.log(wordsData);
      setWords(wordsData.words);
    }
    getWords();
  }, [])

  useEffect(() => {
    if (words) {
      inputRef.current?.focus();
    }
  }, [words])
  
  

  const handleSearch = (e) => {
    e.preventDefault();
    const userInput = e.target.value;

    if (userInput === '') {
      setMatches(null)
      return
    }

    const inputMatches = words?.filter(s => s.includes(userInput));
    if (inputMatches) {
      setMatches(inputMatches);
    }
  }

  // useImperativeHandle(ref, () => ({
  //   focus() {
  //     if (inputRef.current) {
  //       inputRef.current.focus();
  //     }
  //   },
  //   containerRef: containerRef.current,
  // }))


  return (
    <div className='dictionarySearchbarContainer' ref={ref}>
      <input type="text" className='inputBox' placeholder={words ? 'Type a word...' : 'Loading...'} disabled={words ? false : true} onChange={handleSearch}  ref={inputRef}/>
      <div className='wordResultsContainer'>{matches && matches.map((word, idx) => <div key={word} className='wordResult' onClick={() => handleUserSelection(word)}>{word}</div>)}</div>
    </div>
  )
})
