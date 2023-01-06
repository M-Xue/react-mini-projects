import React, { useEffect, useState } from 'react'
import './wordInformation.css'

interface Props {
    word: string
}

interface Definition {
    definition: string;
    example: string;
    synonyms: string[];
    antonyms: string[];
}

interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
}

interface Word {
    word: string;
    phonetic: string;
    phonetics: any[];
    origin: string;
    meanings: Meaning[]
}

export const WordInformation = ({word}:Props) => {
    const [wordData, setWordData] = useState<Word[]| null>(null);
    useEffect(() => {
        const fetchWordInfo = async (word:string) => {
            setWordData(null);
            const wordResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const wordData = await wordResponse.json();
            console.log(wordData);
            setWordData(wordData);
        }
        fetchWordInfo(word);
    
    }, [word])
    
    return (
        <div className='wordInfoContainer'>
            {
                wordData 
                ? 
                <>
                    <h1 className='name'>{wordData[0].word.charAt(0).toUpperCase() + wordData[0].word.slice(1)}</h1>
                    {wordData[0].meanings.map((meaning, i) => {
                        return <div className='meaning' key={i}>
                            <h2>{meaning.partOfSpeech.charAt(0).toUpperCase() + meaning.partOfSpeech.slice(1)}</h2>
                            <ul className='definitionList'>
                                {meaning.definitions.map((def, i) => {
                                    return <li className='definition' key={i}>
                                        {def.definition}
                                    </li>
                                })}
                            </ul>
                        </div>
                    })}
                </>
                :
                <div>Loading...</div>
            }
        </div>
    )
}
