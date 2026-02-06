import React, {useState, useEffect, useRef} from 'react'
import './WordGame.scss'

const WordGame = ({startWord}) => {
    const [word, setWord]=useState(startWord)
    const [userInput, setUserInput]=useState("")
    const [message, setMessage]=useState("끝말잇기 시작!")
    const InputRef=useRef(null)

    useEffect(()=> {
        InputRef.current.focus()
    },[])

    const handleChange=(e)=>{
        setUserInput(e.target.value)

    }

    const checkWord=()=>{
        const currentInputValue = InputRef.current.value;
        const trimmdWord = currentInputValue.trim()

        if (!trimmdWord) {
            setMessage("단어를 입력하세요")
            return
        }
        const lastChar = word[word.length-1]
        const firstChar = trimmdWord[0]
        // console.log(lastChar, firstChar)

        if (lastChar !== firstChar) {
            setMessage(`'${lastChar}' 로 시작하는 단어를 입력하세요`)
            setUserInput("")
        }else{
            setMessage("성공! 다음 단어를 입력하세요!")
            setWord(trimmdWord)
            setUserInput("")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        checkWord();
    };
    return (
        <div className='game-container'>
            <h1>끝말잇기</h1>
            <p className='current-word'>
                {word}
            </p>

            <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            ref={InputRef}
            onChange={handleChange}
            value={userInput}/>
            <button onClick={checkWord}>확인</button>
            </form>

            <p className='message'>{message}</p>
        </div>
    )
    }

export default WordGame