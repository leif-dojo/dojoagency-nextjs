import React, { useEffect, useState } from 'react'
import styles from './overlay.module.scss'

export const typename = 'Set_Modules_Overlay'
const OverlayBlock = ({
  children,
  className = '',
  gradient = false,
  extended = false,
}: {
  children: any
  className?: string
  gradient?: boolean
  extended?: boolean
}) => {
  const [fadeIn, setFadeIn] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true)
    }, 20)
  }, [])
  return (
    <div
      className={`${styles.root} ${className} ${gradient ? styles.gradient : ''
        } ${fadeIn ? styles.active : ''} ${extended ? styles.extended : ''}`}
    >
      <div className={styles.wrapper}>{children}</div>
    </div>
  )
}

OverlayBlock.defaultProps = {
  className: '',
  gradient: false,
  extended: false,
}

export default OverlayBlock
