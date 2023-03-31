import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function MyApp() {

  const [gameCanStart, setGameCanStart] = useState(true);
  const [message, setMessage] = useState('click the canvas to focus & then press any arrow key to start :)')
  const [moveUp, setMoveUp] = useState(190)
  const [moveSideways, setMoveSideways] = useState(190)
  const [direction, setDirection] = useState('')
  const [tail, setTail] = useState([{top:210, left:190}])
  const [total, setTotal] = useState(0)
  const [foodPos, setFoodPos] = useState({ top: 10, left: 10 })

  useEffect(() => {
    if(gameCanStart)
      foodLocation();
  }, [gameCanStart])

  useEffect(() => {
    const interval = setInterval(() => {

      if (foodPos.top === moveUp && foodPos.left === moveSideways) {
        setTotal(prev => prev + 1)
      }

      switch (direction) {
        case 'up':
          if (gameCanStart && moveUp > 10) {
            if (tail.some(elem => moveUp === elem.top+20 && moveSideways === elem.left)) {
              snakeDies()
            }
            else {
              if (tail.length !== 0) {
                const newArr = [...tail]
                newArr.shift()
                newArr.push({ top: moveUp, left: moveSideways })
                setTail(newArr)
        
              }
        
              if (foodPos.top === moveUp && foodPos.left === moveSideways) {
                // setTotal(prev => prev + 1)
                foodLocation()
                setTail([...tail, { top: moveUp, left: moveSideways }])
              }
              setMoveUp(prev => prev - 20)
              setMessage('Game started!')
            }
          }
          // else if(gameCanStart && moveUp === 10) {
          //   setMoveUp(370)
          // }
          else {
            snakeDies()
          }
          break;

        case 'down':
          if (gameCanStart && moveUp < 370) {
            if (tail.some(elem => moveUp === elem.top-20 && moveSideways === elem.left)) {
              snakeDies()
            }
            else {
              if (tail.length !== 0) {
                const newArr = [...tail]
                newArr.shift()
                newArr.push({ top: moveUp, left: moveSideways })
                setTail(newArr)
        
              }
        
              if (foodPos.top === moveUp && foodPos.left === moveSideways) {
                // setTotal(prev => prev + 1)
                foodLocation()
                setTail([...tail, { top: moveUp, left: moveSideways }])
              }
              setMoveUp(prev => prev + 20)
              setMessage('Game started!')
            }
          }
          // else if(gameCanStart && moveUp === 370) {
          //   setMoveUp(10)
          // }
          else {
            snakeDies()
          }
          break;

        case 'right':
          if (gameCanStart && moveSideways < 370) {
            if (tail.some(elem => moveSideways === elem.left-20 && moveUp === elem.top)) {
              snakeDies()
            }
            else {
              if (tail.length !== 0) {
                const newArr = [...tail]
                newArr.shift()
                newArr.push({ top: moveUp, left: moveSideways })
                setTail(newArr)
        
              }
        
              if (foodPos.top === moveUp && foodPos.left === moveSideways) {
                // setTotal(prev => prev + 1)
                foodLocation()
                setTail([...tail, { top: moveUp, left: moveSideways }])
              }
              setMoveSideways(prev => prev + 20)
              setMessage('Game started!')
            }
          }
          // else if (gameCanStart && moveSideways === 370) {
          //   setMoveSideways(10)
          // }
          else {
            snakeDies()
          }
          break;

        case 'left':
          if (gameCanStart && moveSideways > 10) {
            if (tail.some(elem => moveSideways === elem.left+20 && moveUp === elem.top)) {
              snakeDies()
            }
            else {
              if (tail.length !== 0) {
                const newArr = [...tail]
                newArr.shift()
                newArr.push({ top: moveUp, left: moveSideways })
                setTail(newArr)
        
              }
        
              if (foodPos.top === moveUp && foodPos.left === moveSideways) {
                // setTotal(prev => prev + 1)
                foodLocation()
                setTail([...tail, { top: moveUp, left: moveSideways }])
              }
              setMoveSideways(prev => prev - 20)
              setMessage('Game started!')
            }
          }
          // else if(gameCanStart && moveSideways === 10) {
          //   setMoveSideways(370)
          // }
          else {
            snakeDies()
          }
          break;
      }

    }, 50)

    return () => {
      return clearInterval(interval)
    }
    

  }, [moveSideways, moveUp, direction, gameCanStart, tail])

  function snakeDies() {
    setGameCanStart(false)
    setFoodPos({top: -20, left:-20})
    setMessage('You Died! Press F to restart')
  }

  const handleKeys = (e) => {
    const key = e.key
    if (key === 'ArrowUp') {
      if(tail[total-1]?.top === moveUp-20 && tail[total-1]?.left === moveSideways){
        return
      }
      setDirection('up')
    }
    else if (key === 'ArrowDown') {
      if(tail[total-1]?.top === moveUp+20 && tail[total-1]?.left === moveSideways){
        return
      }
      setDirection('down')
    }
    else if (key === 'ArrowRight') {
      if(tail[total-1]?.top === moveUp && tail[total-1]?.left === moveSideways+20){
        return
      }
      setDirection('right')
    }
    else if (key === 'ArrowLeft') {
      if(tail[total-1]?.top === moveUp && tail[total-1]?.left === moveSideways-20){
        return
      }
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
        <Snake top={moveUp} left={moveSideways} headColor={'black'} />

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