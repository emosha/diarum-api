import 'babel-register';
import '@babel/polyfill/noConflict';
import 'cross-fetch/polyfill';
import prisma from '../src/prisma';
import seedDatabase, { userOne } from './utils/seedDatabase';
import getClient from './utils/getClient';
import { createUser, getProfile } from './utils/operations';

const client = getClient();

beforeAll(seedDatabase);

test('Should create a new user', async () => {
  const variables = {
    data: {
      name: 'Iveren',
      email: 'iveren@test.com',
      username: 'iveren',
      password: 'MyPass123'
    }
  };

  const response = await client.mutate({
    mutation: createUser,
    variables
  });

  const userExists = await prisma.exists.User({
    id: response.data.createUser.user.id
  });

  expect(userExists).toBeTruthy();
});
test('Should not signup user with invalid password', async () => {
  const variables = {
    data: {
      name: 'Andrew',
      email: 'andrew@example.com',
      username: 'andrew',
      password: 'pass'
    }
  };


  const response = await client.mutate({ mutation: createUser, variables });

  expect(response.data.createUser.error.message).toEqual('password should be more than 8 characters');
  response.data.createUser.error.details.map((detail) => { //eslint-disable-line
    if (detail.field === 'data.password') {
      expect(detail.errors[0]).toEqual('password should be more than 8 characters');
    }
  });
});

test('Should not signup user with existing username', async () => {
  const variables = {
    data: {
      name: 'Andrew',
      email: 'andrew@example1.com',
      username: userOne.input.username,
      password: 'andrewexample'
    }
  };

  const response = await client.mutate({ mutation: createUser, variables });

  expect(response.data.createUser.error.message).toEqual('username already exists');
  response.data.createUser.error.details.map((detail) => { //eslint-disable-line
    if (detail.field === 'data.username') {
      expect(detail.errors[0]).toEqual('username already exists');
    }
  });
});

test('Should not signup user with existing email', async () => {
  const variables = {
    data: {
      name: 'Andrew',
      email: userOne.input.email,
      username: 'andrew',
      password: 'andrewexample'
    }
  };

  const response = await client.mutate({ mutation: createUser, variables });

  expect(response.data.createUser.error.message).toEqual('email already exists');
  response.data.createUser.error.details.map((detail) => { //eslint-disable-line
    if (detail.field === 'data.email') {
      expect(detail.errors[0]).toEqual('email already exists');
    }
  });
});

test('Should fetch user profile', async () => {
  const newClient = getClient(userOne.jwt);
  const { data } = await newClient.query({ query: getProfile });

  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.name).toBe(userOne.user.name);
  expect(data.me.email).toBe(userOne.user.email);
});

test('Should not fetch user profile if token is not provided', async () => {
  await expect(client.query({ query: getProfile })).rejects.toThrow();
});
