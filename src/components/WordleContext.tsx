import { createContext } from "react";
import { LettersState } from "./letterState";

// State that can be used in multiple windows
interface WorldeContextType {
    guess: string;
    gameOver: boolean;
    won: boolean;
    word: string;
    patterns: string[];
    currentRow: number;
    dogImage: string;
    dogLink: string;
    completedRows: number[];
    pressEnter: () => void;
    guessTheWord: (char: string) => void;
    letters: { [letter: string]: LettersState };
    backspace: () => void;
}


export const WorldeContext = createContext<WorldeContextType | undefined>(undefined)
