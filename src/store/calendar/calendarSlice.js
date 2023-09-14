import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

const tempEvent = {
  _id: new Date().getTime(),
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

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [tempEvent],
    activeEvent: null
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      console.log('🚀 ~ file: calendarSlice.js:25 ~ payload:', payload)
      state.activeEvent = payload
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload)
      state.activeEvent = null
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter((event) => event._id !== state.activeEvent._id)
        state.activeEvent = null
      }
    }
  }
})

export const { events, activeEvent, onSetActiveEvent, onAddNewEvent, onDeleteEvent } = calendarSlice.actions
