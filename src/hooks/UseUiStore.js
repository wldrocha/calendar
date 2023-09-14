import { useSelector, useDispatch } from 'react-redux'
import { onOpenDateModal, onCloseDateModal } from '../store/ui/uiSlice'

export const UseUiStore = () => {
  const dispatch = useDispatch()
  const { isDateModalOpen } = useSelector((state) => state.ui)

  const openDateModal = () => {
    dispatch(onOpenDateModal())
  }
  const closeDateModal = () => {
    dispatch(onCloseDateModal())
  }

  return {
    isDateModalOpen,
    // methods
    openDateModal,
    closeDateModal
  }
}
