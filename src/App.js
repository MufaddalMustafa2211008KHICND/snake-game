import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [gameCanStart, setGameCanStart] = useState(true);
  const [message, setMessage] = useState('click the canvas to focus & then press any arrow key to start :)')
  const [moveUp, setMoveUp] = useState(190)
  const [moveSideways, setMoveSideways] = useState(190)
  const [direction, setDirection] = useState('')
  const [tail, setTail] = useState([])
  const [total, setTotal] = useState(0)
  const [foodPos, setFoodPos] = useState({ top: 10, left: 10 })

  useEffect(() => {
    foodLocation()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {

      if (gameCanStart && tail.length !== 0) {
        const newArr = [...tail]
        newArr.shift()
        newArr.push({ top: moveUp, left: moveSideways })
        setTail(newArr)

      }

      // if(tail.includes(foodPos)){
      //   foodLocation()
      // }

      // if(tail.some(elem => elem.top === moveUp && elem.left === moveSideways)){
      //   setGameCanStart(false)
      //   setMessage('You Died! Press F to restart')
      // }


      if (gameCanStart && foodPos.top === moveUp && foodPos.left === moveSideways) {
        setTotal(prev => prev + 1)
        foodLocation()
        setTail([...tail, { top: moveUp, left: moveSideways }])
      }

      switch (direction) {
        case 'up':
          if (gameCanStart && moveUp > 10) {
            if (tail.some(elem => elem.top === moveUp && elem.left === moveSideways)) {
              setGameCanStart(false)
              setMessage('You Died! Press F to restart')
            }
            else {
              setMoveUp(prev => prev - 20)
              setMessage('Game started!')
            }
          }
          else {
            setGameCanStart(false)
            setMessage('You Died! Press F to restart')
          }
          break;

        case 'down':
          if (gameCanStart && moveUp < 370) {
            if (tail.some(elem => elem.top === moveUp && elem.left === moveSideways)) {
              setGameCanStart(false)
              setMessage('You Died! Press F to restart')
            }
            else {
              setMoveUp(prev => prev + 20)
              setMessage('Game started!')
            }
          }
          else {
            setGameCanStart(false)
            setMessage('You Died! Press F to restart')
          }
          break;

        case 'right':
          if (gameCanStart && moveSideways < 370) {
            if (tail.some(elem => elem.top === moveUp && elem.left === moveSideways)) {
              setGameCanStart(false)
              setMessage('You Died! Press F to restart')
            }
            else {
              setMoveSideways(prev => prev + 20)
              setMessage('Game started!')
            }
          }
          else {
            setGameCanStart(false)
            setMessage('You Died! Press F to restart')
          }
          break;

        case 'left':
          if (gameCanStart && moveSideways > 10) {
            if (tail.some(elem => elem.top === moveUp && elem.left === moveSideways)) {
              setGameCanStart(false)
              setMessage('You Died! Press F to restart')
            }
            else {
              setMoveSideways(prev => prev - 20)
              setMessage('Game started!')
            }
          }
          else {
            setGameCanStart(false)
            setMessage('You Died! Press F to restart')
          }
          break;
      }

    }, 50)

    return () => {
      return clearInterval(interval)
    }

  }, [moveSideways, moveUp, direction, gameCanStart, tail])

  const handleKeys = (e) => {
    const key = e.key
    if (key === 'ArrowUp' && direction != 'down') {
      setDirection('up')
    }
    else if (key === 'ArrowDown' && direction != 'up') {
      setDirection('down')
    }
    else if (key === 'ArrowRight' && direction != 'left') {
      setDirection('right')
    }
    else if (key === 'ArrowLeft' && direction != 'right') {
      setDirection('left')
    }
    else if (key === 'f') {
      setTotal(0)
      setTail([])
      setDirection('')
      setGameCanStart(true)
      setMoveUp(190)
      setMoveSideways(190)
      setMessage('Boom! ready to go!! Press any arrow key to start!')
    }
  }

  const foodLocation = () => {
    let x, y;
    do {
      x = 10 + (Math.floor(Math.random() * 19) * 20)
      y = 10 + (Math.floor(Math.random() * 19) * 20)
    }
    while (tail.some((elem) => {
      if (elem.top === x && elem.left === y) {
        console.log("I'm within myself and i was avoided usingg a while loop :D, but to console I had to turn the single liner arrow into multiline fucking codeblock ;(")
        return true
      }
      else {
        return false
      }
    }) || (moveUp === x && moveSideways === y));

    setFoodPos({ top: x, left: y })
  }

  return (
    <div className="App">
      <h1>{total}</h1>
      <div className='canvas' tabIndex={'0'} onKeyDown={handleKeys}>
        <Food top={foodPos.top} left={foodPos.left} />
        {tail.map(item => <Snake top={item.top} left={item.left} />)}
        <Snake top={moveUp} left={moveSideways} />

      </div>
      <p style={{ fontSize: '22px' }}>{message}</p>
    </div>
  );
}

function Snake({ top, left }) {

  const snakeStyle = {
    height: '20px',
    width: '20px',
    backgroundColor: 'red',
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
  }

  return (
    <div style={snakeStyle}></div>
  )
}

function Food({ top, left }) {

  const foodStyle = {
    height: '20px',
    width: '20px',
    backgroundColor: 'purple',
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
  }

  return (
    <div style={foodStyle}></div>
  )
}

export default App;
