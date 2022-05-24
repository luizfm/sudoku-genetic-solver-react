import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './styles.css'
import { Link } from 'react-router-dom'

export const BUTTON_THEME = {
  PRIMARY: 'primary',
  PRIMARY_VARIANT: 'primary-variant',
  SECONDARY: 'secondary',
  SECONDARY_VARIANT: 'secondary-variant',
  RED: 'red',
}

const Button = ({
  id,
  name,
  onClick,
  href,
  theme,
  className,
  children,
  ...restProps
}) => {
  if (href) {
    return (
      <Link
        to={href}
        id={id}
        name={name}
        className={classnames(styles['button'], styles[theme], className)}
        {...restProps}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      id={id}
      name={name}
      type="button"
      className={classnames(styles['button'], styles[theme], className)}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  theme: PropTypes.oneOf(Object.values(BUTTON_THEME)),
  onClick: PropTypes.func,
  href: PropTypes.string,
  className: PropTypes.string,
}

Button.defaultProps = {
  className: '',
  onClick: () => {},
  href: '',
  theme: BUTTON_THEME.PRIMARY,
}

export default Button
