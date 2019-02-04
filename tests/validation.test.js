import 'babel-register';
import '@babel/polyfill/noConflict';

import validation, { userValidation } from '../src/validations';
import { userOne } from './utils/seedDatabase';

test('Should throw error when data is invalid', async () => {
  const variables = {
    name: 'Khabib',
    username: 'khabibb',
    email: userOne.input.email,
    password: 'khabibib'
  };

  try {
    await validation(userValidation.createUser, variables);
  } catch (error) {
    expect(error.message).toEqual('1 error occurred');
  }
});

test('Should add s to error in error message when more than one field is invalid', async () => {
  const variables = {
    name: 'Khabib',
    username: '',
    email: userOne.input.email,
    password: 'khabibibi'
  };

  try {
    await validation(userValidation.createUser, variables);
  } catch (error) {
    expect(error.message).toEqual('2 errors occurred');
  }
});
