import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessageES } from '../../helpers'
import { addHours } from 'date-fns'
import { CalendarEventBox, Navbar } from '../'

const events = [
  {
    title: 'Cumpleaños del jefecito',
    notes: 'Compra el dulce',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Wlad'
    }
  }
]

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')
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
    console.log('🚀 ~ file: CalendarPage.jsx ~ line 34 ~ handleOnDoubleClick ~ event', { doubleClick: event })
  }

  const onSelect = (event) => {
    console.log('🚀 ~ file: CalendarPage.jsx ~ line 38 ~ onSelect ~ event', { click: event })
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
    </>
  )
}
