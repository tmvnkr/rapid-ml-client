import React from 'react'
import { connect } from 'react-redux'
import LoginModal from './login'
import RegisterModal from './register'
import UnauthModal from './unauth'

const modalLookup = {
  LoginModal,
  RegisterModal,
  UnauthModal
}

const mapState = state => ({
  currentModal: state.modals
})

function ModalManager({ currentModal }) {
  let renderedModal

  if (currentModal) {
    const { modalType, modalProps } = currentModal
    const ModalComponent = modalLookup[modalType]

    renderedModal = <ModalComponent {...modalProps} />
  }
  return <span>{renderedModal}</span>
}

export default connect(mapState)(ModalManager)
