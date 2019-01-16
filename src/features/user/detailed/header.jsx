import React from 'react';
import { Grid, Header, Item, Segment, Icon } from 'semantic-ui-react';
import differenceInYears from 'date-fns/difference_in_years';

const UserDetailedHeader = ({ profile }) => {
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

  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              avatar
              size="small"
              src={profile.photoURL || '/assets/user.png'}
            />
            <Item.Content verticalAlign="bottom">
              <Header as="h1">{profile.displayName}</Header>{' '}
              <Icon name={gender} size="big" />
              <br />
              <Header as="h3">{profile.occupation}</Header>
              <br />
              <Header as="h3">
                {age}, Lives in {profile.city || 'unknown city'}
              </Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedHeader;
