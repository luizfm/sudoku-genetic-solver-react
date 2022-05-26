export const splitInput = (numericInitialBoard) => {
  const sudokuCells = new Array(9).fill(new Array(9).fill(''))
  const newSudoku = sudokuCells.map((row, rowIndex) =>
    row.map((col, colIndex) =>
      numericInitialBoard[rowIndex * 9 + colIndex] !== '0'
        ? numericInitialBoard[rowIndex * 9 + colIndex]
        : ''
    )
  )
  return newSudoku
}

export function checkSquare(board, row, column, value) {
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(column / 3) * 3

  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      if (board[boxRow + r][boxCol + c] == value) return false
    }
  }

  return true
}

export function checkRow(board, row, value) {
  for (let i = 0; i < board[row].length; i += 1) {
    if (board[row][i] == value) {
      return false
    }
  }

  return true
}

export function checkColumn(board, column, value) {
  for (let i = 0; i < board.length; i += 1) {
    if (board[i][column] == value) {
      return false
    }
  }

  return true
}

export const isPossibleCandidate = (board, row, col, candidate) => {
  if (
    checkRow(board, row, candidate) &&
    checkColumn(board, col, candidate) &&
    checkSquare(board, row, col, candidate)
  ) {
    return true
  }

  return false
}

export const checkAllChecks = (board, boardInitial, row, col, candidate) => {
  if (
    boardInitial[row][col] === '' &&
    isPossibleCandidate(board, row, col, candidate)
  ) {
    return true
  }

  return false
}

const cloneBoard = (board) => board.map((row) => row.map((col) => col))

const cost = (board) => {
  let myCost = 0
  board.forEach((row) => {
    row.forEach((col) => {
      if (col === '') {
        myCost += 1
      }
    })
  })

  return myCost
}

const mutation = (board, initialBoard) => {
  const exampleBoard = cloneBoard(board)
  const row = Math.floor(Math.random() * (8 - 0 + 1) + 0)
  const col = Math.floor(Math.random() * (8 - 0 + 1) + 0)
  const candidate = Math.floor(Math.random() * (9 - 1 + 1) + 1)
  if (checkAllChecks(board, initialBoard, row, col, candidate)) {
    exampleBoard[row][col] = candidate
    return {
      board: exampleBoard,
      mutated: true,
    }
  }

  return {
    board: null,
    mutated: false,
  }
}

// const initialBoard = [
//   [4, 0, 0, 6, 0, 0, 1, 2, 3],
//   [0, 0, 0, 0, 0, 2, 0, 7, 0],
//   [0, 0, 1, 0, 3, 0, 9, 0, 6],
//   [7, 0, 0, 9, 2, 8, 0, 0, 0],
//   [9, 1, 6, 0, 0, 0, 3, 8, 2],
//   [0, 0, 0, 3, 6, 1, 0, 0, 4],
//   [5, 0, 8, 0, 1, 0, 6, 0, 0],
//   [0, 9, 0, 8, 0, 0, 0, 0, 0],
//   [1, 2, 4, 0, 0, 6, 0, 0, 7],
// ]

const createRandomSolution = (board, initialBoard) => {
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const candidate = Math.floor(Math.random() * (9 - 1 + 1) + 1)
      if (checkAllChecks(board, initialBoard, row, col, candidate)) {
        // eslint-disable-next-line no-param-reassign
        board[row][col] = candidate
      }
    }
  }
  return board
}

export class GeneticSudokuSolver {
  constructor(board) {
    this.populationSize = 300
    this.elitism = 0.4
    this.generationNumbers = 2000
    this.board = board
  }

  execute() {
    const totalCostData = []
    let population = []
    let currentGeneration = 0
    for (let i = 0; i < this.populationSize; i += 1) {
      const board = cloneBoard(this.board)
      population.push(createRandomSolution(board, this.board))
    }

    const elitismNumber = this.elitism * this.populationSize

    for (let i = 0; i < this.generationNumbers; i += 1) {
      currentGeneration += 1
      population.sort((a, b) => cost(a) - cost(b))

      if (cost(population[0]) === 0) {
        return {
          board: population[0],
          cost: cost(population[0]),
          currentGeneration,
          totalCostData,
        }
      }

      population = population.slice(0, elitismNumber)
      while (population.length < this.populationSize) {
        const m = Math.floor(Math.random() * elitismNumber)
        const clonedSolution = cloneBoard(population[m])
        const { board, mutated } = mutation(clonedSolution, this.board)

        if (mutated) {
          totalCostData.push([totalCostData.length, cost(board)])
          population.push(board)
        } else {
          population.push(undefined)
        }
      }
    }

    population.sort((a, b) => cost(a) - cost(b))

    console.log(totalCostData)

    return {
      board: population[0],
      cost: cost(population[0]),
      currentGeneration,
      totalCostData,
    }
  }
}
