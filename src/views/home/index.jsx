import React, { useCallback, useState } from 'react'

import PresentationSection from '_components/presentation-section'
import GeneticImage from '_assets/images/genetic-image.webp'
import SudokuTable from '_components/sudoku-table'
import AlgorithmResults from '_components/algorithm-results'

import styles from './styles.css'

const Home = () => {
  const [data, setData] = useState([])
  const [cost, setCost] = useState(null)

  const onGenerateData = useCallback((value, cost) => {
    setData(value)
    setCost(cost)
  }, [])

  return (
    <main className={styles['home-container']}>
      <img
        className={styles['top-image']}
        src={GeneticImage}
        alt="Genetic RNA"
      />
      <PresentationSection />
      <SudokuTable
        className={styles['sudoku-table']}
        onGenerateData={onGenerateData}
      />
      <AlgorithmResults data={data} cost={cost} />
    </main>
  )
}

export default Home
