import React, { forwardRef } from 'react'
import './commandKMenu.css'

interface Props {

}

export const CommandKMenu = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <div>
        <input type="text" ref={ref}/>
    </div>
  )
})
