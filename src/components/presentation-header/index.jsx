import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import IesLogo from '_assets/images/ies-logo.png'

import styles from './styles.css'

const PresentationHeader = ({ className }) => (
  <div className={classnames(styles['presentation-header'], className)}>
    <h1 className={styles['presentation-header-title']}>
      Sudoku Solver - Genetic Algorithm - Artificial Intelligence
    </h1>
    <p className={styles['presentation-header-university']}>
      Instituto de Ensino Superior da Grande Florianópolis
    </p>
    <p className={styles['presentation-header-teacher']}>
      Teacher: Douglas Hiura Longo
    </p>
    <img
      className={styles['ies-logo']}
      src={IesLogo}
      alt="Instituto de Ensino Superior da Grande Florianópolis"
    />
  </div>
)

PresentationHeader.propTypes = {
  className: PropTypes.string,
}

PresentationHeader.defaultProps = {
  className: '',
}

export default PresentationHeader
