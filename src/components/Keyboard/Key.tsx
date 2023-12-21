
import { NextPage } from 'next'
import { useCallback, useContext, useEffect, useState } from 'react'
import { LettersState } from '../letterState'
import { WorldeContext } from '../WordleContext'


interface Props {
    big?: boolean,
    letter: any,
    state: LettersState
}

// TODO: use css file instead 
const Key: NextPage<Props> = ({ big, letter, state }) => {

    const { guessTheWord, pressEnter, backspace } = useContext(WorldeContext) || {};

    if (big) {
        return (
            <button
                onClick={() => {
                    if (pressEnter && backspace) {
                        if (letter == "Enter") {
                            pressEnter();
                        } else {
                            backspace();
                        }
                    }
                }}
                style={{
                    width: 55,
                    height: 50,
                    margin: 3,
                    borderRadius: 3,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 15,
                    backgroundColor: "#d3d6da",
                    color: "black",
                    fontFamily: "Arial",
                    cursor: "pointer",
                    border: 0,
                    fontWeight: "bold"
                }}
            >
                {letter}
            </button>
        )
    }

    return (
        <button
            onClick={() => {
                if (guessTheWord) guessTheWord(letter);
            }}
            style={{
                height: 50,
                width: 32,
                margin: 3,
                borderRadius: 3,
                display: "grid",
                placeItems: "center",
                fontSize: 15,
                backgroundColor: state === LettersState.CORRECT ? "lightgreen" : state === LettersState.IN ? "gold" : state === LettersState.OUT ? "gray" : "#d3d6da",
                color: state !== undefined ? "white" : "black",
                fontFamily: "Arial",
                cursor: "pointer",
                border: 0,
                fontWeight: "bold"
            }}
        >
            {letter}
        </button>
    )
}

export default Key