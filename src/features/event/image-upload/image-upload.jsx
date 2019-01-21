import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { withFirestore } from 'react-redux-firebase';
import { Image, Segment, Header, Grid, Icon, Button } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { uploadImage } from '../actions';
import { Route, Redirect } from 'react-router';

const mapState = state => {
  let event = {};
  if (
    state.firestore.ordered.collections &&
    state.firestore.ordered.collections[0]
  ) {
    event = state.firestore.ordered.collections[0];
  }
  return {
    event,
    loading: state.async.loading
  };
};

const actions = {
  uploadImage
};

class EventDetailedTaggedImage extends Component {
  state = {
    files: [],
    fileName: '',
    cropResult: null,
    image: {},
    aspectRatio: 16 / 9
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
        this.props.event.id
      );
      this.cancelCrop();
      toastr.success('Success!', 'Image has been uploaded and tagged!');
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
              <Dropzone
                onDrop={this.onDrop}
                multiple={false}
                style={{ padding: '200px', borderStyle: 'dashed' }}>
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
                    style={{ height: '500px', minHeight: '500px' }}
                    ref="cropper"
                    src={this.state.files[0].preview}
                    viewMode={1}
                    aspectRatio={this.state.aspectRatio}
                    dragMode="move"
                    guides={false}
                    scalable={true}
                    cropBoxMovable={true}
                    cropBoxResizable={true}
                    toggleDragModeOnDblclick={true}
                    crop={this.cropImage}
                  />
                )}
                <Button.Group>
                  <Button onClick={() => this.setState({ aspectRatio: 7 / 3 })}>
                    7:3
                  </Button>
                  <Button
                    onClick={() => this.setState({ aspectRatio: 16 / 9 })}>
                    16:9
                  </Button>
                  <Button onClick={() => this.setState({ aspectRatio: 4 / 3 })}>
                    4:3
                  </Button>
                  <Button onClick={() => this.setState({ aspectRatio: 1 / 1 })}>
                    1:1
                  </Button>
                </Button.Group>
              </Grid.Column>
              <Grid.Column width={8}>
                <Header
                  sub
                  color="teal"
                  content="Step 3 - Preview and Upload"
                />
                {this.state.files[0] && (
                  <>
                    <div
                      style={{ height: '500px', backgroundColor: '#f2f2f2' }}>
                      <Image
                        style={{ maxHeight: '500px' }}
                        src={this.state.cropResult}
                      />
                    </div>
                    <Button.Group>
                      <Button
                        loading={this.props.loading}
                        onClick={this.uploadImage}
                        style={{ width: '180px' }}
                        positive
                        icon="check"
                      />
                      <Button
                        loading={this.props.loading}
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
        <Route
          path="/imageUpload"
          render={() => {
            if (
              this.props.event.imageURL !== '' &&
              this.props.event.id === undefined &&
              this.props.event.imageURL !== undefined
            ) {
              return <Redirect to={`/collections`} />;
            } else if (
              this.props.event.imageURL !== '' &&
              this.props.event.imageURL !== undefined
            ) {
              return <Redirect to={`/collection/${this.props.event.id}`} />;
            } else {
              return null;
            }
          }}
        />
      </Segment>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(EventDetailedTaggedImage)
);
