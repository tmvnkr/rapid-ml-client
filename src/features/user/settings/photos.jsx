import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card,
  Icon
} from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto,
  deleteTaggedPhoto
} from '../actions';

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos'
    }
  ];
};

const actions = {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto,
  deleteTaggedPhoto
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  loading: state.async.loading
});

class PhotosPage extends Component {
  state = {
    files: [],
    fileName: '',
    cropResult: null,
    image: {}
  };

  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    });
  };

  uploadImage = async () => {
    try {
      await this.props.uploadProfileImage(
        this.state.image,
        this.state.fileName
      );
      this.cancelCrop();
      toastr.success('Success', 'Photo has been uploaded');
    } catch (error) {
      toastr.error('Oops', error.message);
    }
  };

  handlePhotoDelete = photo => async () => {
    try {
      this.props.deletePhoto(photo);
    } catch (error) {
      toastr.error('Oops', error.message);
    }
  };

  handleTaggedPhotoDelete = photo => async () => {
    try {
      this.props.deleteTaggedPhoto(photo);
    } catch (error) {
      toastr.error('Oops', error.message);
    }
  };

  handleSetMainPhoto = photo => async () => {
    try {
      this.props.setMainPhoto(photo);
    } catch (error) {
      toastr.error('Oops', error.message);
    }
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
    const { photos, profile, loading } = this.props;
    let filteredUserPhotos;
    let filteredTaggedPhotos;

    if (photos) {
      filteredUserPhotos = photos
        .filter(photo => {
          return photo.url !== profile.photoURL;
        })
        .filter(photo => {
          return photo.url.includes('%2Fuser_images%2');
        });
    }

    if (photos) {
      filteredTaggedPhotos = photos
        .filter(photo => {
          return photo.url !== profile.photoURL;
        })
        .filter(photo => {
          return photo.url.includes('%2Ftagged_images%2');
        });
    }
    return (
      <Segment>
        <Header dividing size="large" content="Your Photos" />
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 1 - Add Photo" />
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div style={{ paddingTop: '30px', textAlign: 'center' }}>
                <Icon name="upload" size="huge" />
                <Header content="Drop image here or click to upload" />
              </div>
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 2 - Resize image" />
            {this.state.files[0] && (
              <Cropper
                style={{ height: 200, width: '100%' }}
                ref="cropper"
                src={this.state.files[0].preview}
                aspectRatio={1}
                viewMode={0}
                dragMode="move"
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage}
              />
            )}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 3 - Preview and Upload" />
            {this.state.files[0] && (
              <div>
                <Image
                  style={{ minHeight: '200px', minWidth: '200px' }}
                  src={this.state.cropResult}
                />
                <Button.Group>
                  <Button
                    loading={loading}
                    onClick={this.uploadImage}
                    style={{ width: '100px' }}
                    positive
                    icon="check"
                  />
                  <Button
                    disabled={loading}
                    onClick={this.cancelCrop}
                    style={{ width: '100px' }}
                    icon="close"
                  />
                </Button.Group>
              </div>
            )}
          </Grid.Column>
        </Grid>

        <Divider />
        <Header sub color="teal" content="All Profile Photos" />

        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src={profile.photoURL || '/assets/user.png'} />
            <Button positive>Main Photo</Button>
          </Card>
          {photos &&
            filteredUserPhotos.map(photo => (
              <Card key={photo.id}>
                <Image src={photo.url} />
                <div className="ui two buttons">
                  <Button
                    onClick={this.handleSetMainPhoto(photo)}
                    basic
                    color="green">
                    Main
                  </Button>
                  <Button
                    onClick={this.handlePhotoDelete(photo)}
                    basic
                    icon="trash"
                    color="red"
                  />
                </div>
              </Card>
            ))}
        </Card.Group>
        <Divider />
        <Header sub color="teal" content="All Collection Photos" />

        <Card.Group itemsPerRow={3}>
          {photos &&
            filteredTaggedPhotos.map(photo => (
              <Card style={{ boxShadow: 'none' }} key={photo.id}>
                <Image
                  src={photo.url}
                  style={{
                    boxShadow: '0 1px 3px 0 #d4d4d5'
                  }}
                />
                <Button
                  name="delete"
                  basic
                  color="red"
                  icon="trash"
                  onClick={this.handleTaggedPhotoDelete(photo)}
                />
              </Card>
            ))}
        </Card.Group>
      </Segment>
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect(auth => query(auth))
)(PhotosPage);
