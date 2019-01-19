import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  Table,
  Icon,
  Segment,
  Progress,
  Label,
  Header
} from 'semantic-ui-react';

function TestComponent({ event }) {
  const [hidden, setHidden] = useState(true);
  const [numberOfItems, setNumberOfItems] = useState(10);
  const [data, setData] = useState({});

  useEffect(
    () => {
      let rawData;
      try {
        if (event.imageTags && JSON.parse(event.imageTags)) {
          rawData = JSON.parse(event.imageTags);
          setData(rawData.result.tags);
          console.error('hey');
        }
      } catch (error) {
        console.error(error);
      }
    },
    [hidden]
  );

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
    <>
      {data && (
        <>
          <Segment
            textAlign="center"
            attached="top"
            inverted
            color="teal"
            style={{ border: 'none' }}>
            <Header>Chat about this event</Header>
          </Segment>

          <Segment attached>
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan="3">
                    <Image fluid src={event.imageURL} />
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
                          disabled={numberOfItems > data.length}
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
                {Object.values(data).map((value, key) => (
                  <React.Fragment key={key}>
                    {key < numberOfItems && (
                      <Table.Row>
                        <Table.Cell width={2}>
                          {value.confidence === 100 && (
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
                          {value.confidence === 100 ? (
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
                    disabled={numberOfItems > data.length}
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
          </Segment>
        </>
      )}
    </>
  );
}

export default TestComponent;
