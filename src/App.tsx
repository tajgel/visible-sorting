import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [array, setArray] = useState<number[]>([])
  const [length, setLength] = useState(100)
  const [speed, setSpeed] = useState(10)
  const [newArr, setNewArr] = useState(true)

  useEffect(() => {
    setArray(createArray(100, 1, 100))
  }, [])


  function createArray(lines: number, minValue: number, maxValue: number) {
    let arr: number[] = []
    for (let i = 0; i < lines; i++) {
      arr.push(Math.floor(Math.random() * (maxValue - minValue + 1) + minValue))
    }
    return arr
  }

  function handleRender() {
    if(newArr){
      setArray(createArray(length, 1, 100))
    }
    else{
      alert("poczekaj aż skończę sortować tablicę lub odświerz stronę")
    }
  }

  function handleSort() {
    bubbleSort(array)
  }

  function handleLength(event: React.ChangeEvent<HTMLInputElement>){
    const value = Number(event.target.value)
    if(value <=709 && !NaN && value >= 0){
      setLength(value)
    }
    else{
      alert("Tablica nie może być większa niż 709 ani mniejsza od 0")
    }
  }

  function handleSpeed(event: React.ChangeEvent<HTMLInputElement>){
    setSpeed(Number(event.target.value))
  }
  async function bubbleSort(arr: number[]) {
    if(newArr){
      setNewArr(false)
      function swap(arr: number[], index1: number, index2: number): void {
        let temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
      }
  
      function delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms))
      }
  
      const arrTEMP = [...arr]
      const n = arrTEMP.length
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          if (arrTEMP[j] > arrTEMP[j + 1]) {
            swap(arrTEMP, j, j + 1)
            setArray([...arrTEMP])
            await delay(speed)
          }
        }
      }
      setNewArr(true)
      return arrTEMP
    }
    else{
      alert("poczekaj aż skończę sortować tablicę lub odświerz stronę")
    }
  }

  

  return (
    <>
      <div className='App'>
        <button onClick={handleRender}>render</button>
        <button onClick={handleSort}>sort</button>
        <input id='length' value={length} placeholder='długość' type="number" onChange={handleLength}/>
        <input type='number' onChange={handleSpeed} min={1} max={10} placeholder='szybkość'/>
        <div className='arrayPlace'>
          {array.map((value, index) => (<div className='bar' key={`bar-${index}`} id={`${index}`} style={{ height: `${value}%` }}></div>))}
        </div>
      </div>
    </>
  )
}

export default App
