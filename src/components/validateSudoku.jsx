

export function validateRow(sudokuArray, row) {
    const rowValues = new Set();

    for (let i = 0; i < 9; i++) {
        const value = sudokuArray[row][i];
        if (value !== 0) {
            if (rowValues.has(value)) {
                return false;
            } else {
                rowValues.add(value);
            }
        }
    }
    return true;
}

export function validateCol(sudokuArray, col) {
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
}

export function validateBoxGrid(sudokuArray, boxGrid) {
    const boxGridValues = new Set();

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
                console.log(boxGridValues)
            }
        }
    }
    return true;
}