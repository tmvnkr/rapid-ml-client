import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { withFirestore } from 'react-redux-firebase';
import { Image, Segment, Header, Grid, Icon, Button } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { uploadImage } from '../actions';

const mapState = state => {
  let event = {};

  if (
    state.firestore.ordered.collections &&
    state.firestore.ordered.collections[0]
  ) {
    event = state.firestore.ordered.collections[0];
  }
  return event;
};

const actions = {
  uploadImage
};

class PhotosPage extends Component {
  state = {
    files: [],
    fileName: '',
    cropResult: null,
    image: {}
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`collections/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`collections/${match.params.id}`);
  }

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

  uploadImage = async () => {
    try {
      await this.props.uploadImage(
        this.state.image,
        this.state.filename,
        this.props.id
      );
      this.cancelCrop();
      toastr.success(
        'Success!',
        'Image has been uploaded, please allow some time for it to be tagged'
      );
    } catch (error) {
      toastr.error('Oops', error.message);
    }
  };

  cancelCrop = () => {
    this.setState({
      files: [],
      image: {},
      fileName: ''
    });
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
          {this.state.fileName === '' && (
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
          )}
          {this.state.fileName !== '' && (
            <>
              <Grid.Column width={8}>
                <Header sub color="teal" content="Step 2 - Resize image" />
                {this.state.files[0] && (
                  <Cropper
                    style={{ height: '600px', minHeight: '600px' }}
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
                <Header
                  sub
                  color="teal"
                  content="Step 3 - Preview and Upload"
                />
                {this.state.files[0] && (
                  <>
                    <div style={{ height: '600px', backgroundColor: 'grey' }}>
                      <Image
                        style={{ maxHeight: '600px' }}
                        src={this.state.cropResult}
                      />
                    </div>
                    <Button.Group>
                      <Button
                        onClick={this.uploadImage}
                        style={{ width: '180px' }}
                        positive
                        icon="check"
                      />
                      <Button
                        onClick={this.cancelCrop}
                        style={{ width: '180px' }}
                        icon="close"
                      />
                    </Button.Group>
                  </>
                )}
              </Grid.Column>
            </>
          )}
        </Grid>
      </Segment>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(PhotosPage)
);
