import React, { useContext } from 'react'
//import OutlineButton from '../outline_button/outline_button'
import Overlay from '@/components/generic/overlay/overlay'

export const typename = 'Set_Modules_Custom404'

const Custom404Block = () => {
  //const globalSet = useContext(GlobalContext)

  return (
    <Overlay>
      <h1>404</h1>
      <p className="text--meta">lost your way?</p>

    </Overlay>
  )
}

export default Custom404Block
