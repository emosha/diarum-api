import { gql } from 'apollo-boost';

const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(
      data: $data
    ) {
      user {
        id
        name
        email
      }
      token
      error {
        message
        details {
          field
          errors
        }
      }
    }
  }
`;

const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

export {
  createUser, getProfile
};
