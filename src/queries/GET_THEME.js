import gql from 'graphql-tag';

export default gql`
  query getTheme {
    theme @client
  }
`;
