import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { incrementCounter, decrementCounter } from './testActions';

const mapState = state => ({
  data: state.test.data
});

const actions = {
  incrementCounter,
  decrementCounter
};

function TestComponent(props) {
  return (
    <div>
      <h1>TEST AREA</h1>
      <h3>The answer is: {props.data}</h3>
      <Button
        onClick={props.incrementCounter}
        color="green"
        content="Increment"
      />
      <Button
        onClick={props.decrementCounter}
        color="red"
        content="Decrement"
      />
    </div>
  );
}

export default connect(
  mapState,
  actions
)(TestComponent);
