import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './dictionarySearchBar.css';
import { levenshteinDistance } from '../../util/levenshtein-distance';
import { debounce } from 'lodash';

interface Props {
  handleUserSelection: (input: string) => void;
  closeSearchBar: () => void;
}

export const DictionarySearchBar = forwardRef<HTMLDivElement, Props>(({handleUserSelection, closeSearchBar}, ref) => {

  const [words, setWords] = useState<string[] | null>(null);
  const [matches, setMatches] = useState<string[] | null>(null);
  const [noMatches, setNoMatches] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const outsideClickWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (e:MouseEvent) => {
    if (outsideClickWrapperRef.current && !outsideClickWrapperRef.current.contains(e.target)) {
      closeSearchBar();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    const getWords = async () => {
      const wordsReq = await fetch('./words.json');
      const wordsData = await wordsReq.json();
      setWords(wordsData.words);
    }
    getWords();

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      debouncedHandleSearch.cancel();
    };
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
      setMatches(null);
      setNoMatches(false);
      return;
    }

    // const inputMatches = words?.filter(s => s.includes(userInput));

    // * This implementation allows misspelling of the word
    const inputMatches = words?.filter((word) => {
      // word.includes(userInput);
      if (levenshteinDistance(userInput, word) <= 1 || word.includes(userInput)) {
        return true;
      }
    });

    if (inputMatches?.length === 0) {
      setNoMatches(true);
      setMatches(null);
      return;
    }

    const levenshteinDistanceSort: string[][] = []; // Could use an object here instead of an array to reduce space complexity but that would increase the time complexity because you need to check if the distance is in the object keys
    inputMatches?.forEach((match) => {
      const dist = levenshteinDistance(userInput, match);
      if (dist > levenshteinDistanceSort.length - 1) {
        for (const i in [...Array(dist - (levenshteinDistanceSort.length - 1)).keys()]) {
          levenshteinDistanceSort.push([]);
        }
      }
      levenshteinDistanceSort[dist].push(match);
    })

    if (inputMatches) {
      let res: string[] = [];

      levenshteinDistanceSort.forEach((order: string[]) => {
        res = res.concat(order);
      })

      setMatches(res);
      setNoMatches(false);
      return;
    }
  }

  // Source: https://dmitripavlutin.com/react-throttle-debounce/
  const debouncedHandleSearch = useCallback(
    debounce(handleSearch, 300)
  , [words]);

  return (
    <div className='dictionarySearchBarContainer' ref={ref}>
      <div className="outsideClickWrapper" ref={outsideClickWrapperRef}>
        <input type="text" className='inputBox' placeholder={words ? 'Type a word...' : 'Loading...'} disabled={words ? false : true} onChange={debouncedHandleSearch}  ref={inputRef}/>
        {matches && <div className='wordResultsContainer'>{matches && matches.map((word, idx) => <div key={word} className='wordResult' onClick={() => handleUserSelection(word)}>{word}</div>)}</div>}
        {noMatches && <div className='wordResultsContainer'><div className='noMatchesResult'>No matches</div></div>}
      </div>
    </div>
  )
})
