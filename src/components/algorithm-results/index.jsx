import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Chart } from 'react-google-charts'

import styles from './styles.css'
import { splitInput } from '_utils/sudoku-helper'

const mockedData = [
  ['Generations', 'Cost'],
  [1, 37.8],
  [2, 25],
]

export const options = {
  chart: {
    title: 'Cost of the generations along the algorithm solving process',
    subtitle: 'As much near 0 as better',
  },
  chartArea: {
    left: 0,
    height: 250,
    width: 600,
    backgroundColor: '#c52030',
  },
  height: 300,
  width: 600,
  legend: {
    maxLines: 1,
    textStyle: {
      fontSize: 20,
    },
  },
  backgroundColor: '#c52030',
}

const AlgorithmResults = ({ data, onGenerateData, cost }) => {
  const handleData = useMemo(
    () => (data.length > 0 ? [['Generations', 'Cost'], ...data] : mockedData),
    [data]
  )

  useEffect(() => {
    return () => {
      onGenerateData([], null)
    }
  }, [onGenerateData])

  return (
    <div className={styles['algorithmn-wrapper']}>
      <h2 className={styles['title']}>Results</h2>
      <Chart
        className={styles['graph']}
        chartType="Line"
        data={handleData}
        options={options}
      />
      <p className={styles['best-cost']}>
        Best cost: <span>{cost}</span>
      </p>
    </div>
  )
}

AlgorithmResults.propTypes = {
  data: PropTypes.arrayOf(),
  cost: PropTypes.number,
  onGenerateData: PropTypes.func,
}

AlgorithmResults.defaultProps = {
  data: [],
  cost: null,
  onGenerateData: () => {},
}

export default AlgorithmResults
