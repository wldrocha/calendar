import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessageES } from '../../helpers'
import { CalendarEventBox, Navbar, CalendarModal, FabAddNew, FabDelete } from '../'
import { UseUiStore } from '../../hooks/UseUiStore'
import { useCalendarStore } from '../../hooks'

export const CalendarPage = () => {
  const { events, setActiveEvent } = useCalendarStore()
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')
  const { openDateModal } = UseUiStore()

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: '0.8',
      color: 'white'
    }

    return { style }
  }
  const onDoubleClick = (event) => {
    openDateModal()
    // console.log('🚀 ~ file: CalendarPage.jsx ~ line 34 ~ handleOnDoubleClick ~ event', { doubleClick: event })
  }

  const onSelect = (event) => {
    // console.log('🚀 ~ file: CalendarPage.jsx ~ line 38 ~ onSelect ~ event', { click: event })
    setActiveEvent(event)
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture={'es'}
        localizer={localizer}
        events={events}
        startAccessor='start'
        defaultView={lastView}
        endAccessor='end'
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessageES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
