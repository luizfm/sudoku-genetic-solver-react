import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import IconButton from '_components/icon-button'

import styles from './styles.css'

const TeamMemberCard = ({ avatar, name, socialMedias, className }) => (
  <li className={classnames(styles['team-member-card'], className)}>
    <dl className={styles['team-member-card-wrapper']}>
      <img src={avatar} alt={`${name}'s avatar`} className={styles.avatar} />
      <dt>{name}</dt>
      <div className={styles['social-media-container']}>
        {socialMedias.map((item) => (
          <IconButton
            key={item.media}
            href={item.href}
            icon={item.icon}
            className={styles['icon-button']}
          />
        ))}
      </div>
    </dl>
  </li>
)

TeamMemberCard.propTypes = {
  avatar: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  socialMedias: PropTypes.arrayOf(
    PropTypes.shape({
      media: PropTypes.string,
      href: PropTypes.string,
      icon: PropTypes.shape({
        viewBox: PropTypes.string,
        id: PropTypes.string,
      }).isRequired,
    })
  ),
  className: PropTypes.string,
}

TeamMemberCard.defaultProps = {
  socialMedias: [],
  className: '',
}

export default React.memo(TeamMemberCard)
