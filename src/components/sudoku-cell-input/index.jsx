import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './styles.css'

const SudokuCellInput = ({
  name,
  id,
  label,
  hiddenLabel,
  value,
  className,
  onChange,
  error,
  ...restProps
}) => (
  <div className={classnames(styles['input-container'], className)}>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={classnames(styles['sudoku-cell-input'], {
        [styles.error]: !!error,
      })}
      {...restProps}
    />
  </div>
)

SudokuCellInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hiddenLabel: PropTypes.bool,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
}

SudokuCellInput.defaultProps = {
  hiddenLabel: true,
  className: '',
  onChange: () => {},
  error: false,
}

export default React.memo(SudokuCellInput)
