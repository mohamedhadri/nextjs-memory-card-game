"use client"

import { useEffect, useState } from "react";
import Image from "next/image";


  const generateDeck = ()=>{
    const memoryCards=[
        'arrow',
        'dova',
        'khajit',
        'nord',
        'orc',
        'potion',
        'spider',
        'thief',
      ];
    const deck = [...memoryCards, ...memoryCards];
    return  deck.sort(()=> Math.random() -0.5)
}

    export default function MemoGame() {
    const [cards ,setCards]=useState<string[]>(generateDeck());
    const [flipped, setFlipped]= useState<number[]>([]);
    const [solved, setSolved]= useState<number[]>([]);

    useEffect(()=>{
        const checkForMatch = ()=>{
            
            const [first,second]= flipped;
            if(cards[first]===cards[second]){
                setSolved([...solved,...flipped])
            }
            setFlipped([]);
        }

        if(flipped.length ===2){
            setTimeout(() => {
                checkForMatch()
            }, 1000);
        }
    },[cards,flipped,solved])

    const handleClick = (index:number)=>{
        if(!flipped.includes(index) && flipped.length < 2){
            setFlipped([...flipped,index])
        }
    }

    const gameOver = solved.length === cards.length;
    const resetGame=()=>{
        generateDeck();
        setFlipped([]);
        setSolved([]);

    };

return (
    <div className="text-center">
        <h1 className="text-2xl font-bold">Meomory Game</h1>
        {gameOver && (<h2>you Won!!</h2>)}
        <div className="grid grid-cols-4 gap-5 mt-6"> 
        {cards.map((card, index)=>(

            <div className={`w-28 h-28 transform cursor-pointer bg-slate-200 
            flex justify-center items-center text-4xl font-bold transition-transform duration-300 ${flipped.includes(index) || solved.includes(index) ? 'rotate-180':''}`} 
                key={index}
                onClick={()=> handleClick(index)}>
                {flipped.includes(index) || solved.includes(index) ? (
                    <Image
                    className="rotate-180"
                    src={`/memo-cards/${card}.webp`} fill alt='memo cards'/>
                ): "?"}
                
            </div>
        ))}
        </div>
        <button onClick={resetGame} className="flex p-4 mt-4 bg-slate-500 rounded-md">Restart Game</button>

        <div className="   mx-auto h-14 w-40 flex justify-center items-center">
      <div className="i h-14 w-40 bg-pink-600 items-center rounded shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
      </div>
      <a className="text-center text-white font-semibold z-10 pointer-events-none">Restart Game</a>
    </div>

    <div>

    </div>
    </div>
)}