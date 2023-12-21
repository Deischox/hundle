import { NextPage } from 'next'
import Row from './Row'
import Keyboard from '../Keyboard/Keyboard'
import { useContext, useEffect, useState } from 'react'
import { WorldeContext } from '../WordleContext'



interface Props {
}

const Grid: NextPage<Props> = ({ }) => {
    const { word } = useContext(WorldeContext) || {};
    const rows = [1, 2, 3, 4, 5, 6]
    var [className, setClassName] = useState("hidden")

    useEffect(() => {
        if (!word) return
        switch (word.length) {
            case 1:
                setClassName(`grid  gap-px grid-cols-1 w-[70px]`)
                break;
            case 2:
                setClassName(`grid  gap-px grid-cols-2 w-[135px]`)
                break;
            case 3:
                setClassName(`grid  gap-px grid-cols-3 w-[200px]`)
                break;
            case 4:
                setClassName(`grid  gap-px grid-cols-4 w-[265px]`)
                break;
            case 5:
                setClassName(`grid  gap-px grid-cols-5 w-[330px]`)
                break;
            case 6:
                setClassName(`grid  gap-px grid-cols-6 w-[100%]`)
                break;
            case 7:
                setClassName(`grid  gap-px grid-cols-7 w-[460px]`)
                break;
            case 8:
                setClassName(`grid  gap-px grid-cols-8 w-[525px]`)
                break;

        }

    }, [word])

    return <div className={className}>
        {rows.map((item, index) => (<Row id={index} key={index} />))}
    </div>
}

export default Grid