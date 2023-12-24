import { createContext, useEffect, useState } from 'react'
import { LettersState } from '../components/letterState'
import { dictonary } from '../components/variables'
import { WorldeContext } from '../components/WordleContext'
import Board from '../components/Board'

import { neon } from '@neondatabase/serverless';

interface DogData {
  dogimagelink: string;
  doglink: string;
  dogname: string;
}

export async function getServerSideProps() {
  if (process.env.DATABASE_URL) {
    const sql = neon(process.env.DATABASE_URL);
    const response = await sql`SELECT * FROM dog ORDER BY RANDOM() LIMIT 1`;
    return { props: { data: response[0] } };
  }
  return { props: { data: {} } };
}


export default function Home({ data }) {
  const [word, setWord] = useState("")
  const [dogLink, setDogLink] = useState("")
  const [guess, setGuess] = useState("")
  const [dogImage, setDogImage] = useState("")
  const [patterns, setPatterns] = useState<string[]>([])
  const [completedRows, setCompletedRows] = useState<number[]>([])
  const [currentRow, setCurrentRow] = useState(0)
  const [letters, setLetters] = useState<{ [letter: string]: LettersState }>({});



  function guessTheWord(char: string) {
    if (char.length === word.length) return
    setGuess(guess.concat(char))
  }

  useEffect(() => {
    if (data) {
      console.log(data)
      setDogImage(data["dogimagelink"])
      setDogLink(data["doglink"])
      setWord(data['dogname'].toUpperCase())
    }
  }, [data])

  function pressEnter() {
    if (guess.length < word.length) return
    // if (!dictonary.includes(guess.toLowerCase())) return alert("Word not found in dictonary")
    // if (guess == word) alert("You won!!")
    setCompletedRows([...completedRows, currentRow])
    setCurrentRow(currentRow + 1)
    checkLettersInWord()
    createPatternForLastRow()
    setGuess("")
  }

  function addToDictionary(key: string, value: LettersState) {
    if (!letters.hasOwnProperty(key) || letters[key] !== LettersState.CORRECT) {
      setLetters(prevDictionary => ({
        ...prevDictionary,
        [key]: value,
      }));
    }
  };

  function checkLettersInWord() {
    for (var i = 0; i < word.length; i++) {
      if (guess[i] == word[i]) {
        addToDictionary(guess[i], LettersState.CORRECT)
      } else if (word.includes(guess[i])) {
        addToDictionary(guess[i], LettersState.IN)
      } else {
        addToDictionary(guess[i], LettersState.OUT)
      }
    }
  }

  function createPatternForLastRow() {
    var correct: number[] = []
    var half_correct: number[] = []
    var used: number[] = []
    for (var i = 0; i < guess.length; i++) {
      if (guess[i] === word[i]) {
        correct.push(i)
        used.push(i)
      }
    }
    for (var i = 0; i < word.length; i++) {
      for (var j = 0; j < word.length; j++) {
        if (guess[i] === word[j] && !used.includes(j)) {
          half_correct.push(i)
          used.push(j)
        }
      }
    }
    var final = ""
    for (var i = 0; i < guess.length; i++) {
      if (correct.includes(i)) final += "C"
      else if (half_correct.includes(i)) final += "Y"
      else final += "G"
    }
    console.log(final)
    setPatterns([...patterns, final])
  }

  function backspace() {
    setGuess(guess.slice(0, guess.length - 1))
  }



  return (
    <main className="items-center mx-auto">
      <WorldeContext.Provider value={{
        guessTheWord,
        pressEnter,
        completedRows,
        currentRow,
        letters,
        patterns,
        word,
        guess,
        dogImage,
        backspace,
        dogLink
      }}>
        <Board />
      </WorldeContext.Provider>
    </main>
  )
}

