import React, { useState, useEffect } from 'react';
import { Grid, Header, Item, Segment, Icon, Image } from 'semantic-ui-react';
import differenceInYears from 'date-fns/difference_in_years';

const UserDetailedHeader = ({ profile, photos }) => {
  const [randomImage, setRandomImage] = useState(profile.photoURL);

  useEffect(
    () => {
      if (photos) {
        let randomPhoto = photos[Math.floor(Math.random() * photos.length)];
        setRandomImage(randomPhoto.url);
      }
    },
    [photos]
  );

  let age = 'unknown age';
  if (profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth);
  } else {
    age = 'unknown age';
  }
  let gender = '';
  if (profile.gender === 'male') {
    gender = 'man';
  } else if (profile.gender === 'female') {
    gender = 'woman';
  } else {
    gender = '';
  }

  const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
  };

  const eventImageStyle = {
    filter: 'blur(10px)',
    width: '100%'
  };

  return (
    <Grid.Column width={12}>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <div style={{ overflow: 'hidden', height: '300px' }}>
          <Image src={randomImage} style={eventImageStyle} />
        </div>
        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Image
                  rounded
                  style={{
                    float: 'left',
                    paddingTop: '150px'
                  }}
                  size="small"
                  src={profile.photoURL || '/assets/user.png'}
                />
                <Header
                  as="h1"
                  style={{
                    color: 'white',
                    paddingLeft: '30px',
                    paddingTop: '200px'
                  }}>
                  {profile.displayName}
                </Header>{' '}
                <Icon
                  name={gender}
                  size="big"
                  style={{ color: 'white', paddingLeft: '30px' }}
                />
                <br />
                <Header as="h3" style={{ color: 'white', paddingLeft: '30px' }}>
                  {profile.occupation}
                </Header>
                <br />
                <Header as="h3" style={{ color: 'white', paddingLeft: '30px' }}>
                  {age}, Lives in {profile.city || 'unknown city'}
                </Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedHeader;
