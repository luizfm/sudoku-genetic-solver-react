import React from 'react'

import TeamAside from '_components/team-aside'
import PresentationHeader from '_components/presentation-header'
import SudokuImage from '_assets/images/sudoku-image.jpeg'

import styles from './styles.css'
import SudokuCellInput from '../sudoku-cell-input'

const PresentationSection = () => (
  <section className={styles['presentation-section']}>
    <PresentationHeader className={styles['presentation-header']} />
    <TeamAside className={styles['team-aside']} />
    <img
      src={SudokuImage}
      alt="Someone solving a sudoku"
      className={styles['sudoku-image']}
    />
  </section>
)

export default PresentationSection
