import React from 'react';
import { Button, Divider, Form, Header, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import RadioInput from '../../../app/common/form/radio-input';
import TextInput from '../../../app/common/form/text-input';
import TextArea from '../../../app/common/form/text-area';
import SelectInput from '../../../app/common/form/select-input';
import DropdownInput from '../../../app/common/form/dropdown-input';
import { countryOptions } from '../../../app/common/form/country-input';

const interests = [
  { key: 'academic', text: 'Academic Disciplines', value: 'academic' },
  { key: 'arts', text: 'Arts', value: 'arts' },
  { key: 'business', text: 'Business', value: 'business' },
  { key: 'concepts', text: 'Concepts', value: 'concepts' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'education', text: 'Education', value: 'education' },
  { key: 'entertainment', text: 'Entertainment', value: 'entertainment' },
  { key: 'events', text: 'Events', value: 'events' },
  { key: 'geography', text: 'Geography', value: 'geography' },
  { key: 'health', text: 'Health', value: 'health' },
  { key: 'history', text: 'History', value: 'history' },
  { key: 'humanities', text: 'Humanities', value: 'humanities' },
  { key: 'language', text: 'Language', value: 'language' },
  { key: 'law', text: 'Law', value: 'law' },
  { key: 'life', text: 'Life', value: 'life' },
  { key: 'mathematics', text: 'Mathematics', value: 'mathematics' },
  { key: 'nature', text: 'Nature', value: 'nature' },
  { key: 'people', text: 'People', value: 'people' },
  { key: 'philosophy', text: 'Philosophy', value: 'philosophy' },
  { key: 'politics', text: 'Politics', value: 'politics' },
  { key: 'reference', text: 'Reference', value: 'reference' },
  { key: 'religion', text: 'Religion', value: 'religion' },
  { key: 'science', text: 'Science', value: 'science' },
  { key: 'society', text: 'Society', value: 'society' },
  { key: 'sports', text: 'Sports', value: 'sports' },
  { key: 'technology', text: 'Technology', value: 'technology' },
  { key: 'universe', text: 'Universe', value: 'universe' },
  { key: 'world', text: 'World', value: 'world' }
];

const AboutPage = ({ pristine, submitting, handleSubmit, updateProfile }) => {
  return (
    <Segment>
      <Header dividing size="large" content="About Me" />
      <p>Complete your profile to get the most out of this site</p>
      <Form onSubmit={handleSubmit(updateProfile)}>
        <Form.Group inline>
          <label>Tell us your status: </label>
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="single"
            label="Single"
          />
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="relationship"
            label="Relationship"
          />
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="married"
            label="Married"
          />
        </Form.Group>
        <Divider />
        <label>Tell us about yourself</label>
        <Field name="about" component={TextArea} placeholder="About Me" />
        <Field
          name="interests"
          component={SelectInput}
          options={interests}
          value="interests"
          multiple={true}
          placeholder="Select your interests"
        />
        <Field
          width={8}
          name="occupation"
          type="text"
          component={TextInput}
          placeholder="Occupation"
        />
        <Field
          width={8}
          name="origin"
          component={DropdownInput}
          options={countryOptions}
          value="origin"
          placeholder="Select your country"
        />
        <Divider />
        <Button
          disabled={pristine || submitting}
          size="large"
          positive
          content="Update Profile"
        />
      </Form>
    </Segment>
  );
};

export default reduxForm({
  form: 'userProfile',
  enableReinitialize: true,
  destroyOnUnmount: false
})(AboutPage);
