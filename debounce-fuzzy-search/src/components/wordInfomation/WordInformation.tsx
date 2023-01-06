import React, { useEffect, useState } from 'react'
import './wordInformation.css'

interface Props {
    word: string
}

export const WordInformation = ({word}:Props) => {
    const [wordTitle, setWordTitle] = useState<string>(word);
    useEffect(() => {
        const fetchWordInfo = async (word:string) => {
            const wordResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const wordData = await wordResponse.json();
            console.log(wordData);
        }
        fetchWordInfo(word);
    
    }, [word])
    
    return (
        <div className='wordInfoContainer'>{word}</div>
    )
}
