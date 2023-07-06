import { useState } from 'react'
import './App.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetDeepCopy from './utils/GetDeepCopy';
import { validateBoxGrid, validateCol, validateRow } from './components/validateSudoku';
import AlertMessage from './components/AlertMessage';


const randomNumber = [
  [-1, 5, -1, 9, -1, -1, -1, -1, -1],
  [8, -1, -1, -1, 4, -1, 3, -1, 7],
  [-1, -1, -1, 2, 8, -1, 1, 9, -1],
  [5, 3, 8, 6, -1, 7, 9, 4, -1],
  [-1, 2, -1, 3, -1, 1, -1, -1, -1],
  [1, -1, 9, 8, -1, 4, 6, 2, 3],
  [9, -1, 7, 4, -1, -1, -1, -1, -1],
  [-1, 4, 5, -1, -1, -1, 2, -1, 9],
  [-1, -1, -1, -1, 3, -1, -1, 7, -1]
];




function App() {
  const [sudokuArr, setSudokuArr] = useState(randomNumber);

  const handleChange = (e, rowI, colI) => {
    let value = parseInt(e.target.value) || -1;
    let newGrid = GetDeepCopy(sudokuArr);

    if (value === -1 || value >= 1 && value <= 9) {
      newGrid[rowI][colI] = value;
    }
    setSudokuArr(newGrid);
  }

  const handleCheck = () => {
    const isValid = validateSudoku(sudokuArr);
    if (isValid) {
      toast.success('Congrulations! The Sudoku solution is valid.🔥')
    } else {
      toast.error(`The sudoku solution is invalid. Try again !`)
    }
  }

  const validateSudoku = (sudokuArray) => {
    for (let i = 0; i < 9; i++) {
      if (!validateRow(sudokuArray, i) || !validateCol(sudokuArray, i) || !validateBoxGrid(sudokuArray, i)) {
        return false;
      }
    }
    return true
  }

  const resetSudoku = () => {
    let sudoku = GetDeepCopy(randomNumber);
    setSudokuArr(sudoku)
  }

  return (
    <div className="App">
      <AlertMessage />
      <div className="App-header">
        <h3>Sudoku Game</h3>
        <table>
          <tbody>
            {
              sudokuArr.map((row, rowIndex) => (
                <tr key={rowIndex} className={(rowIndex + 1) % 3 === 0 ? 'bottomBorder' : ''}>
                  {row.map((col, colIndex) => (

                    <td key={rowIndex * 9 + colIndex} className={(colIndex + 1) % 3 === 0 ? 'rightBorder' : ''}>
                      <input
                        onChange={(e) => handleChange(e, rowIndex, colIndex)}
                        value={sudokuArr[rowIndex][colIndex] === -1 ? '' : sudokuArr[rowIndex][colIndex]}
                        className='cellInput'
                        disabled={randomNumber[rowIndex][colIndex] !== -1}
                      />
                    </td>
                  ))}
                </tr>
              ))
            }
          </tbody>
        </table>

        <div className='buttonContainer'>
          <button className='checkBtn' onClick={handleCheck}>Check</button>
          <button className='resetBtn' onClick={resetSudoku}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default App
