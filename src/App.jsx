import { useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetDeepCopy from './utils/GetDeepCopy';



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
]


function App() {

  const [sudokuArr, setSudokuArr] = useState(randomNumber);



  const handleChange = (e, rowI, colI) => {
    console.log("row: ", rowI, "col: ", colI);
    let value = parseInt(e.target.value) || -1; //If the parsing fails or the value is not a number, it assigns -1 to value.
    console.log("value", value)
    let grid = GetDeepCopy(sudokuArr);

    //Input value should range from 1-9 and for empty cell it should be -1
    if (value === -1 || value >= 1 && value <= 9) {
      grid[rowI][colI] = value;
    }
    setSudokuArr(grid);

  }

  const handleCheck = () => {
    const isValid = validateSudoku(sudokuArr);


    if (isValid) {
      toast.success('Congrulations! The Sudoku solution is valid.🔥')
    } else {
      toast.error(`Oops! The sudoku solution is invalid. Try again !`)
    }
  }

  const validateSudoku = (sudokuArray) => {
    // Run a for loop to get the postion on sudokuArray ..
    for (let i = 0; i < 9; i++) {
      if (!validateRow(sudokuArray, i) || !validateCol(sudokuArray, i) || !validteBoxGrid(sudokuArray, i)) {
        return false;
      }
    }
    return true
  }

  const validateRow = (sudokuArray, row) => {
    // create a new set for row and after add the value
    const rowValues = new Set();

    for (let i = 0; i < 9; i++) {
      const value = sudokuArray[row][i];
      if (value !== 0) {
        if (rowValues.has(value)) {
          return false;
        } else {
          rowValues.add(value)
        }
      }
    }
    return true;
  };

  const validateCol = (sudokuArray, col) => {
    // create a new set for column and after add the value
    const colValues = new Set();

    for (let i = 0; i < 9; i++) {
      const value = sudokuArray[i][col];

      if (value !== 0) {
        if (colValues.has(value)) {
          return false;
        } else {
          colValues.add(value);
        }
      }
    }
    return true;
  };

  const validteBoxGrid = (sudokuArray, boxGrid) => {
    // create a new set for box grid and after add the value
    const boxGridValues = new Set();

    // represent the starting row and column indices of the 3x3 box grid.
    const startRow = Math.floor(boxGrid / 3) * 3;
    const startCol = (boxGrid % 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        const value = sudokuArray[i][j];

        if (value !== 0) {
          if (boxGridValues.has(value)) {
            return false;
          } else {
            boxGridValues.add(value);
          }
        }
      }
    }
    return true;
  };


  const resetSudoku = () => {
    //Clear Sudoku game inputs..
    let sudoku = GetDeepCopy(randomNumber);
    setSudokuArr(sudoku)
  }


  return (
    <div className="App">
      <ToastContainer />
      <div className="App-header">
        <h3>Sudoku Game</h3>
        <table>
          <tbody>
            {
              sudokuArr.map((row, rowIndex) => (
                <tr key={rowIndex} className={(rowIndex + 1) % 3 === 0 ? 'bBorder' : ''}>
                  {row.map((col, colIndex) => (

                    <td key={rowIndex * 9 + colIndex} className={(colIndex + 1) % 3 === 0 ? 'rBorder' : ''}>
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
