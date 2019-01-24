import React from 'react'
import { connect } from 'react-redux'
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { combineValidators, isRequired } from 'revalidate'
import TextInput from '../../../app/common/form/text-input'
import { registerUser, socialLogin } from '../actions'
import SocialLogin from '../social-login/social-login'

const actions = {
  registerUser,
  socialLogin
}

const validate = combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password')
})

function RegisterForm({ handleSubmit, registerUser, error, invalid, submitting, socialLogin }) {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field name="displayName" type="text" component={TextInput} placeholder="Known As" />
          <Field name="email" type="text" component={TextInput} placeholder="Email" />
          <Field name="password" type="password" component={TextInput} placeholder="Password" />
          {error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          <Button disabled={invalid || submitting} fluid size="large" color="teal">
            Register
          </Button>
          <Divider horizontal>Or</Divider>
          <SocialLogin socialLogin={socialLogin} />
        </Segment>
      </Form>
    </div>
  )
}

export default connect(
  null,
  actions
)(reduxForm({ form: 'registerForm', validate })(RegisterForm))
