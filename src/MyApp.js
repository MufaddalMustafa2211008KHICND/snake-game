import logo from './logo.svg';
import './App.css';
import { useEffect, useReducer, useState } from 'react';

function MyApp() {

  const [gameCanStart, setGameCanStart] = useState(true);
  const [message, setMessage] = useState('click the canvas to focus & then press any arrow key to start :)')
  // const [moveUp, setMoveUp] = useState(190)
  // const [moveSideways, setMoveSideways] = useState(190)
  const [direction, setDirection] = useState('')
  const [total, setTotal] = useState(0)
  const [foodPos, setFoodPos] = useState({ top: 10, left: 10 })
  const [tail, tailActionDispatch] = useReducer(tailReducer, [])
  const [head, headActionDispatch] = useReducer(headReducer, {top: 190, left: 190})

  function headReducer(state, action) {
    switch (action.type) {
      case 'moveUp':
        return {...state, top: state.top-20}

      case 'moveDown':
        return {...state, top: state.top+20}

      case 'moveLeft':
        return {...state, left: state.left-20}

      case 'moveRight':
        return {...state, left: state.left+20}

      case 'reenterFromBottom':
        return {...state, top: 370}

      case 'reenterFromTop':
        return {...state, top: 10}

      case 'reenterFromRight':
        return {...state, left: 370}

      case 'reenterFromLeft':
        return {...state, left: 10}
    
      case 'center':
        return {top: 190, left: 190}
    }
  }

  useEffect(() => {
    if (gameCanStart)
      orderNewFood();
  }, [gameCanStart])

  useEffect(() => {
    const interval = setInterval(() => {

      if (foodEaten()) {
        setTotal(prev => prev + 1)
        orderNewFood()
      }

      switch (direction) {
        case 'up':
          if (gameCanStart && head.top === 10) {
            // snakeDies()
            headActionDispatch({type: 'reenterFromBottom'})
            // setMoveUp(370)
          }
          else if (tail.some(elem => head.top === elem.top + 20 && head.left === elem.left)) {
            snakeDies()
          }
          else if(gameCanStart) {
            updateTail()
            headActionDispatch({type: 'moveUp'})
            setMessage('Game started!')
          }
          break;

        case 'down':
          if (gameCanStart && head.top === 370) {
            // snakeDies()
            headActionDispatch({type: 'reenterFromTop'})
            // setMoveUp(10)
          }
          else if (tail.some(elem => head.top === elem.top - 20 && head.left === elem.left)) {
            snakeDies()
          }
          else if(gameCanStart) {
            updateTail()
            headActionDispatch({type: 'moveDown'})
            setMessage('Game started!')
          }
          break;

        case 'right':
          if (gameCanStart && head.left === 370) {
            // snakeDies()
            headActionDispatch({type: 'reenterFromLeft'})
            // setMoveSideways(10)
          }
          else if (tail.some(elem => head.left === elem.left - 20 && head.top === elem.top)) {
            snakeDies()
          }
          else if(gameCanStart) {
            updateTail()
            headActionDispatch({type: 'moveRight'})
            setMessage('Game started!')
          }
          break;

        case 'left':
          if (gameCanStart && head.left === 10) {
            // snakeDies()
            headActionDispatch({type: 'reenterFromRight'})
            // setMoveSideways(370)
          }
          else if (tail.some(elem => head.left === elem.left + 20 && head.top === elem.top)) {
            snakeDies()
          }
          else if(gameCanStart) {
            updateTail()
            headActionDispatch({type: 'moveLeft'})
            setMessage('Game started!')
          }
          break;
      }

    }, 50)

    return () => {
      return clearInterval(interval)
    }


  }, [head, direction, gameCanStart, tail])

  function updateTail() {
    if (foodEaten()) {
      // orderNewFood()
      tailActionDispatch({type: 'growTail', payload: {...head}})
    }
    else if (tail.length !== 0) {
      tailActionDispatch({type: 'adjustTail', payload: {...head}})
    }
  }

  function foodEaten() {
    return foodPos.top === head.top && foodPos.left === head.left
  }


  function snakeDies() {
    setGameCanStart(false)
    setFoodPos({ top: -20, left: -20 })
    setDirection('')
    setMessage('You Died! Press F to restart')
  }

  const handleKeys = (e) => {
    const key = e.key
    if (key === 'ArrowUp') {
      if (tail[total - 1]?.top === head.top - 20 && tail[total - 1]?.left === head.left) {
        return
      }
      setDirection('up')
    }
    else if (key === 'ArrowDown') {
      if (tail[total - 1]?.top === head.top + 20 && tail[total - 1]?.left === head.left) {
        return
      }
      setDirection('down')
    }
    else if (key === 'ArrowRight') {
      if (tail[total - 1]?.top === head.top && tail[total - 1]?.left === head.left + 20) {
        return
      }
      setDirection('right')
    }
    else if (key === 'ArrowLeft') {
      if (tail[total - 1]?.top === head.top && tail[total - 1]?.left === head.left - 20) {
        return
      }
      setDirection('left')
    }
    else if (key === 'f') {
      setTotal(0)
      tailActionDispatch({type: 'empty'})
      setDirection('')
      setGameCanStart(true)
      // setMoveUp(190)
      // setMoveSideways(190)
      headActionDispatch({type: 'center'})
      setMessage('Boom! ready to go!! Press any arrow key to start!')
    }
  }

  function orderNewFood() {
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
    }) || (head.top === x && head.left === y));

    setFoodPos({ top: x, left: y })
  }

  return (
    <div className="App">
      <h1>{total}</h1>
      <div className='canvas' tabIndex={'0'} onKeyDown={handleKeys}>
        <Food top={foodPos.top} left={foodPos.left} />
        {tail.map(item => <Snake top={item.top} left={item.left} />)}
        <Snake top={head.top} left={head.left} headColor={'black'} />

      </div>
      <p style={{ fontSize: '22px' }}>{message}</p>
    </div>
  );
}

function Snake({ top, left, headColor }) {

  const snakeStyle = {
    // border: '1px solid black',
    height: '19px',
    width: '19px',
    backgroundColor: headColor ? headColor : 'red',
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
    height: '19px',
    width: '19px',
    backgroundColor: 'purple',
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
  }

  return (
    <div style={foodStyle}></div>
  )
}

export default MyApp;

function tailReducer(state, action) {
  switch (action.type) {
    case 'growTail':
      return [...state, { top: action.payload.top, left: action.payload.left }]

    case 'adjustTail':
      const newArr = [...state]
      newArr.shift()
      newArr.push({ top: action.payload.top, left: action.payload.left })
      return newArr

    case 'empty':
      return []
  }
}