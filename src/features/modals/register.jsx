import React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { closeModal } from './actions';
import RegisterForm from '../auth/register/register-form';

const actions = { closeModal };

function RegisterModal(props) {
  return (
    <Modal size="mini" open={true} onClose={props.closeModal}>
      <Modal.Header>Sign Up to RapidML!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <RegisterForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default connect(
  null,
  actions
)(RegisterModal);
