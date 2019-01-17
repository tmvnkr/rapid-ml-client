import React, { useState } from 'react';
import {
  Button,
  Image,
  Table,
  Icon,
  Grid,
  Progress,
  Label,
  Header
} from 'semantic-ui-react';
import { connect } from 'react-redux';
// import { incrementAsync, decrementAsync } from './testActions';
// import { openModal } from '../modals/actions';
import testData from './test.json';

const mapState = state => ({
  data: state.test.data,
  loading: state.test.loading
});

const actions = {
  // incrementAsync,
  // decrementAsync,
  // openModal
};

let test = testData.result.tags;

function TestComponent(props) {
  const [hidden, setHidden] = useState(true);
  const [numberOfItems, setNumberOfItems] = useState(10);

  const setTagMenuState = () => {
    setHidden(!hidden);
  };

  const showMore = () => {
    setNumberOfItems(numberOfItems + 10);
  };

  const showLess = () => {
    setNumberOfItems(numberOfItems - 10);
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  <Image
                    fluid
                    src="https://imagga.com/static/images/tagging/wind-farm-538576_640.jpg"
                  />
                  <br />
                  <Button
                    color="teal"
                    content={hidden ? 'Show Tags' : 'Hide Tags'}
                    onClick={setTagMenuState}
                  />
                  {!hidden && (
                    <Button.Group floated="right">
                      <Button
                        labelPosition="right"
                        icon="down chevron"
                        content="Show More"
                        color="green"
                        onClick={showMore}
                        disabled={numberOfItems > test.length}
                      />
                      <Button
                        labelPosition="left"
                        icon="up chevron"
                        content="Show Less"
                        color="red"
                        onClick={showLess}
                        disabled={numberOfItems < 11}
                      />
                    </Button.Group>
                  )}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body hidden={hidden}>
              <Table.Row>
                <Table.Cell collapsing width={2}>
                  <Icon name="trophy" />
                </Table.Cell>
                <Table.Cell width={10}>
                  <Header as="h5">
                    <Icon size="tiny" name="percent" />
                    <Header.Content>
                      Confidence
                      <Header.Subheader>
                        Higher confidence means more relevant tags
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell collapsing width={4}>
                  <Header as="h5">
                    <Icon name="tag" />
                    <Header.Content>
                      Tags
                      <Header.Subheader>Names</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>
              {Object.values(test).map((value, key) => (
                <React.Fragment key={key}>
                  {key < numberOfItems && (
                    <Table.Row>
                      <Table.Cell width={2}>
                        {key === 0 && (
                          <Label color="green" ribbon>
                            Best Match!
                          </Label>
                        )}
                        <h2>{key + 1}</h2>
                      </Table.Cell>
                      <Table.Cell width={10}>
                        <Progress
                          percent={value.confidence}
                          label={
                            value.confidence === 100
                              ? `${value.confidence}%`
                              : `${parseFloat(value.confidence).toFixed(2)}%`
                          }
                          indicating
                        />
                      </Table.Cell>
                      <Table.Cell width={4}>
                        {key === 0 ? (
                          <h3>
                            <u>{value.tag.en}</u>
                          </h3>
                        ) : (
                          <h4>{value.tag.en}</h4>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  )}
                </React.Fragment>
              ))}
            </Table.Body>
          </Table>
          {!hidden && (
            <>
              <Button
                hidden
                content="Hide Tags"
                color="teal"
                onClick={setTagMenuState}
              />
              <Button.Group floated="right">
                <Button
                  labelPosition="right"
                  icon="down chevron"
                  content="Show More"
                  color="green"
                  onClick={showMore}
                  disabled={numberOfItems > test.length}
                />
                <Button
                  labelPosition="left"
                  icon="up chevron"
                  content="Show Less"
                  color="red"
                  onClick={showLess}
                  disabled={numberOfItems < 11}
                />
              </Button.Group>
            </>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default connect(
  mapState,
  actions
)(TestComponent);
