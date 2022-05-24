import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import LuizAvatar from '_assets/images/luiz-avatar.jpeg'
import MatheusAvatar from '_assets/images/matheus-avatar.jpeg'
import NiloAvatar from '_assets/images/nilo-avatar.jpeg'
import PedroAvatar from '_assets/images/pedro-avatar.jpeg'
import TeamMemberCard from '_components/team-member-card'
import FacebookIcon from '_assets/icons/facebook-icon.svg'
import GithubIcon from '_assets/icons/github-icon.svg'
import LinkedinIcon from '_assets/icons/linkedin-icon.svg'
import AvatarPlaceholder from '_assets/images/avatar-placeholder.jpg'

import styles from './styles.css'

const TEAM_MATES = [
  {
    name: 'Luiz F. de Morais',
    avatar: LuizAvatar,
    socialMedias: [
      { media: 'Github', href: '/', icon: GithubIcon },
      { media: 'Facebook', href: '/', icon: FacebookIcon },
      { media: 'Linkedin', href: '/', icon: LinkedinIcon },
    ],
  },
  {
    name: 'Matheus A. Machado',
    avatar: MatheusAvatar,
    socialMedias: [
      { media: 'Github', href: '/', icon: GithubIcon },
      { media: 'Facebook', href: '/', icon: FacebookIcon },
      { media: 'Linkedin', href: '/', icon: LinkedinIcon },
    ],
  },
  {
    name: 'Nilo Joaquim C. Neto',
    avatar: NiloAvatar,
    socialMedias: [
      { media: 'Github', href: '/', icon: GithubIcon },
      { media: 'Facebook', href: '/', icon: FacebookIcon },
      { media: 'Linkedin', href: '/', icon: LinkedinIcon },
    ],
  },
  {
    name: 'Pedro Lucas C. Correa',
    avatar: PedroAvatar,
    socialMedias: [
      { media: 'Github', href: '/', icon: GithubIcon },
      { media: 'Facebook', href: '/', icon: FacebookIcon },
      { media: 'Linkedin', href: '/', icon: LinkedinIcon },
    ],
  },
]

const STACKHOLDER = {
  name: 'Pedro Mélem',
  avatar: AvatarPlaceholder,
  socialMedias: [
    { media: 'Github', href: '/', icon: GithubIcon },
    { media: 'Facebook', href: '/', icon: FacebookIcon },
    { media: 'Linkedin', href: '/', icon: LinkedinIcon },
  ],
}

const TeamAside = ({ className }) => (
  <aside className={classnames(styles['team-aside-container'], className)}>
    <h2>Team</h2>
    <ul className={styles['members-list']}>
      {TEAM_MATES.map((member) => (
        <TeamMemberCard
          key={member.name}
          name={member.name}
          avatar={member.avatar}
          socialMedias={member.socialMedias}
        />
      ))}
    </ul>
    <h2 className={styles['special-thanks']}>Special Thanks</h2>
    <TeamMemberCard
      name={STACKHOLDER.name}
      avatar={STACKHOLDER.avatar}
      socialMedias={STACKHOLDER.socialMedias}
    />
  </aside>
)

TeamAside.propTypes = {
  className: PropTypes.string,
}

TeamAside.defaultProps = {
  className: '',
}

export default TeamAside
