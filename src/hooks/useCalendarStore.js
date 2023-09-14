import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent } from '../store/calendar/calendarSlice'

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector((state) => state.calendar)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    //todo save on backend

    if (calendarEvent._id) {
      //update
    } else {
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
    }
  }

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent())
  }
  return {
    //state
    events,
    activeEvent,

    hasEventSelected: !!activeEvent,

    //methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent
  }
}
