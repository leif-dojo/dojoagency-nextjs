import React, { ReactNode } from 'react'
import Link from 'next/link'
import baseStyles from './base_button.module.scss'

const BaseButton = ({
  link = '/',
  className = '',
  children,
  white = false,
}: {
  link: string
  className?: string
  children: ReactNode
  white?: boolean
}) => (
  <div className={`${baseStyles.root} ${className} ${white ? baseStyles.white : ''}`}>
    <Link href={link}>{children}</Link>
  </div>
)

BaseButton.defaultProps = {
  className: '',
  white: false,
}

export default BaseButton
