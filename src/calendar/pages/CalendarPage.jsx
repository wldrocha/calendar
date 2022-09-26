import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessageES } from '../../helpers'
import { addHours } from 'date-fns'
import { Navbar } from '../components/Navbar'

const events = [
  {
    title: 'test',
    notes: 'algo test',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa'
  }
]

export const CalendarPage = () => {
  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log('🚀 ~ file: CalendarPage.jsx ~ line 20 ~ eventStyleGetter ~ event, start, end, isSelected)', {
      event,
      start,
      end,
      isSelected
    })
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: '0.8',
      color: 'white'
    }

    return { style }
  }
  return (
    <>
      <Navbar />
      <Calendar
        culture={'es'}
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessageES()}
        eventPropGetter={eventStyleGetter}
      />
    </>
  )
}
