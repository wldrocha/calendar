import React from 'react'
import { UseUiStore, useCalendarStore } from '../../hooks'
import { addHours } from 'date-fns'

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore()

  const handleClickDelete = () => {
    startDeletingEvent()
  }

  return (
    <button
      className='btn btn-danger fab-danger'
      onClick={handleClickDelete}
      style={{ display: hasEventSelected ? '' : 'none' }}
    >
      <i className='fas fa-trash-alt'></i>
    </button>
  )
}
