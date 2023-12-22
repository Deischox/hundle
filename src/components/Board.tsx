import { NextPage } from 'next'
import Keyboard from './Keyboard/Keyboard'
import Grid from './Grid/Grid'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { FaPaw } from "react-icons/fa";
import { FaArrowRotateLeft, FaArrowsRotate, FaRegCircleQuestion } from "react-icons/fa6";
import { Dialog, Transition } from '@headlessui/react'
import { neon } from '@neondatabase/serverless';
import { WorldeContext } from './WordleContext';

export default function Board({ }) {
    const { dogImage, word, dogLink } = useContext(WorldeContext) || {};
    const [cardClass, setCardClass] = useState("flip-card-inner")
    const [cardClassFlip, setCardClassFlip] = useState("flip-card w-[80%]")
    const [front, setFront] = useState(false)
    const [data, setData] = useState({ dogName: "", dogImage: "", dogLink: "" })

    const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null)

    function flipCard() {
        if (front) {
            setCardClass("flip-card-inner")
        } else {
            setCardClass("flip-card-inner flip-card-flipping")
        }
        setFront(!front)
    }

    function closePopUp() {
        setOpen(false)
        setTimeout(function () {
            if (!front) {
                flipCard()
            }
        }, 1000);
    }

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

                <a target="_blank" href='https://hunderettung-europa.de/hund-adoptieren'>
                    <FaPaw className="text-3xl" />
                </a>

            </div>
            <h1 className='font-extrabold text-5xl m-4 text-center'>DOGLE</h1>
            <div className="items-center flex">
                <button title='QuestionButton' onClick={() => setOpen(true)}>
                    <FaRegCircleQuestion className="text-3xl" />
                </button>
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                        How To Play
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">

                                                            - Guess the name of the Dog in 6 tries. <br />
                                                            - Each guess must be the same size as the dog name<br />
                                                            - The color of the tiles will change to show how close your guess was to the word.<br />

                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={() => closePopUp()}
                                                ref={cancelButtonRef}
                                            >
                                                Start
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>

        </div>
        <div className="flex justify-center">

            {/* TODO Allign Grid and put button right  */}
            <div className={cardClassFlip}>
                <div className={cardClass}>
                    <div className="flip-card-front flex justify-around items-center flex-col">
                        <img src={dogImage} alt="Avatar" className="w-[90%]" />
                        {/* <a target="_blank" href={dogLink} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'>Jetzt adoptieren</a> */}
                    </div>
                    <div className="flip-card-back flex items-center">

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




