import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.css'

const Svg = ({ icon, ariaLabel, className }) => {
  const aria = useMemo(
    () => (ariaLabel ? { 'aria-label': ariaLabel } : { 'aria-hidden': true }),
    [ariaLabel]
  )

  return (
    <svg
      viewBox={icon.viewBox}
      {...aria}
      className={classNames(styles.svg, className)}
    >
      <use xlinkHref={`#${icon.id}`} />
    </svg>
  )
}

Svg.propTypes = {
  icon: PropTypes.shape({
    viewBox: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
}

Svg.defaultProps = {
  className: '',
  ariaLabel: '',
}

export default Svg
