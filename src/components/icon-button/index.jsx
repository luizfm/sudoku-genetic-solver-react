import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Svg from '_components/svg'
import { Link } from 'react-router-dom'

import styles from './styles.css'

const IconButton = ({ icon, onClick, href, className }) => {
  if (href) {
    return (
      <Link to={href} className={classnames(styles['icon-button'], className)}>
        <Svg icon={icon} />
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={(styles['icon-button'], className)}
    >
      <Svg icon={icon} />
    </button>
  )
}

IconButton.propTypes = {
  icon: PropTypes.shape({
    viewBox: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  href: PropTypes.string,
  className: PropTypes.string,
}

IconButton.defaultProps = {
  onClick: () => {},
  href: '',
  className: '',
}

export default IconButton
