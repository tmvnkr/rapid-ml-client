import React from 'react';
import { Label, Dropdown, Form } from 'semantic-ui-react';

function DropdownInput({
  input,
  width,
  placeholder,
  options,
  meta: { touched, error }
}) {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <Dropdown
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
        fluid
        search
        selection
        value={input.value || null}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
}

export default DropdownInput;
