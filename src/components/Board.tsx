import { NextPage } from 'next'
import Keyboard from './Keyboard/Keyboard'
import Grid from './Grid/Grid'
import { useContext, useEffect, useState } from 'react'
import { FaPaw } from "react-icons/fa";
import { FaArrowRotateLeft, FaArrowsRotate, FaRegCircleQuestion } from "react-icons/fa6";

import { neon } from '@neondatabase/serverless';
import { WorldeContext } from './WordleContext';

export default function Board({ }) {
    const { dogImage, word, dogLink } = useContext(WorldeContext) || {};
    const [cardClass, setCardClass] = useState("flip-card-inner")
    const [cardClassFlip, setCardClassFlip] = useState("flip-card w-[80%]")
    const [front, setFront] = useState(false)
    const [data, setData] = useState({ dogName: "", dogImage: "", dogLink: "" })
    function flipCard() {
        if (front) {
            setCardClass("flip-card-inner")
        } else {
            setCardClass("flip-card-inner flip-card-flipping")
        }
        setFront(!front)
    }

    useEffect(() => {
        setTimeout(function () {
            if (!front) {
                flipCard()
            }
        }, 1000);
    }, [])

    useEffect(() => {
        console.log(dogImage, word)
    }, [dogImage])


    useEffect(() => {
        if (!word) return
        switch (word.length) {
            case 1:
                setCardClassFlip(`flip-card w-[70px]`)
                break;
            case 2:
                setCardClassFlip(`flip-card w-[135px]`)
                break;
            case 3:
                setCardClassFlip(`flip-card w-[200px]`)
                break;
            case 4:
                setCardClassFlip(`flip-card w-[265px]`)
                break;
            case 5:
                setCardClassFlip(`flip-card w-[330px]`)
                break;
            case 6:
                setCardClassFlip(`flip-card w-[370px]`)
                break;
            case 7:
                setCardClassFlip(`flip-card w-[460px]`)
                break;
            case 8:
                setCardClassFlip(`flip-card w-[525px]`)
                break;

        }

    }, [word])

    return <div className='align-center w-full flex justify-between flex-col min-h-[90vh] p-[6px]'>
        <div className="flex justify-between px-5">
            <div className="items-center flex">
                <FaPaw className="text-3xl" />
            </div>
            <h1 className='font-extrabold text-5xl m-4 text-center'>DOGLE</h1>
            <div className="items-center flex">
                <FaRegCircleQuestion className="text-3xl" />
            </div>

        </div>
        <div className="flex justify-center">

            {/* TODO Allign Grid and put button right  */}
            <div className={cardClassFlip}>
                <div className={cardClass}>
                    <div className="flip-card-front flex justify-around items-center flex-col">
                        <img src={dogImage} alt="Avatar" style={{ height: 300 }} />
                        <a target="_blank" href={dogLink} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'>Jetzt adoptieren</a>
                    </div>
                    <div className="flip-card-back">

                        <Grid />
                    </div>
                </div>
            </div>
            <div className="flex items-center pl-1" onClick={flipCard}>
                <div className="button text-3xl pl-2">

                    <FaArrowsRotate />
                </div>
            </div>

        </div>
        <Keyboard />
    </div>
}




