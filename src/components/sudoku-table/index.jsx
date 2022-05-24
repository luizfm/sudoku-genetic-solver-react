import React, { useCallback, useEffect, useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import SudokuCellInput from '_components/sudoku-cell-input'

import { checkAllChecks, GeneticSudokuSolver } from '_utils/sudoku-helper'
import styles from './styles.css'
import Button, { BUTTON_THEME } from '../button'
import { splitInput } from '_utils/sudoku-helper'

const sudokuCells = new Array(9).fill(new Array(9).fill(''))
const sudokuCellsErrors = new Array(9).fill(new Array(9).fill(false))

const bottomRowBorders = [2, 5, 8]
const topRowBorders = [0, 3, 6]
const rightColBorders = [2, 5, 8]
const leftColBorders = [0, 3, 6]

const SudokuTable = ({ className, onGenerateData }) => {
  const [sudoku, setSudoku] = useState(sudokuCells)
  const [typedSudoku, setTypedSudoku] = useState(sudokuCells)
  const [isTyped, setIsTyped] = useState(false)
  const [sudokuErrors, setSudokuErrors] = useState(sudokuCellsErrors)
  const [bestSolution, setBestSolution] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onCustomInput = useCallback((event) => {
    const { value } = event.target
    setSudoku(splitInput(value))
    setTypedSudoku(splitInput(value))
    setIsTyped(true)
  }, [])

  const onCellChange = useCallback((event) => {
    const {
      dataset: { row, col },
      value: candidate,
    } = event.target

    if (candidate === 0 || candidate === '0' || candidate > 9) {
      return
    }

    setSudoku((prevValue) => {
      const newSudoku = prevValue.map((r) => r.map((c) => c))
      if (!checkAllChecks(newSudoku, sudokuCells, row, col, candidate)) {
        setSudokuErrors((prevCells) => {
          const clonedCells = prevCells.map((r) => r.map((c) => c))
          clonedCells[row][col] = true
          return clonedCells
        })
      } else {
        setSudokuErrors((prevCells) => {
          const clonedCells = prevCells.map((r) => r.map((c) => c))
          clonedCells[row][col] = false
          return clonedCells
        })
      }

      newSudoku[row][col] = candidate
      setTypedSudoku(newSudoku)
      return newSudoku
    })
  }, [])

  const onStartGeneticSolver = useCallback(async () => {
    setIsLoading(true)

    let currentBoard = undefined
    if (bestSolution.board || isTyped) {
      currentBoard = typedSudoku
    } else {
      currentBoard = sudoku
    }

    const solver = new GeneticSudokuSolver(currentBoard)
    const solution = await solver.execute()
    onGenerateData(solution.totalCostData, solution.cost)
    setBestSolution(solution)
    setIsLoading(false)
  }, [bestSolution.board, isTyped, onGenerateData, typedSudoku, sudoku])

  const onClearBoard = useCallback(() => {
    setSudoku(sudokuCells)
    setIsTyped(false)
  }, [])

  useEffect(() => {
    if (isLoading && typeof bestSolution.board !== 'undefined') {
      setSudoku(bestSolution.board)
    }
  }, [isLoading, bestSolution.board])

  return (
    <div className={classnames(styles['sudoku-table'], className)}>
      <p className={styles['sudoku-table-label']}>
        Preencher valores iniciais do tabuleiro
      </p>
      {sudoku.map((row, rowIndex) => (
        <div className={styles.row} key={`cell-row-${rowIndex + 1}`}>
          {row.map((col, colIndex) => (
            <SudokuCellInput
              key={`cell-${rowIndex + 1}-${colIndex + 1}`}
              id={`cell-${rowIndex + 1}-${colIndex + 1}`}
              name={`cell-${rowIndex + 1}-${colIndex + 1}`}
              onChange={onCellChange}
              value={col}
              data-row={rowIndex}
              data-col={colIndex}
              error={sudokuErrors[rowIndex][colIndex]}
              className={classnames({
                [styles['bottom-border']]: bottomRowBorders.includes(rowIndex),
                [styles['top-border']]: topRowBorders.includes(rowIndex),
                [styles['left-border']]: leftColBorders.includes(colIndex),
                [styles['right-border']]: rightColBorders.includes(colIndex),
              })}
            />
          ))}
        </div>
      ))}
      <div className={styles['buttons-container']}>
        <Button onClick={onStartGeneticSolver}>Start</Button>
        <Button theme={BUTTON_THEME.SECONDARY} onClick={onClearBoard}>
          Clear
        </Button>
      </div>
      <label htmlFor="custom-input" className={styles['label']}>
        Custom input
      </label>
      <input
        id="custom-input"
        onChange={onCustomInput}
        className={styles['custom-input']}
        placeholder="ex: 0000000104000000000200000000000504070080003000"
      />
    </div>
  )
}

SudokuTable.propTypes = {
  className: PropTypes.string,
  onGenerateData: PropTypes.func,
}

SudokuTable.defaultProps = {
  className: '',
  onGenerateData: () => {},
}

export default React.memo(SudokuTable)
