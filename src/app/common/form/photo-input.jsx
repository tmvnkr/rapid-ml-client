import map from 'lodash/map';
import React from 'react';
import DropZone from 'react-dropzone';
import { Grid, Header, Segment, Icon, Image, Step } from 'semantic-ui-react';

const renderImagePreview = imagefile =>
  map(imagefile, ({ name, preview, size }) => [
    <span key="imagePreview">
      <Image
        style={{ minHeight: '100%', minWidth: '100%' }}
        src={preview}
        alt={name}
      />
    </span>,
    <Step.Group vertical key="imageDetails">
      <Step>
        <Icon name="tag" />
        <Step.Content>
          <Step.Title>Image Name</Step.Title>
          <Step.Description>{name}</Step.Description>
        </Step.Content>
      </Step>

      <Step>
        <Icon name="file" />
        <Step.Content>
          <Step.Title>Image Size</Step.Title>
          <Step.Description>{(size / 1000000).toFixed(2)} MB</Step.Description>
        </Step.Content>
      </Step>

      <Step completed>
        <Icon name="close" />
        <Step.Content>
          <Step.Title>Upload Successful</Step.Title>
          <Step.Description>Fill in all fields to continue</Step.Description>
        </Step.Content>
      </Step>
    </Step.Group>
  ]);

export default ({
  handleOnDrop,
  input,
  imagefile,
  label,
  meta: { error, touched }
}) => (
  <>
    <Grid>
      <Grid.Column width={16}>
        <Header color="teal" sub content="Add Photo" />
        <Segment style={{ margin: '0 0 20px 0' }}>
          <DropZone
            accept="image/jpeg"
            className="upload-container"
            onDrop={handleOnDrop}
            onChange={file => input.onChange(file)}>
            {imagefile && imagefile.length > 0 ? (
              <span>{renderImagePreview(imagefile)}</span>
            ) : (
              <div style={{ paddingTop: '30px', textAlign: 'center' }}>
                <Icon name="upload" size="huge" />
                <Header content="Drop image here or click to upload" />
              </div>
            )}
          </DropZone>
        </Segment>
        {touched && error && <div>{error}</div>}
      </Grid.Column>
    </Grid>
  </>
);
