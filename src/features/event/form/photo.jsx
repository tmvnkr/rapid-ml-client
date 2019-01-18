import React, { Component } from 'react';
import { Image, Segment, Header, Grid, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class PhotosPage extends Component {
  state = {
    files: [],
    fileName: '',
    cropResult: null,
    image: {}
  };

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      try {
        let imageUrl = URL.createObjectURL(blob);
        this.setState({
          cropResult: imageUrl,
          image: blob
        });
      } catch (error) {
        return;
      }
    }, 'image/jpeg');
  };

  onDrop = files => {
    this.setState({
      files,
      fileName: files[0].name
    });
  };

  render() {
    return (
      <Segment>
        <Header dividing size="large" content="Create Collection" />
        <Grid>
          <Grid.Row />
          <Grid.Column width={16}>
            <Header color="teal" sub content="Step 1 - Add Photo" />
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div
                style={{
                  paddingTop: '30px',
                  textAlign: 'center'
                }}>
                <Icon name="upload" size="huge" />
                <Header content="Drop image here or click to add" />
              </div>
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header sub color="teal" content="Step 2 - Resize image" />
            {this.state.files[0] && (
              <Cropper
                style={{ height: '600px' }}
                ref="cropper"
                src={this.state.files[0].preview}
                viewMode={1}
                dragMode="move"
                guides={true}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                toggleDragModeOnDblclick={true}
                crop={this.cropImage}
              />
            )}
          </Grid.Column>
          <Grid.Column width={8}>
            <Header sub color="teal" content="Step 3 - Preview and Upload" />
            {this.state.files[0] && (
              <Image
                style={{ maxHeight: '600px' }}
                src={this.state.cropResult}
              />
            )}
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default PhotosPage;
