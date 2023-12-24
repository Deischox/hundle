import { NextPage } from 'next'
import Key from './Key'
import { useContext } from 'react'
import { WorldeContext } from '../WordleContext'
import { FaLongArrowAltLeft } from 'react-icons/fa'

interface Props { }

const Keyboard: NextPage<Props> = ({ }) => {
    const set1 = ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"]
    const set2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const set3 = ["Y", "X", "C", "V", "B", "N", "M"]

    const { letters } = useContext(WorldeContext) || {};


    //TODO convert Set1 and Set2 into one function

    function Set1() {
        if (!letters) return
        return (
            <div
                style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: "3" }}>
                {
                    set1.map((char, index) => <Key key={index} letter={char} state={letters[char]} />)
                }
            </div>
        )
    }

    function Set2() {
        if (!letters) return
        return (
            <div
                style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: "3" }}>
                {
                    set2.map((char, index) => <Key key={index} letter={char} state={letters[char]} />)
                }
            </div>
        )
    }

    function Set3() {
        if (!letters) return
        return (
            <div
                style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: "3" }}>
                <Key big={true} letter={"Enter"} state={0} />
                {
                    set3.map((char, index) => <Key key={index} letter={char} state={letters[char]} />)
                }
                <Key big={true} letter={<FaLongArrowAltLeft />} state={0} />
            </div>
        )
    }
    return (
        <div className='w-full'>
            <Set1 />
            <Set2 />
            <Set3 />
        </div>

    )
}

export default Keyboard