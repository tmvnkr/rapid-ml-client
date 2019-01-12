import React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import LoginForm from '../auth/login/login-form';
import { closeModal } from './actions';

const actions = { closeModal };

function LoginModal(props) {
  return (
    <Modal size="mini" open={true} onClose={props.closeModal}>
      <Modal.Header>Login to RapidML</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <LoginForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default connect(
  null,
  actions
)(LoginModal);
