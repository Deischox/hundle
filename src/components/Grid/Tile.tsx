

import { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { WorldeContext } from '../WordleContext'

interface Props {
    RowId: number,
    id: number
}

const Tile: NextPage<Props> = ({ RowId, id }) => {
    const [letter, setLetter] = useState("")
    const [completed, setCompleted] = useState(true)
    const [colors, setColors] = useState({ back: "white", font: "black" })

    const { guess, word, patterns, currentRow, completedRows } = useContext(WorldeContext) || {};

    useEffect(() => {
        if (currentRow === RowId) {
            setLetter(guess![id])
        }
        if (completedRows?.includes(RowId) && completed) {
            changeColor()
            setCompleted(false);
        }
    })

    const style = {
        backgroundColor: colors.back,
        color: colors.font
    }

    function changeColor() {
        if (patterns && patterns[RowId]) {
            switch (patterns[RowId][id]) {
                case "G":
                    return setColors({ back: "gray", font: "white" })
                case "Y":
                    return setColors({ back: "gold", font: "white" })
                case "C":
                    return setColors({ back: "lightgreen", font: "white" })
            }
        }
        return setColors({ back: "gray", font: "white" })
    }
    // REMOVED w-12 class

    // 420 max-width 65px per cell 6 cells
    return (
        <div style={style} className='flex justify-center my-[2px] m-[2px] max-w-[65px] items-center grow border-2 aspect-square'>
            <p className='flex self-center font-bold text-[1.6rem]'>{letter}</p>
        </div>)
}

export default Tile