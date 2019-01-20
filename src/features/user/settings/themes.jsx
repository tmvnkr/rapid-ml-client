import React, { useState } from 'react';
import { Form, Segment, Button, Header } from 'semantic-ui-react';
import { TwitterPicker } from 'react-color';

function ColorInput({ onColorChange }) {
  const [color, setColor] = useState('#fff');

  const handleChangeComplete = (color, event) => {
    setColor(color.hex);
  };
  return (
    <Segment>
      <Header dividing size="large" content="Basics" />
      <Form.Field>
        <Button
          style={{ backgroundColor: color, paddingBottom: '30px' }}
          content="Show colorpicker"
        />
        <TwitterPicker
          color={color}
          onChangeComplete={handleChangeComplete}
          disableAlpha={true}
          width={250}
        />
        <Button content="Set color" />
      </Form.Field>
    </Segment>
  );
}

export default ColorInput;
