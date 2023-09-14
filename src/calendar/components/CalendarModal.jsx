import { addHours, differenceInSeconds } from 'date-fns'
import { useState } from 'react'
import Modal from 'react-modal'
import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es'
import { UseUiStore } from '../../hooks/UseUiStore'
import { useEffect } from 'react'
import { useCalendarStore } from '../../hooks'
registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

export const CalendarModal = () => {
  const { activeEvent, startSavingEvent  } = useCalendarStore()
  const { isDateModalOpen, closeDateModal } = UseUiStore()
  const [formValues, setFormValues] = useState({
    title: 'Wlad',
    notes: 'Rocha',
    start: new Date(),
    end: addHours(new Date(), 2)
  })
  const onInputChange = ({ target: { name, value } }) => {
    setFormValues((oldState) => ({ ...oldState, [name]: value }))
  }
  const onCloseModal = () => {
    closeDateModal()
  }

  const onDateChange = (event, changing) => {
    setFormValues({ ...formValues, [changing]: event })
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    const difference = differenceInSeconds(formValues.end, formValues.start)

    if (isNaN(difference) || difference <= 0) {
      // Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
      return
    }

    if (formValues.title.length <= 0) return

    console.log(formValues)

    await startSavingEvent(formValues)
    closeDateModal()
  }

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent })
    }
  }, [activeEvent])

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className='container' onSubmit={onSubmit}>
        <div className='form-group mb-2'>
          <label>Fecha y hora inicio</label>
          <ReactDatePicker
            className='form-control'
            placeholder='Fecha inicio'
            selected={formValues?.start}
            dateFormat='Pp'
            onChange={(event) => onDateChange(event, 'start')}
            showTimeSelect
            locale='es'
            timeCaption='Hora'
          />
        </div>

        <div className='form-group mb-2'>
          <label>Fecha y hora fin</label>
          <ReactDatePicker
            minDate={formValues?.start}
            className='form-control'
            placeholder='Fecha Fin'
            selected={formValues?.end}
            dateFormat='Pp'
            onChange={(event) => onDateChange(event, 'end')}
            showTimeSelect
            locale='es'
            timeCaption='Hora'
          />
        </div>

        <hr />
        <div className='form-group mb-2'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className='form-control'
            placeholder='Título del evento'
            name='title'
            autoComplete='off'
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripción corta
          </small>
        </div>

        <div className='form-group mb-2'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notas'
            rows='5'
            name='notes'
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Información adicional
          </small>
        </div>

        <button type='submit' className='btn btn-outline-primary btn-block'>
          <i className='far fa-save'></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  )
}
