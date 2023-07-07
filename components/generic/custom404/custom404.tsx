import React, { useContext } from 'react'
import Overlay from '@/components/generic/overlay/overlay'

export const typename = 'Set_Modules_Custom404'
const Custom404Block = () => {

  return (
    <Overlay>
      <h1>404</h1>
      <p className="text--meta">lost your way?</p>
    </Overlay>
  )
}

export default Custom404Block
