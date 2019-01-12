import React from 'react';
import { connect } from 'react-redux';
import TestModal from './TestModal';
import LoginModal from './login';
import RegisterModal from './register';

const modalLookup = {
  TestModal,
  LoginModal,
  RegisterModal
};

const mapState = state => ({
  currentModal: state.modals
});

function ModalManager({ currentModal }) {
  let renderedModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderedModal}</span>;
}

export default connect(mapState)(ModalManager);
