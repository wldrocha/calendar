import React from 'react'
import { UseUiStore, useCalendarStore } from '../../hooks'
import { addHours } from 'date-fns'

export const FabAddNew = () => {
  const { openDateModal } = UseUiStore()
  const { setActiveEvent } = useCalendarStore()

  const handleClickNew = () => {
    setActiveEvent({
      title: 'Hola',
      notes: 'Mundo',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user: {
        _id: '123',
        name: 'Wlad'
      }
    })
    openDateModal()
  }

  return (
    <button className=' btn btn-primary fab' onClick={handleClickNew}>
      <i className='fas fa-plus'></i>
    </button>
  )
}
